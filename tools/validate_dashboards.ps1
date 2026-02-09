param()

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$py = Get-Command py -ErrorAction SilentlyContinue
if (-not $py) {
  throw "Python launcher 'py' not found. Install Python 3 or run tools/validate_dashboards.py with your python."
}

py -3 "$repoRoot\tools\validate_dashboards.py"

