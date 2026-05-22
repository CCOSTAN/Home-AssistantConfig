#!/usr/bin/env bash
set -euo pipefail

# Read-only APT pending check for Docker hosts.
# Posts current package counts to the same Home Assistant webhook as apt_weekly.sh.

WEBHOOK_URL="$1"
HOST_NAME="${2:-$(hostname -s)}"

if [[ -z "$WEBHOOK_URL" ]]; then
  echo "Usage: $0 <webhook_url> [host_name]" >&2
  exit 1
fi

post_result() {
  local success="$1"
  local packages="$2"
  local security_packages="$3"
  local reboot_required="$4"
  local message="${5:-}"

  payload=$(cat <<JSON
{
  "event": "pending_check",
  "host": "${HOST_NAME}",
  "success": ${success},
  "updated": false,
  "packages": ${packages},
  "security_packages": ${security_packages},
  "reboot_required": ${reboot_required},
  "message": "${message}"
}
JSON
)

  curl -sS -X POST -H 'Content-Type: application/json' -d "$payload" "$WEBHOOK_URL" || true
}

log() { echo "[$(date --iso-8601=seconds)] $*"; }

APT_OPTS=(-o Acquire::ForceIPv4=true)
REBOOT=false
if [[ -f /var/run/reboot-required ]]; then
  REBOOT=true
fi

log "Refreshing package lists"
if ! apt-get "${APT_OPTS[@]}" update -qq; then
  post_result false 0 0 "$REBOOT" "apt-get update failed"
  exit 0
fi

UPGRADABLE="$(apt list --upgradable 2>/dev/null | tail -n +2 || true)"
PACKAGES=0
SECURITY_PACKAGES=0
if [[ -n "$UPGRADABLE" ]]; then
  PACKAGES="$(printf '%s\n' "$UPGRADABLE" | sed '/^[[:space:]]*$/d' | wc -l)"
  SECURITY_PACKAGES="$(printf '%s\n' "$UPGRADABLE" | grep -Ec '(^|,|-)(security|esm-apps-security|esm-infra-security)(,|/|[[:space:]]|$)' || true)"
fi

log "Posting pending package count to Home Assistant"
post_result true "$PACKAGES" "$SECURITY_PACKAGES" "$REBOOT" ""
