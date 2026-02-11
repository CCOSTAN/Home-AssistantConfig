#!/usr/bin/env bash
set -euo pipefail

# Boot report for APT-managed hosts.
# Sends current reboot-required state after each system boot.

WEBHOOK_URL="$1"
HOST_NAME="${2:-$(hostname -s)}"

if [[ -z "$WEBHOOK_URL" ]]; then
  echo "Usage: $0 <webhook_url> [host_name]" >&2
  exit 1
fi

REBOOT_REQUIRED=false
if [[ -f /var/run/reboot-required ]]; then
  REBOOT_REQUIRED=true
fi

payload=$(cat <<JSON
{
  "event": "boot_report",
  "host": "${HOST_NAME}",
  "reboot_required": $( $REBOOT_REQUIRED && echo true || echo false )
}
JSON
)

curl -sS -X POST -H 'Content-Type: application/json' -d "$payload" "$WEBHOOK_URL" || true
