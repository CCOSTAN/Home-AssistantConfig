#!/usr/bin/env python3
"""Shed one explicitly configured optional VM after a quorate node failure.

Run on the optional VM's Proxmox host. The required environment names the
complete cluster membership, this host, and the only permitted shutdown VM.
Never force-stop, restart a VM, alter HA state, or act without survivor quorum.
"""
import argparse
import fcntl
import json
import os
from pathlib import Path
import subprocess
import time


def failure_window(cluster, expected, host, previous, now, boot_id):
    """Require a complete membership snapshot, two survivors, and confirmation."""
    records = {row.get("name"): row for row in cluster if row.get("type") == "node"}
    quorate = any(row.get("type") == "cluster" and row.get("quorate") == 1 for row in cluster)
    valid = (quorate and set(records) == set(expected)
             and records.get(host, {}).get("local") == 1
             and records.get(host, {}).get("online") == 1
             and all(row.get("online") in (0, 1) for row in records.values())
             and sum(row["online"] for row in records.values()) >= 2)
    if not valid:
        return {"status": "ineligible", "offline": []}, False
    offline = sorted(name for name, row in records.items() if row["online"] == 0)
    if not offline:
        return {"status": "healthy", "offline": []}, False
    same = previous.get("offline") == offline and previous.get("boot_id") == boot_id
    since = previous.get("first_seen", now) if same else now
    state = {"status": "confirming", "offline": offline, "boot_id": boot_id, "first_seen": since}
    return state, now - since >= 10


def run(command, timeout=8):
    return subprocess.check_output(command, text=True, timeout=timeout).strip()


def cluster_state():
    return json.loads(run(["pvesh", "get", "/cluster/status", "--output-format", "json"]))


def recovery_claims(manager, host, critical_ids):
    """Recognize approved HA services assigned to the optional workload host."""
    services = manager.get("manager_status", {}).get("service_status", {})
    return sorted(sid for sid, item in services.items()
                  if sid in {f"vm:{vmid}" for vmid in critical_ids}
                  and item.get("node") == host
                  and item.get("state") not in (None, "stopped", "disabled", "ignored"))


def shutdown_optional(vmid, host, expected, offline, read_cluster=cluster_state, command=run, critical_ids=()):
    """Recheck quorum, placement, locks, and HA ownership before the sole write."""
    current, _ = failure_window(read_cluster(), expected, host, {}, 0, "recheck")
    if current["offline"] != offline or current["status"] == "ineligible":
        return "membership_changed"
    if not offline:
        manager = json.loads(command(["pvesh", "get", "/cluster/ha/status/manager_status", "--output-format", "json"]))
        if not recovery_claims(manager, host, critical_ids):
            return "recovery_changed"
    resources = json.loads(command(["pvesh", "get", "/cluster/resources", "--type", "vm", "--output-format", "json"]))
    vm = next((row for row in resources if row.get("type") == "qemu" and row.get("vmid") == vmid), None)
    if vm is None or vm.get("node") != host:
        return "optional_vm_not_local"
    if vm.get("status") == "stopped":
        return "already_stopped"
    if vm.get("status") != "running":
        return "optional_vm_not_running"
    ha = json.loads(command(["pvesh", "get", "/cluster/ha/resources", "--output-format", "json"]))
    if any(row.get("sid") == f"vm:{vmid}" for row in ha):
        raise RuntimeError("Optional VM is HA-managed; refusing a shutdown that HA could reverse")
    config = json.loads(command(["pvesh", "get", f"/nodes/{host}/qemu/{vmid}/config", "--output-format", "json"]))
    if config.get("lock"):
        raise RuntimeError("Optional VM is locked; refusing to bypass its active operation")
    command(["qm", "shutdown", str(vmid), "--timeout", "35", "--forceStop", "0"], timeout=42)
    if command(["qm", "status", str(vmid)]) != "status: stopped":
        raise RuntimeError("Optional VM did not stop; no force-stop attempted")
    return "shed_optional_vm"


def save_state(path, state):
    temporary = path.with_suffix(".tmp")
    temporary.write_text(json.dumps(state) + "\n")
    temporary.chmod(0o600)
    temporary.replace(path)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true", help="Read live state without changing it or shutting down a VM")
    args = parser.parse_args()
    expected = os.environ["PVE_CLUSTER_NODES"].split(",")
    host = os.environ["PVE_HOST_NODE"]
    vmid = int(os.environ["PVE_OPTIONAL_VMID"])
    critical_ids = [int(value) for value in os.environ["PVE_CRITICAL_VMIDS"].split(",")]
    if (len(expected) != 3 or len(set(expected)) != 3 or host not in expected or vmid < 100
            or not critical_ids or any(value < 100 or value == vmid for value in critical_ids)):
        raise ValueError("An explicit three-node cluster and optional VM are required")
    directory = Path("/var/lib/proxmox-workload-priority")
    directory.mkdir(mode=0o700, exist_ok=True)
    with (directory / "guard.lock").open("w") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        path = directory / "state.json"
        previous = json.loads(path.read_text()) if path.exists() else {}
        now = time.monotonic()
        boot_id = Path("/proc/sys/kernel/random/boot_id").read_text().strip()
        try:
            snapshot = cluster_state()
        except Exception as error:
            if not args.dry_run:
                save_state(path, {"status": "unavailable", "offline": [], "last_action": previous.get("last_action"), "error": str(error)})
            raise
        state, confirmed = failure_window(snapshot, expected, host, previous, now, boot_id)
        if state["status"] != "ineligible":
            manager = json.loads(run(["pvesh", "get", "/cluster/ha/status/manager_status", "--output-format", "json"]))
            claims = recovery_claims(manager, host, critical_ids)
            if claims:
                state["critical_resources"] = claims
                state["status"] = "capacity_requested"
                confirmed = True
        state["last_action"] = previous.get("last_action")
        if previous.get("last_action") == "shutdown_failed":
            state["error"] = previous.get("error")
        if args.dry_run:
            print(json.dumps({**state, "dry_run": True, "failure_confirmed": confirmed}))
            return
        if confirmed and now - previous.get("last_attempt", -1000) >= 60:
            state["last_attempt"] = now
            save_state(path, state)
            try:
                state["last_action"] = shutdown_optional(vmid, host, expected, state["offline"], critical_ids=critical_ids)
                state["status"] = "degraded"
                state.pop("error", None)
                print(json.dumps({**state, "optional_vmid": vmid}), flush=True)
            except Exception as error:
                state["last_action"] = "shutdown_failed"
                state["error"] = str(error)
                save_state(path, state)
                raise
        elif confirmed:
            state["last_attempt"] = previous["last_attempt"]
            state["status"] = "degraded"
        save_state(path, state)


if __name__ == "__main__":
    main()
