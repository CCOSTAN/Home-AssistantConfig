# Bear Stone topology notes

- This is the public, README-friendly deployment summary for the Home Assistant repository.
- The topology is sourced from the workspace `AGENTS.md` inventory and stays high-level enough for GitHub browsing.
- `docker10` and `codex-appliance` are pinned to ProxMox1; durable VM storage is represented by `Prox-NFS01`.
- `codex-appliance` is summarized as the Codex/MCP runtime plus admin and service agents.
- `docker14`, `docker17`, and `docker69` are shown as shared-storage Docker VMs because the current workspace inventory does not pin them to one Proxmox node.
- `docker10` owns the Home Assistant core stack; `wyze-bridge` stays there and Frigate on `docker14` consumes its RTSP feed.
- `docker17` groups LAN-only tools and internal apps; `docker69` groups Cloudflare-tunneled public apps and WordPress.
- The diagram intentionally summarizes service groups rather than every container, port, or private path.
- Use the Mermaid source as the editable system of record, then import it into Excalidraw for spacing and visual cleanup when a polished graphic is needed.
