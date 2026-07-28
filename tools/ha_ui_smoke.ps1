param(
  [string]$BaseUrl = $env:HASS_PLAYWRIGHT_BASE_URL,
  [string]$NodePath = $env:HASS_PLAYWRIGHT_NODE_PATH,
  [string]$PlaywrightModulePath = $env:PLAYWRIGHT_MODULE_PATH,
  [string]$ExecutablePath = $env:HASS_PLAYWRIGHT_EXECUTABLE_PATH,
  [string]$OutputDir,
  [string[]]$Routes,
  [switch]$Headed
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
if ([string]::IsNullOrWhiteSpace($BaseUrl)) {
  $BaseUrl = 'http://192.168.10.10:8123'
}
if ([string]::IsNullOrWhiteSpace($OutputDir)) {
  $OutputDir = Join-Path $repoRoot 'output/playwright/ha-ui-smoke'
}

if ([string]::IsNullOrWhiteSpace($NodePath)) {
  $node = Get-Command node -ErrorAction SilentlyContinue
  if ($node) {
    $NodePath = $node.Source
  }
}
if ([string]::IsNullOrWhiteSpace($NodePath) -or -not (Test-Path -LiteralPath $NodePath)) {
  throw 'Node.js not found. Set HASS_PLAYWRIGHT_NODE_PATH or install Node.js.'
}

if (-not $Routes -or $Routes.Count -eq 0) {
  $python = Get-Command py -ErrorAction SilentlyContinue
  $pythonArguments = @()
  if ($python) {
    $pythonArguments += '-3'
  } else {
    $python = Get-Command python -ErrorAction SilentlyContinue
  }
  if (-not $python) {
    throw 'Python 3 not found; it is required to generate validated dashboard routes.'
  }
  $routesJson = & $python.Source @pythonArguments "$repoRoot/tools/validate_dashboards.py" '--routes-json'
  if ($LASTEXITCODE -ne 0) {
    throw 'Dashboard validation failed; refusing to start browser smoke tests.'
  }
} else {
  $routesJson = ConvertTo-Json -Compress -InputObject @($Routes)
}

$savedNodePath = $env:NODE_PATH
$savedModulePath = $env:PLAYWRIGHT_MODULE_PATH
$savedExecutablePath = $env:HASS_PLAYWRIGHT_EXECUTABLE_PATH
$savedRoutes = $env:HASS_UI_ROUTES_JSON

try {
  if (-not [string]::IsNullOrWhiteSpace($PlaywrightModulePath)) {
    if (-not (Test-Path -LiteralPath $PlaywrightModulePath)) {
      throw "Playwright module path does not exist: $PlaywrightModulePath"
    }
    $moduleParent = Split-Path -Parent $PlaywrightModulePath
    $pnpmModules = Join-Path $moduleParent '.pnpm/node_modules'
    $nodePaths = @($moduleParent)
    if (Test-Path -LiteralPath $pnpmModules) {
      $nodePaths += $pnpmModules
    }
    $env:NODE_PATH = $nodePaths -join [IO.Path]::PathSeparator
    $env:PLAYWRIGHT_MODULE_PATH = $PlaywrightModulePath
  }
  if (-not [string]::IsNullOrWhiteSpace($ExecutablePath)) {
    $env:HASS_PLAYWRIGHT_EXECUTABLE_PATH = $ExecutablePath
  }
  $env:HASS_UI_ROUTES_JSON = [string]$routesJson

  $arguments = @(
    "$repoRoot/tools/ha_ui_smoke.mjs"
    '--base-url'
    $BaseUrl.TrimEnd('/')
    '--output-dir'
    $OutputDir
  )
  if ($Headed) {
    $arguments += '--headed'
  }
  & $NodePath @arguments
  exit $LASTEXITCODE
} finally {
  $env:NODE_PATH = $savedNodePath
  $env:PLAYWRIGHT_MODULE_PATH = $savedModulePath
  $env:HASS_PLAYWRIGHT_EXECUTABLE_PATH = $savedExecutablePath
  $env:HASS_UI_ROUTES_JSON = $savedRoutes
}
