param()

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$python = Get-Command py -ErrorAction SilentlyContinue
$arguments = @()

if ($python) {
  $arguments += '-3'
} else {
  $python = Get-Command python -ErrorAction SilentlyContinue
}

if (-not $python) {
  throw "Python 3 not found. Install Python 3 and the pinned requirements in requirements-dev.txt."
}

& $python.Source @arguments "$repoRoot/tools/validate_dashboards.py"
exit $LASTEXITCODE
