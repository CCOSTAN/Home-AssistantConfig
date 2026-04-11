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
docker exec $containerNameQ python -m homeassistant --script check_config --config $configPathQ
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

& $ssh.Source @sshArgs
exit $LASTEXITCODE
