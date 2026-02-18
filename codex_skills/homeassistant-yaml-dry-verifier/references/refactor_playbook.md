# Home Assistant YAML DRY Refactor Playbook

Use these patterns after verifier findings.

## Repeated Actions or Sequence

- Move common action chains into a reusable script (`script.<name>`).
- Use script fields/variables instead of duplicating payload variants.
- Keep each automation focused on trigger + routing, not full action implementation.

## Repeated Conditions

- Promote shared logic into helper entities (`input_boolean`, helper groups) or template sensors.
- Replace long repeated `and` chains with a single meaningful condition entity when practical.
- Keep per-automation overrides small and explicit.

## Repeated Triggers

- Merge equivalent triggers into one automation when the resulting behavior stays clear.
- If actions diverge, keep separate automations but centralize shared actions in scripts.
- Avoid copy-paste time/state triggers that only differ by one minor field; parameterize if possible.

## Intra-Block Duplicates

- Remove exact duplicate entries inside the same trigger/condition/action list.
- Keep only one canonical copy of each entry.

## Validation Loop

1. Run verifier.
2. Refactor.
3. Run verifier again.
4. Run Home Assistant config check before reload/restart.
