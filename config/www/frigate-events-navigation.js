// Load the shared timeline helpers and keep one Clips player open at a time.
import "/local/frigate-events-auth.js?v=2";
import "/local/frigate-timeline-time.js?v=5";
import "/local/frigate-clip-review.js?v=5";

// Keep existing bookmarks useful while the visible routes describe each page.
const renamedRoute = {
  "/lovelace/camera": "/lovelace/live-cameras",
  "/lovelace/cameras": "/lovelace/clips",
}[location.pathname.replace(/\/$/, "")];
if (renamedRoute) location.replace(renamedRoute + location.search + location.hash);

const Card = customElements.get("frigate-events-card");
const installed = Symbol.for("frigate-events-card.dashboard-navigation");

if (Card?.prototype._showTimelineModal && !Card.prototype[installed]) {
  Card.prototype[installed] = true;
  const showTimeline = Card.prototype._showTimelineModal;
  const removeTimeline = Card.prototype._removeTimelineModal;
  const updated = Card.prototype.updated;
  const cleanup = Card.prototype._cleanup;
  const autoOpened = new WeakSet();
  let activeCard;

  function reportError(error) {
    console.warn("Unable to open camera timeline", error?.message);
    document.querySelector("home-assistant")?.dispatchEvent(new CustomEvent("hass-notification", {
      detail: { message: "Unable to open camera history. Please try again." },
      bubbles: true, composed: true,
    }));
  }

  async function openCamera(card, requestedCamera) {
    const cameras = card._getAvailableCameras();
    const camera = typeof requestedCamera === "string" ? requestedCamera
      : card._events?.find(event => cameras.includes(event.camera))?.camera || cameras[0];
    if (!camera || !cameras.includes(camera)) return;
    if (!card.isConnected) return;
    card._removeTimelineModal();
    await card._showTimelineModal(camera);
  }

  function findCard(root) {
    const card = root.querySelector("frigate-events-card");
    if (card) return card;
    for (const element of root.querySelectorAll("*")) {
      if (element.shadowRoot) {
        const found = findCard(element.shadowRoot);
        if (found) return found;
      }
    }
  }

  // Home Assistant's fire-dom-event action supplies the configured payload.
  document.addEventListener("ll-custom", (event) => {
    const camera = event.detail?.frigate_timeline;
    if (camera !== true && typeof camera !== "string") return;
    const card = findCard(document);
    if (card?.hass) {
      event.stopPropagation();
      openCamera(card, camera).catch(reportError);
    }
  });

  Card.prototype._showTimelineModal = function (...args) {
    if (this._config?.show_timeline === false) return;
    if (activeCard && activeCard !== this) activeCard._removeTimelineModal();
    activeCard = this;
    return showTimeline.apply(this, args);
  };
  Card.prototype._removeTimelineModal = function (...args) {
    if (activeCard === this) activeCard = undefined;
    return removeTimeline.apply(this, args);
  };
  Card.prototype.updated = function (...args) {
    updated.apply(this, args);
    if (this._config?.auto_open_timeline && this.hass && this.isConnected && !autoOpened.has(this)) {
      autoOpened.add(this);
      openCamera(this, this._config.timeline_camera).catch(reportError);
    }
  };
  Card.prototype._cleanup = function (...args) {
    autoOpened.delete(this);
    this._removeTimelineModal();
    return cleanup.apply(this, args);
  };

  // Nine cameras should remain discoverable on both desktop and phones.
  const style = document.createElement("style");
  style.textContent = `
    .frigate-timeline-modal .timeline-camera-tabs { flex-wrap: wrap; overflow-x: visible; }
    .frigate-timeline-modal .timeline-transport-controls { flex-wrap: wrap; min-width: 0; }
  `;
  document.head.appendChild(style);
}
