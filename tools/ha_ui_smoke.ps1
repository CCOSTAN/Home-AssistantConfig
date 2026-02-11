param(
  [string]$BaseUrl = $env:HASS_PLAYWRIGHT_BASE_URL
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($BaseUrl)) {
  # Canonical LAN URL for agent automation (trusted_networks bypass).
  $BaseUrl = 'http://192.168.10.10:8123'
}

$BaseUrl = $BaseUrl.TrimEnd('/')

function Get-EffectiveUrlAndStatus {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Url
  )

  # Use curl.exe (not Invoke-WebRequest alias) so we can reliably see redirects.
  $curl = (Get-Command curl.exe -ErrorAction Stop).Source

  # Follow redirects; return final URL + status code.
  $out = & $curl -sS -L -o NUL -w "%{url_effective} %{http_code}" $Url 2>$null
  if (-not $out) { throw "curl produced no output for $Url" }
  $parts = $out -split ' '
  if ($parts.Count -lt 2) { throw "Unexpected curl output: $out" }

  [pscustomobject]@{
    EffectiveUrl = $parts[0]
    StatusCode   = [int]$parts[1]
  }
}

$targets = @(
  '/',
  '/lovelace',
  '/lovelace/cameras',
  '/profile',
  '/dashboard-infrastructure',
  '/dashboard-infrastructure/home',
  '/dashboard-infrastructure/activity',
  '/dashboard-infrastructure/docker',
  '/dashboard-kiosk'
)

$failed = $false
foreach ($path in $targets) {
  $url = "$BaseUrl$path"
  $r = Get-EffectiveUrlAndStatus -Url $url

  $isLogin = $r.EffectiveUrl -match '/(login|auth/authorize)\\b'
  $statusOk = $r.StatusCode -ge 200 -and $r.StatusCode -lt 400

  if ($isLogin -or -not $statusOk) {
    $failed = $true
    Write-Host ("FAIL {0} -> {1} ({2})" -f $url, $r.EffectiveUrl, $r.StatusCode)
  } else {
    Write-Host ("OK   {0} -> {1} ({2})" -f $url, $r.EffectiveUrl, $r.StatusCode)
  }
}

if ($failed) {
  Write-Host ''
  Write-Host 'Likely causes:'
  Write-Host '- Base URL is external (Cloudflared/Nabu Casa) instead of LAN.'
  Write-Host '- Home Assistant does not see the request IP as trusted; check `homeassistant.auth_providers.trusted_networks`.'
  exit 1
}

exit 0
