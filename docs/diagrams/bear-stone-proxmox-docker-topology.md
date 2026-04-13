# Bear Stone topology notes

- This is a deployment inventory diagram for blog and documentation use.
- `docker10` is pinned to ProxMox1 (`qemu/105`) based on the current workspace inventory.
- `docker14`, `docker17`, and `docker69` are shown as cluster-managed Docker VMs on shared storage because the current AGENTS inventory does not pin them to a single Proxmox node.
- The diagram is intentionally hierarchy-first. It shows hosts and containers, not every runtime network edge between services.
- Use the Mermaid source as the editable system-of-record, then import it into Excalidraw for spacing and visual cleanup when a polished graphic is needed.
