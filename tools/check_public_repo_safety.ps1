######################################################################
# @CCOSTAN - Follow Me on X
# For more info visit https://www.vcloudinfo.com/click-here
# Original Repo : https://github.com/CCOSTAN/Home-AssistantConfig
# -------------------------------------------------------------------
# Public Repository Safety - Reject private and generated tracked paths.
#  Secret content scanning remains owned by the Secret Scan workflow.
# -------------------------------------------------------------------
######################################################################

[CmdletBinding()]
param()

$repoRoot = Split-Path -Parent $PSScriptRoot
$blockedPatterns = @(
  '^\.playwright-cli(?:/|$)',
  '^output(?:/|$)',
  '^homeassistant\.code-workspace$',
  '^\.vscode(?:/|$)',
  '^AGENTS(?:\.override)?\.md$',
  '^docs/agent_ops_baselines\.md$'
)

Push-Location $repoRoot
try {
  $candidateFiles = @(git ls-files --cached --others --exclude-standard)
  if ($LASTEXITCODE -ne 0) {
    throw 'Unable to list public repository candidate files.'
  }
} finally {
  Pop-Location
}

$blockedFiles = @(
  $candidateFiles | Where-Object {
    $path = $_
    $blockedPatterns | Where-Object { $path -match $_ } | Select-Object -First 1
  }
)

if ($blockedFiles.Count -gt 0) {
  $formatted = ($blockedFiles | Sort-Object | ForEach-Object { "  - $_" }) -join [Environment]::NewLine
  throw "Public repository safety check failed. Remove these private or generated tracked paths:$([Environment]::NewLine)$formatted"
}

Write-Host "Public repository safety check passed ($($candidateFiles.Count) public candidate files inspected)."
