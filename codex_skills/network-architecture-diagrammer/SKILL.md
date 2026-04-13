---
name: network-architecture-diagrammer
description: "Create homelab and network architecture diagrams from plain-English prompts by producing Mermaid-first artifacts that import cleanly into Excalidraw. Use for Docker host topology, service dependency maps, Cloudflare/public edge diagrams, and before/after infrastructure sketches."
---

# Network Architecture Diagrammer

Use text-first architecture diagrams that round-trip well: Mermaid source first, Excalidraw second.

## When to Use

- The user asks for a network diagram, architecture sketch, topology map, or service relationship view.
- You need a reviewable artifact that belongs in git, docs, or an issue comment.
- You need a fast homelab diagram from AGENTS, compose files, README notes, or runtime inventory.

## Primary Artifact

- Produce Mermaid flowcharts first.
- Keep the output Excalidraw-importable instead of Mermaid-fancy.
- If the user wants a file, write a `.mmd` file.
- Add a short `.md` legend or assumptions file only when it materially helps.

## Workflow

1. Collect topology truth from `AGENTS.md`, compose files, repo docs, and MCP/runtime inventory when available.
2. Pick one view:
   - context: user, cloud, edge, host
   - deployment: hosts, containers/apps, data stores
   - flow: request/data/event path
   - delta: before/after architecture change
3. Normalize nodes into a small set:
   - users
   - internet/cloud
   - edge/tunnel/proxy
   - hosts
   - containers/apps
   - data stores
   - external systems
4. Split large requests into two diagrams instead of forcing one dense canvas.
5. Write Mermaid with one subgraph per host or trust zone and short, stable labels.
6. Run `scripts/validate_mermaid_excalidraw.py` on any Mermaid file you create.
7. Deliver the Mermaid artifact plus short assumptions and the Excalidraw import hint when useful.

## Excalidraw Compatibility Rules

- Use only Mermaid `flowchart` or `graph` syntax.
- Prefer plain labels, simple arrows, and `subgraph`.
- Avoid features that commonly import poorly into Excalidraw:
  - non-flowchart diagram types such as `sequenceDiagram`, `classDiagram`, `stateDiagram`, `erDiagram`, `journey`, `gantt`, `mindmap`, `timeline`, `pie`, `gitGraph`, `block-beta`, `packet-beta`, `sankey-beta`, `quadrantChart`, and `zenuml`
  - expanded shape syntax like `@{ ... }`
  - `classDef`, `class`, `style`, `linkStyle`, `click`, and HTML labels/tags
- Prefer stable hostnames over LAN IPs unless the IPs are the point of the diagram.
- Keep edge labels short: protocol, purpose, or port only when it changes understanding.
- Keep each diagram roughly under 15 nodes. Split by audience or scope when needed.

## Output Contract

Always produce:

1. A Mermaid code block.
2. A short assumptions or omissions list when anything was inferred.
3. An optional recommended filename such as `docs/diagrams/docker-host-topology.mmd`.
4. A short note that the Mermaid can be imported into Excalidraw for cleanup when the user wants a polished visual.

If asked to write files, prefer:

- `docs/diagrams/<name>.mmd`
- `docs/diagrams/<name>.md` for legend/notes only when helpful

## Prompt Pattern

Natural-language prompts are the default. Helpful details include:

- scope
- audience
- desired granularity
- whether public vs LAN edge matters
- whether a before/after comparison is needed

Example:

- "Create a deployment diagram for docker10/docker14/docker17/docker69, show Cloudflare edge publishing, and make clear which services are LAN-only."

## References

- Read `references/excalidraw_mermaid_rules.md` for the diagram playbook and example patterns.

## Validation

- Run `python scripts/validate_mermaid_excalidraw.py <file.mmd>` when a Mermaid file is created.
- If the validator flags unsupported syntax, simplify the diagram instead of forcing Mermaid-only features.
