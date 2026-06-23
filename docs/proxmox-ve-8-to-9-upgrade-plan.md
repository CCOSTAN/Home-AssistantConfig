# Proxmox VE 8 to 9 Upgrade Execution Record

Tracking issue: https://github.com/CCOSTAN/Home-AssistantConfig/issues/1745

This records the 2026-06-23 Proxmox VE 8 to 9 cluster upgrade and keeps the
reusable validation notes for future maintenance.

## Official References

- Proxmox VE support lifecycle: https://pve.proxmox.com/wiki/FAQ#faq-support-table
- Proxmox VE 8 to 9 guide: https://pve.proxmox.com/wiki/Upgrade_from_8_to_9
- Proxmox VE 9 known issues: https://pve.proxmox.com/wiki/Roadmap#9.0-known-issues
- Debian 13 release notes: https://www.debian.org/releases/trixie/release-notes/

## Execution Summary

Completed on 2026-06-23.

- Both Proxmox nodes upgraded from Proxmox VE `8.4.19` to
  `pve-manager/9.2.3/d0fde103346cf89a`.
- Both nodes rebooted successfully into kernel `7.0.12-1-pve`.
- Final `pve8to9 --full` output on both nodes had `FAILURES: 0`; the only
  warning left was the expected two-node quorum warning.
- `apt update` completed cleanly on both nodes after disabling the PVE
  enterprise source and using the PVE 9 no-subscription repository.
- Final simulated `apt dist-upgrade` on both nodes showed no pending installs
  or removals.
- Shared storage was active on both nodes after the upgrade.
- HA-managed VMs were restored to their normal node, started, and visible in
  HA status.
- The camera/NVR VM was started again after the node upgrades; the Frigate
  container reported Docker health `healthy`.

## Changes Applied During Upgrade

- Captured host configuration backups before package changes.
- Applied the pending Proxmox VE 8.4 package updates and rebooted both nodes
  into kernel `6.8.12-30-pve` before changing repositories.
- Removed the unused `systemd-boot` meta-package after `pve8to9` flagged it
  and verified the nodes were booting through GRUB EFI.
- Configured GRUB to maintain the removable EFI path and reinstalled
  `grub-efi-amd64` on both nodes.
- Switched Debian repositories from Bookworm to Trixie with
  `non-free-firmware` enabled.
- Added the Proxmox VE 9 no-subscription deb822 source.
- Installed `intel-microcode` on both nodes; final TSX status was
  `Mitigation: TSX disabled`.
- Changed VM CPU model from `Skylake-Client` to
  `Skylake-Client-noTSX-IBRS` for all cluster VMs. This was required because
  the upgraded/microcode-protected node no longer exposed TSX flags used by the
  previous VM CPU model.
- Disabled the generated PVE enterprise deb822 source with `Enabled: no` so
  no-subscription APT updates remain clean.

## Residual Follow-Ups

- Full retained VM backup archives were not found during inventory. Host config
  backups were captured, but this should be improved with a real enabled VM
  backup target and restore test.
- One OVMF VM emitted a UEFI certificate warning on start. Plan a shutdown
  window to enroll updated EFI keys with the Proxmox UI action or
  `qm enroll-efi-keys` after checking guest OS implications.
- `pve8to9` reported old-format RRD files as informational post-upgrade data.
  Keep them if historical graphs are useful; delete only if old history is not
  needed.

## Initial Evidence

Captured on 2026-06-23 through the Proxmox API and the official Proxmox
documentation.

- Cluster health was healthy with both nodes online.
- Cluster release endpoint reported Proxmox VE `8.4.19` / release `8.4`.
- Both nodes reported `pve-manager/8.4.19/a68fb383814bb1e6`.
- Both nodes were booted on kernel `6.8.12-29-pve`.
- Both nodes had pending packages: `proxmox-kernel-6.8` to `6.8.12-30`,
  `proxmox-kernel-6.8.12-30-pve-signed`, and `libhttp-daemon-perl`.
- Both nodes used EFI boot mode with Secure Boot disabled.
- Root filesystems had more than 10 GB free.
- Shared VM-image storage was online on both nodes and lightly used.
- Local Proxmox backup storage on both nodes had no backups.
- The only Proxmox cluster backup job found was disabled.
- All current VM disks were on shared storage, which keeps migration feasible.
- The high-load camera/standby-DNS VM was powered off during the upgrade work
  to reduce load.
- Repository drift cleanup completed on 2026-06-23: the duplicate Proxmox
  no-subscription install repo and inactive Ceph Quincy repo were disabled on
  both nodes through the Proxmox repository API. `apt update` then completed OK
  on both nodes with no warnings or errors.

## Readiness Checklist

- [x] Read issue #1745 and official Proxmox lifecycle/upgrade documents.
- [x] Capture cluster health and live resource posture.
- [x] Capture current Proxmox VE release, node kernel, boot mode, storage, VM,
  repository, and pending-package state.
- [x] Identify initial load-management target for planning work.
- [x] Disable duplicate/stale Proxmox and Ceph APT repository entries, then
  confirm clean `apt update` output through the Proxmox API.
