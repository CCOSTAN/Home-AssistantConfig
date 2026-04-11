param(
  [string]$TargetHost = 'docker_10',
  [string]$ContainerName = 'home-assistant',
  [string]$ConfigPath = '/config',
  [ValidateSet('auto', 'container', 'supervised')]
  [string]$Mode = 'auto'
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$ssh = Get-Command ssh -ErrorAction Stop

function Quote-BashArg {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Value
  )

  return "'" + $Value.Replace("'", "'`"`'`"`'") + "'"
}

$containerNameQ = Quote-BashArg -Value $ContainerName
$configPathQ = Quote-BashArg -Value $ConfigPath

$containerCheckScript = @'
import asyncio
import os

from homeassistant import bootstrap, core, loader
from homeassistant.config_entries import ConfigEntries
from homeassistant.helpers.check_config import async_check_ha_config_file

CONFIG_DIR = os.environ.get("CONFIG_DIR", "/config")


async def main() -> int:
    hass = core.HomeAssistant(CONFIG_DIR)
    loader.async_setup(hass)
    hass.config_entries = ConfigEntries(hass, {})

    ok = await bootstrap.async_load_base_functionality(hass)
    if not ok:
        print(f"Failed to initialize base functionality for {CONFIG_DIR}")
        await hass.async_stop(force=True)
        return 1

    res = await async_check_ha_config_file(hass)
    await hass.async_stop(force=True)

    print(f"Testing configuration at {CONFIG_DIR}")
    if res.errors:
        print("Failed config")
        for err in res.errors:
            print(f"  {err.domain or 'error'}: {err.message}")
        return 1

    print("Configuration valid")
    if res.warnings:
        print("Warnings:")
        for warn in res.warnings:
            print(f"  {warn.domain or 'warning'}: {warn.message}")
    return 0


raise SystemExit(asyncio.run(main()))
'@

$containerCheckScript = ($containerCheckScript -replace "`r`n", "`n").Trim()

$containerCheck = @"
if ! command -v docker >/dev/null 2>&1; then
  echo Docker CLI not found on host. >&2
  exit 127
fi
if ! docker ps --format '{{.Names}}' | grep -Fx $containerNameQ >/dev/null 2>&1; then
  echo Container $containerNameQ is not running. >&2
  exit 1
fi
echo Running Home Assistant config check in container $containerNameQ...
docker exec -i -e CONFIG_DIR=$configPathQ $containerNameQ python -
"@

$supervisedCheck = @'
if ! command -v ha >/dev/null 2>&1; then
  echo Home Assistant Supervisor CLI not found on host. >&2
  exit 127
fi
echo Running Home Assistant config check via Supervisor CLI...
ha core check
'@

switch ($Mode) {
  'supervised' { $remoteCommand = $supervisedCheck }
  'container' { $remoteCommand = $containerCheck }
  'auto' {
    $remoteCommand = @"
if command -v ha >/dev/null 2>&1; then
  echo Running Home Assistant config check via Supervisor CLI...
  ha core check
elif command -v docker >/dev/null 2>&1; then
  $containerCheck
else
  echo Neither Home Assistant Supervisor CLI nor Docker CLI is available on host. >&2
  exit 127
fi
"@
  }
}

$remoteCommand = ($remoteCommand -replace "`r`n", "`n").Trim()

$sshArgs = @(
  '-o'
  'RemoteCommand=none'
  '-o'
  'RequestTTY=no'
  $TargetHost
  'bash'
  '-lc'
  (Quote-BashArg -Value $remoteCommand)
)

$stdinPayload = if ($Mode -eq 'container' -or $Mode -eq 'auto') { $containerCheckScript } else { '' }

if ([string]::IsNullOrEmpty($stdinPayload)) {
  & $ssh.Source @sshArgs
} else {
  $stdinPayload | & $ssh.Source @sshArgs
}
exit $LASTEXITCODE
