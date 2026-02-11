#!/usr/bin/env bash
set -euo pipefail

# Weekly APT maintenance for docker hosts (runs Wednesdays at 12:00 local via systemd timer)
# Posts results to Home Assistant webhook and optionally schedules reboot when required.

WEBHOOK_URL="$1"
HOST_NAME="${2:-$(hostname -s)}"
REBOOT_DELAY_MINUTES="${3:-}"

if [[ -z "$WEBHOOK_URL" ]]; then
  echo "Usage: $0 <webhook_url> [host_name] [reboot_delay_minutes]" >&2
  exit 1
fi

AUTO_REBOOT=false
if [[ -n "$REBOOT_DELAY_MINUTES" ]]; then
  if [[ "$REBOOT_DELAY_MINUTES" =~ ^[0-9]+$ ]]; then
    AUTO_REBOOT=true
  else
    echo "reboot_delay_minutes must be a non-negative integer" >&2
    exit 1
  fi
fi

log() { echo "[$(date --iso-8601=seconds)] $*"; }

UPDATED=false
REBOOT=false
MESSAGE=""
log "Updating package lists"
if ! apt-get update -qq; then
  MESSAGE="apt-get update failed"
  curl -sS -X POST -H 'Content-Type: application/json' -d "{\"success\":false,\"updated\":false,\"packages\":0,\"reboot_required\":false,\"message\":\"$MESSAGE\"}" "$WEBHOOK_URL"
  exit 0
fi

PACKAGES=$(apt list --upgradable 2>/dev/null | tail -n +2 | wc -l)

if [[ "$PACKAGES" -gt 0 ]]; then
  log "Applying upgrades ($PACKAGES pending)"
  if apt-get -y upgrade --with-new-pkgs; then
    UPDATED=true
  else
    MESSAGE="apt-get upgrade failed"
  fi
else
  log "No packages to upgrade"
fi

log "Autoremoving stale packages"
apt-get -y autoremove >/dev/null 2>&1 || true

if [[ -f /var/run/reboot-required ]]; then
  REBOOT=true
fi

payload=$(cat <<JSON
{
  "host": "${HOST_NAME}",
  "success": $( [[ "$MESSAGE" == "" ]] && echo true || echo false ),
  "updated": $( $UPDATED && echo true || echo false ),
  "packages": $PACKAGES,
  "reboot_required": $( $REBOOT && echo true || echo false ),
  "auto_reboot_scheduled": $( [[ "$REBOOT" == true && "$AUTO_REBOOT" == true && "$MESSAGE" == "" ]] && echo true || echo false ),
  "reboot_delay_minutes": ${REBOOT_DELAY_MINUTES:-0},
  "message": "${MESSAGE}"
}
JSON
)

log "Posting results to Home Assistant"
curl -sS -X POST -H 'Content-Type: application/json' -d "$payload" "$WEBHOOK_URL" || true

if [[ "$REBOOT" == true && "$AUTO_REBOOT" == true && "$MESSAGE" == "" ]]; then
  shutdown -c >/dev/null 2>&1 || true
  if [[ "$REBOOT_DELAY_MINUTES" -eq 0 ]]; then
    log "Reboot required; rebooting immediately."
    shutdown -r now "APT weekly maintenance reboot"
  else
    log "Reboot required; scheduling reboot in ${REBOOT_DELAY_MINUTES} minute(s)."
    shutdown -r +"$REBOOT_DELAY_MINUTES" "APT weekly maintenance reboot"
  fi
fi
