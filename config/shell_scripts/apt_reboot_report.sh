#!/usr/bin/env bash
set -euo pipefail

# Boot report for APT-managed hosts.
# Reuses the registered apt_weekly webhook and retries while Home Assistant starts.

WEBHOOK_SOURCE="${1:-}"
HOST_NAME="${2:-$(hostname -s)}"

case "$HOST_NAME" in
  docker10) HOST_NAME="docker_10" ;;
  docker14) HOST_NAME="docker_14" ;;
  docker17) HOST_NAME="docker_17" ;;
  docker69) HOST_NAME="docker_69" ;;
esac

if [[ "$WEBHOOK_SOURCE" == "--from-apt-weekly" ]]; then
  WEEKLY_EXEC_START="$(systemctl show apt_weekly.service --property=ExecStart --value 2>/dev/null || true)"
  WEBHOOK_URL="$(printf '%s\n' "$WEEKLY_EXEC_START" | grep -Eo 'https?://[^ ;]+' | head -n 1 || true)"
else
  WEBHOOK_URL="$WEBHOOK_SOURCE"
fi

if [[ -z "$WEBHOOK_URL" ]]; then
  echo "Usage: $0 <webhook_url|--from-apt-weekly> [host_name]" >&2
  echo "Unable to resolve the registered APT webhook." >&2
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

curl --fail --silent --show-error \
  --connect-timeout 5 \
  --max-time 20 \
  --retry 30 \
  --retry-delay 10 \
  --retry-connrefused \
  --retry-all-errors \
  --retry-max-time 300 \
  -X POST \
  -H 'Content-Type: application/json' \
  -d "$payload" \
  "$WEBHOOK_URL"
