# Repository validation

Run the same tracked checks used by Config Validation before pushing:

```powershell
pwsh -NoProfile -File .github/scripts/check_public_repo_safety.ps1
python -m unittest discover -s .github/scripts -p test_validate_dashboards.py -v
pwsh -NoProfile -File .github/scripts/validate_dashboards.ps1
pwsh -NoProfile -File .github/scripts/holiday_lighting_coverage.ps1
node --check .github/scripts/ha_ui_smoke.mjs
```

Dashboard entity references must be present in repository configuration or in
`dashboard_entity_allowlist.txt`. For integration, UI-created, or generated entities,
verify the exact entity against Home Assistant before adding its ID to that sorted
list. Keep only IDs already referenced by public dashboards; never export registry
metadata. Unused entries fail validation.

Private runtime storage provides an additional check of allowlisted entities when
available. It cannot make an otherwise undocumented reference pass locally, so a
clean checkout and a live checkout enforce the same public reference requirement.
