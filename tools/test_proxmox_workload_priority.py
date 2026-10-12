"""Prove failure shedding stays scoped and never acts without survivor quorum."""
import importlib.util
import json
from pathlib import Path
import sys
import types
import unittest

if sys.platform == "win32":
    sys.modules.setdefault("fcntl", types.ModuleType("fcntl"))
source = Path(__file__).resolve().parents[1] / "config/shell_scripts/proxmox_workload_priority.py"
spec = importlib.util.spec_from_file_location("priority", source)
priority = importlib.util.module_from_spec(spec)
spec.loader.exec_module(priority)
NODES = ["core", "camera", "light"]


def cluster(offline=(), quorate=1):
    return [{"type": "cluster", "quorate": quorate}] + [
        {"type": "node", "name": name, "online": int(name not in offline), "local": int(name == "camera")}
        for name in NODES]


class PriorityTest(unittest.TestCase):
    def test_guest_recovery_claims_are_explicit_and_host_scoped(self):
        manager = {"manager_status": {"service_status": {
            "vm:105": {"node": "camera", "state": "started"},
            "vm:113": {"node": "light", "state": "started"},
            "vm:101": {"node": "camera", "state": "started"},
            "vm:169": {"node": "camera", "state": "stopped"}}}}
        self.assertEqual(priority.recovery_claims(manager, "camera", [105, 113, 169]), ["vm:105"])
        self.assertEqual(priority.recovery_claims(manager, "camera", [113, 169]), [])

    def test_confirmation_reset_and_both_failure_roles(self):
        for failed in ["core", "light"]:
            with self.subTest(failed=failed):
                state, act = priority.failure_window(cluster([failed]), NODES, "camera", {}, 100, "boot")
                self.assertFalse(act)
                _, act = priority.failure_window(cluster([failed]), NODES, "camera", state, 109, "boot")
                self.assertFalse(act)
                _, act = priority.failure_window(cluster([failed]), NODES, "camera", state, 110, "boot")
                self.assertTrue(act)
                recovered, act = priority.failure_window(cluster(), NODES, "camera", state, 111, "boot")
                self.assertEqual(recovered["status"], "healthy")
                self.assertFalse(act)
                _, act = priority.failure_window(cluster([failed]), NODES, "camera", recovered, 112, "boot")
                self.assertFalse(act)
                _, act = priority.failure_window(cluster([failed]), NODES, "camera", state, 120, "new-boot")
                self.assertFalse(act)

    def test_no_quorum_incomplete_membership_and_two_failures(self):
        for snapshot in [cluster(["core"], 0), cluster(["core", "light"]), cluster(["core"])[:-1]]:
            with self.subTest(snapshot=snapshot):
                state, act = priority.failure_window(snapshot, NODES, "camera", {}, 100, "boot")
                self.assertEqual(state["status"], "ineligible")
                self.assertFalse(act)

    def test_shutdown_rechecks_and_preserves_operation_boundaries(self):
        for case in ["running", "stopped", "remote", "managed", "locked", "recovered", "lost_quorum", "timeout", "guest_recovery", "recovery_cancelled"]:
            with self.subTest(case=case):
                writes = []

                def command(argv, timeout=8):
                    if argv[:2] == ["qm", "shutdown"]:
                        writes.append(argv)
                        if case == "timeout":
                            raise TimeoutError("Graceful shutdown timed out")
                        return ""
                    if argv[:2] == ["qm", "status"]:
                        return "status: stopped"
                    path = argv[2]
                    if path == "/cluster/resources":
                        return json.dumps([{"type": "qemu", "vmid": 101, "node": "core" if case == "remote" else "camera", "status": "stopped" if case == "stopped" else "running"}])
                    if path == "/cluster/ha/resources":
                        return json.dumps([{"sid": "vm:101"}] if case == "managed" else [])
                    if path == "/cluster/ha/status/manager_status":
                        return json.dumps({"manager_status": {"service_status": {"vm:105": {"node": "camera" if case == "guest_recovery" else "core", "state": "started"}}}})
                    return json.dumps({"lock": "backup"} if case == "locked" else {})

                guest_recovery = case in ["guest_recovery", "recovery_cancelled"]
                call = lambda: priority.shutdown_optional(101, "camera", NODES, [] if guest_recovery else ["core"], lambda: cluster() if case == "recovered" or guest_recovery else cluster(["core"], int(case != "lost_quorum")), command, [105])
                if case in ["managed", "locked", "timeout"]:
                    with self.assertRaises((RuntimeError, TimeoutError)):
                        call()
                else:
                    result = call()
                    self.assertEqual(result, {"running": "shed_optional_vm", "stopped": "already_stopped", "remote": "optional_vm_not_local", "recovered": "membership_changed", "lost_quorum": "membership_changed", "guest_recovery": "shed_optional_vm", "recovery_cancelled": "recovery_changed"}[case])
                self.assertEqual(len(writes), int(case in ["running", "timeout", "guest_recovery"]))
                for write in writes:
                    self.assertEqual(write, ["qm", "shutdown", "101", "--timeout", "35", "--forceStop", "0"])


if __name__ == "__main__":
    unittest.main()