- [x] Apply pending Proxmox VE 8.4 updates on both nodes.
- [x] Reboot each node as needed and confirm it returns healthy.
- [x] Run `pve8to9 --full` on each node and save the output.
- [ ] Verify full VM backups and at least one restore path for every critical
  guest.
- [x] Confirm recovery access that does not depend on a running guest.
- [x] Confirm an operator console path that can run host shell commands:
  SSH, out-of-band/local console, or an approved logged-in Proxmox UI console.
- [x] Confirm final guest move/shutdown order for each node.
- [x] Execute the Proxmox VE 9 upgrade in a maintenance window.

## Guest Handling Strategy

Upgrade the quieter node first after the camera/standby-DNS VM is stopped. This
keeps the first host upgrade low-risk and proves the upgrade path on a node that
does not currently carry the main always-on workloads.

For the busier node, keep the camera/standby-DNS VM stopped and migrate or stop
guests deliberately. The current memory footprint suggests not every active VM
can be moved to the other node at once. Treat the home-automation VM as the
highest-priority guest to keep running, then decide which internal tooling or
edge/public VMs can be stopped temporarily.

Suggested order:

1. Update and upgrade the quieter node while the camera/standby-DNS VM remains
   stopped.
2. Validate the quieter node after reboot.
3. Move only the required critical guest set to the upgraded node.
4. Stop non-critical guests that do not fit safely during the busier-node
   maintenance window.
5. Upgrade the busier node.
6. Validate the busier node after reboot.
7. Restore normal guest placement and power state.

## Preflight Commands

Run from a durable console session such as `tmux` or `screen` on the node being
worked. Capture output for the issue before changing repositories.

```bash
pveversion -v
uname -a
apt update
apt list --upgradable
apt policy
pvesm status
pvesh get /cluster/status
pvesh get /cluster/resources --type vm
pve8to9 --full
```

Review:

- No node is degraded.
- No storage used by guests is unavailable.
- No unexpected Bookworm, test, stale Ceph, or duplicate repository entries are
  present.
- No guest depends on local-only disks unless intentionally handled.
- `pve8to9 --full` warnings are understood before continuing.

## Bring Nodes Current on 8.4

Do this before any Debian Trixie or Proxmox VE 9 repository changes.

```bash
apt update
apt dist-upgrade
pveversion
```

If the kernel changes, reboot the node and verify it returns cleanly before
updating the next node.

## Upgrade Procedure Template

Follow the official Proxmox guide for exact repository content and any changes
made after this document was written.

For each node, after backups, recovery access, and `pve8to9 --full` are clean or
explicitly accepted:

```bash
tmux new -s pve9-upgrade
pve8to9 --full
apt update
apt dist-upgrade
pve8to9 --full
reboot
```

For the actual 8 to 9 step, update Debian and Proxmox repositories from
Bookworm to Trixie, use the Proxmox VE 9 repository format documented by
Proxmox, then run:

```bash
apt update
apt policy
apt dist-upgrade
pve8to9 --full
reboot
```

Do not accept any apt transaction that removes the `proxmox-ve` package unless
the official guide and `pve8to9` output explicitly explain the situation.

## Known-Issue Checks

Check these before the maintenance window:

- cgroup v1 removal and any legacy container assumptions.
- Network interface naming changes.
- EFI, GRUB, LVM, and systemd-boot warnings.
- LVM/LVM-thin autoactivation warnings from `pve8to9`.
- Third-party repositories and storage plugins.
- Ceph repository state. If Ceph is not actually used, remove stale Ceph repo
  entries before the upgrade; if it is used, follow the official Ceph Squid
  prerequisite first.
- Kernel 6.14 compatibility with older hardware and any PCI/USB passthrough.
- `systemd-sysctl` no longer reading `/etc/sysctl.conf`; move persistent
  sysctl settings to `/etc/sysctl.d/`.
- Debian 13 `/tmp` behavior changes.

## Post-Upgrade Validation

Validate after each node, not only at the end.

```bash
pveversion -v
uname -a
pvesh get /cluster/status
pvesm status
pvesh get /cluster/resources --type vm
apt update
apt list --upgradable
pve8to9 --full
```

Also verify:

- Proxmox UI/API reachable.
- Cluster shows both nodes online after each reboot.
- Shared storage is mounted on both nodes.
- Migrated guests start and report healthy.
- Home Assistant, MQTT, DNS, camera/NVR, edge apps, backups, and monitoring are
  healthy according to their normal validation surfaces.
- Home Assistant Proxmox telemetry and repair automations return to normal.

## Rollback and Recovery Notes

- A failed major upgrade is not a simple package downgrade. Treat recovery as
  restore-from-backup or repair-in-place using the official troubleshooting
  guide.
- Keep one node unchanged while upgrading the other.
- Keep guest backups and config exports outside the node being upgraded.
- Preserve `/etc/pve`, network config, storage config, and any non-default host
  config before the upgrade.
- If apt reports that `proxmox-ve` would be removed, stop and fix repository
  configuration before proceeding.
- If a node fails to boot, use host-independent recovery access and the official
  GRUB/recovery guidance.
