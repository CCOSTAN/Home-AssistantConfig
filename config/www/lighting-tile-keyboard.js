// The native gesture handler can retain its hold state on the next keyboard activation.
// Send keyboard gestures directly to the opt-in tile's configured action handler.
let pressedSpace;

function lightingButton(event) {
  const button = event.composedPath()[0];
  if (button?.getAttribute?.("role") !== "button") return;
  const container = button.getRootNode().host;
  if (container?.localName === "ha-tile-container" && container.closest("ha-card.lighting-toggle")) {
    return button;
  }
}

// Auto-entities rebuilds the grid when an On Now light turns off.
function followOnNowRemoval(button, path) {
  const list = path.find(node => node.localName === "auto-entities");
  if (!list) return;
  const tiles = () => list.querySelector("layout-card")?.shadowRoot
    ?.querySelector("grid-layout")?.shadowRoot?.querySelectorAll("hui-tile-card");
  const index = Array.from(tiles() ?? []).findIndex(tile => path.includes(tile));
  if (index < 0) return;

  const observer = new MutationObserver(() => {
    if (button.isConnected) return;
    observer.disconnect();
    clearTimeout(timeout);
    requestAnimationFrame(() => {
      if (!list.isConnected || document.activeElement !== document.body) return;
      const remaining = tiles();
      const tile = remaining?.length ? remaining[Math.min(index, remaining.length - 1)] : null;
      const next = tile?.shadowRoot?.querySelector("ha-tile-container")?.shadowRoot?.querySelector('[role="button"]');
      if (next) {
        next.focus();
      } else {
        list.tabIndex = -1;
        list.setAttribute("role", "region");
        list.setAttribute("aria-label", "On Now");
        list.focus();
      }
    });
  });
  // A failed toggle leaves the original tile in place.
  const timeout = setTimeout(() => observer.disconnect(), 5000);
  // The old grid can be replaced in the same frame as the keyboard action.
  for (const node of path) {
    if (node === list || node instanceof ShadowRoot) observer.observe(node, { childList: true, subtree: true });
    if (node === list) break;
  }
}

function activate(button, action, event) {
  if (action === "tap") followOnNowRemoval(button, event.composedPath());
  button.dispatchEvent(new CustomEvent("action", {
    bubbles: true,
    composed: true,
    detail: { action },
  }));
}

window.addEventListener("keydown", (event) => {
  if (event.defaultPrevented || event.isComposing || event.ctrlKey || event.altKey || event.metaKey) return;
  const details = event.key === "ContextMenu" || (event.shiftKey && event.key === "F10");
  if (!details && (event.shiftKey || !["Enter", " "].includes(event.key))) return;
  const button = lightingButton(event);
  if (!button) return;

  event.preventDefault();
  event.stopPropagation();
  if (event.repeat) return;
  if (event.key === " ") {
    pressedSpace = button;
  } else {
    activate(button, details ? "hold" : "tap", event);
  }
}, true);

window.addEventListener("keyup", (event) => {
  if (event.key !== " " || !pressedSpace) return;
  const button = pressedSpace;
  pressedSpace = undefined;
  if (lightingButton(event) !== button) return;
  event.preventDefault();
  event.stopPropagation();
  activate(button, "tap", event);
}, true);

window.addEventListener("focusout", (event) => {
  if (pressedSpace && event.composedPath()[0] === pressedSpace) pressedSpace = undefined;
}, true);

window.addEventListener("blur", () => { pressedSpace = undefined; });
