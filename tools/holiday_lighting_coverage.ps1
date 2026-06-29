param(
  [int]$Months = 24,
  [datetime]$StartDate = (Get-Date).Date
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$holidayPath = Join-Path $repoRoot 'config/www/json_data/holidays.json'
$flagPath = Join-Path $repoRoot 'config/www/json_data/flag_days.json'
$scenePath = Join-Path $repoRoot 'config/scene/monthly_colors.yaml'
$endDate = $StartDate.Date.AddMonths($Months)
$errors = @()

function Read-JsonFile {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path
  )

  if (-not (Test-Path -LiteralPath $Path)) {
    throw "Missing JSON file: $Path"
  }

  try {
    return Get-Content -Raw -LiteralPath $Path | ConvertFrom-Json -AsHashtable
  } catch {
    throw "Invalid JSON in $Path`: $($_.Exception.Message)"
  }
}

function Parse-DateKey {
  param(
    [Parameter(Mandatory = $true)]
    [string]$DateText
  )

  return [datetime]::Parse(
    $DateText,
    [Globalization.CultureInfo]::InvariantCulture
  ).Date
}

function Get-DynamicEvents {
  param(
    [Parameter(Mandatory = $true)]
    [object]$DynamicMap,
    [Parameter(Mandatory = $true)]
    [string[]]$Names
  )

  $events = @()
  foreach ($dateText in $DynamicMap.Keys) {
    $eventDate = Parse-DateKey -DateText ([string]$dateText)
    $eventName = [string]$DynamicMap[$dateText]
    if ($eventDate -ge $StartDate.Date -and $eventDate -lt $endDate -and $Names -contains $eventName) {
      $events += [pscustomobject]@{
        Name = $eventName
        Date = $eventDate
      }
    }
  }
  return $events | Sort-Object Date, Name
}

$holidayJson = Read-JsonFile -Path $holidayPath
$flagJson = Read-JsonFile -Path $flagPath
$holidayData = $holidayJson['MAJOR_US']
$flagData = $flagJson['Flag_Days_US']
$holidayStatic = $holidayData['static']
$holidayDynamic = $holidayData['dynamic']
$flagDynamic = $flagData['dynamic']

$sceneText = Get-Content -Raw -LiteralPath $scenePath
$sceneNames = [System.Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)
foreach ($match in [regex]::Matches($sceneText, '(?m)^\s*-\s+name:\s+(month_[A-Za-z0-9_]+_colors)\s*$')) {
  [void]$sceneNames.Add($match.Groups[1].Value)
}

$lightingModes = @(
  'standard',
  'RWB',
  'new_years_day',
  'valentine',
  'mardi_gras',
  'pi',
  'st_patty',
  'easter',
  'starwars',
  'cinco_de_mayo',
  'mothers_day',
  'fathers_day',
  'halloween',
  'veterans',
  'thanksgiving',
  'hanukkah',
  'christmas'
)

foreach ($mode in $lightingModes) {
  $sceneName = "month_${mode}_colors"
  if (-not $sceneNames.Contains($sceneName)) {
    $errors += "Missing scene for lighting mode '$mode': expected $sceneName in $scenePath"
  }
}

$staticRequirements = @(
  @{ Key = '1/1'; Name = 'New Years Day' },
  @{ Key = '2/14'; Name = 'Valentines Day' },
  @{ Key = '3/14'; Name = 'Pi Day' },
  @{ Key = '3/17'; Name = 'St. Patricks Day' },
  @{ Key = '5/4'; Name = 'Star Wars Day' },
  @{ Key = '5/5'; Name = 'Cinco de Mayo' },
  @{ Key = '7/4'; Name = 'Independence Day' },
  @{ Key = '10/31'; Name = 'Halloween' },
  @{ Key = '11/11'; Name = 'Veterans Day' },
  @{ Key = '12/25'; Name = 'Christmas Day' },
  @{ Key = '12/31'; Name = 'New Years Eve' }
)

foreach ($requirement in $staticRequirements) {
  if (-not $holidayStatic.ContainsKey($requirement.Key)) {
    $errors += "Missing static holiday key $($requirement.Key) for $($requirement.Name)"
  }
}

$dynamicRequirements = @(
  @{ Name = 'Easter Sunday'; Source = 'holidays'; Map = $holidayDynamic },
  @{ Name = 'Mothers Day'; Source = 'holidays'; Map = $holidayDynamic },
  @{ Name = 'Fathers Day'; Source = 'holidays'; Map = $holidayDynamic },
  @{ Name = 'Thanksgiving Day'; Source = 'holidays'; Map = $holidayDynamic },
  @{ Name = 'Memorial Day'; Source = 'flag_days'; Map = $flagDynamic },
  @{ Name = 'Labor Day'; Source = 'flag_days'; Map = $flagDynamic }
)

foreach ($requirement in $dynamicRequirements) {
  $events = @(Get-DynamicEvents -DynamicMap $requirement.Map -Names @($requirement.Name))
  if ($events.Count -eq 0) {
    $errors += "No $($requirement.Source) calendar coverage for '$($requirement.Name)' between $($StartDate.ToString('yyyy-MM-dd')) and $($endDate.ToString('yyyy-MM-dd'))"
  }
}

Write-Host "Holiday lighting coverage window: $($StartDate.ToString('yyyy-MM-dd')) to $($endDate.ToString('yyyy-MM-dd'))"
Write-Host "JSON: OK - parsed holidays.json and flag_days.json"
Write-Host "Scenes: $($sceneNames.Count) monthly scenes found"

if ($errors.Count -gt 0) {
  foreach ($err in $errors) {
    Write-Host "ERROR: $err"
  }
  exit 1
}

foreach ($requirement in $dynamicRequirements) {
  $events = @(Get-DynamicEvents -DynamicMap $requirement.Map -Names @($requirement.Name))
  $dates = ($events | ForEach-Object { $_.Date.ToString('yyyy-MM-dd') }) -join ', '
  Write-Host "$($requirement.Name): $dates"
}

Write-Host "Coverage OK: required lighting scenes and dynamic holiday dates are present for the requested window."
