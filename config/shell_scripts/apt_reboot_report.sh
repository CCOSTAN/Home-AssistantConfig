#!/usr/bin/env bash
set -euo pipefail

# Boot report for APT-managed hosts.
# Reuses the registered apt_weekly webhook; a timer reconciles after HA restarts.
# This reports only reboot state and never replaces package results.

WEBHOOK_SOURCE="${1:-}"
HOST_NAME="${2:-$(hostname -s)}"

case "$HOST_NAME" in
  docker10) HOST_NAME="docker_10" ;;
  docker14) HOST_NAME="docker_14" ;;
  docker17) HOST_NAME="docker_17" ;;
  docker69) HOST_NAME="docker_69" ;;
  docker13|codex-appliance) HOST_NAME="docker_13" ;;
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

post_report() {
  local retry_max_time="$1"
  local reboot_required=false
  [[ ! -f /var/run/reboot-required ]] || reboot_required=true
  local payload
  payload="{\"event\":\"reboot_status\",\"host\":\"${HOST_NAME}\",\"reboot_required\":${reboot_required},\"observed_at\":$(date +%s)}"

  curl --fail --silent --show-error \
    --connect-timeout 5 \
    --max-time 20 \
    --retry 30 \
    --retry-delay 10 \
    --retry-connrefused \
    --retry-all-errors \
    --retry-max-time "$retry_max_time" \
    -X POST \
    -H 'Content-Type: application/json' \
    -d "$payload" \
    "$WEBHOOK_URL"
}

post_report 300
