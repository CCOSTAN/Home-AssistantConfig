param(
  [int]$Months = 24,
  [datetime]$StartDate = (Get-Date).Date
)

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

$arguments += @(
  "$repoRoot/tools/holiday_lighting_coverage.py"
  '--months'
  $Months
  '--start-date'
  $StartDate.ToString('yyyy-MM-dd')
)

& $python.Source @arguments
exit $LASTEXITCODE
