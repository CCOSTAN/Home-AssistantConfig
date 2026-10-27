// A paged, labeled review surface around the installed Frigate Events Card.
import "/local/frigate-events-auth.js?v=2";

const Card = customElements.get("frigate-events-card");
const installed = Symbol.for("frigate-events-card.clip-review");

if (Card && !Card.prototype[installed]) {
  Card.prototype[installed] = true;
  const loadEvents = Card.prototype._loadEvents;
  const updated = Card.prototype.updated;
  const states = new WeakMap();

  function stateFor(card) {
    if (!states.has(card)) states.set(card, { page: 0, cursors: [null], camera: "", request: 0 });
    return states.get(card);
  }

  Card.prototype._loadEvents = async function () {
    if (!this._config?.review_clips) return loadEvents.call(this);
    if (!this.hass) return;
    const state = stateFor(this);
    const cursor = state.cursors[state.page];
    const key = JSON.stringify([state.page, state.camera, cursor]);
    if (state.loading && state.key === key) return;
    const request = ++state.request;
    state.busy = state.key !== key || !this._events?.length;
    state.key = key;
    state.loading = true;
    state.error = false;
    this._loading = true;
    this.requestUpdate();
    try {
      const size = this._config.event_count || 60;
      const query = { type: "frigate/events/get", instance_id: this._config.frigate_client_id || "frigate",
        cameras: state.camera ? [state.camera] : this._config.cameras,
        has_clip: true, limit: size + 1 + (cursor?.exclude.length || 0) };
      if (cursor) query.before = cursor.before;
      const response = await this.hass.callWS(query);
      if (request !== state.request || !this.isConnected) return;
      const excluded = new Set(cursor?.exclude || []);
      const rows = (typeof response === "string" ? JSON.parse(response) : response)
        .filter(event => !excluded.has(event.id)).sort((a, b) => b.start_time - a.start_time);
      this._events = rows.slice(0, size);
      state.more = rows.length > size;
      if (state.more) {
        const boundary = Math.floor(this._events.at(-1).start_time);
        const exclude = new Set(cursor?.before === boundary + 1 ? cursor.exclude : []);
        this._events.filter(event => event.start_time >= boundary).forEach(event => exclude.add(event.id));
        // The HA WebSocket API accepts integer boundaries. Overlap the last
        // second and exclude seen IDs so fractional-second clips are retained.
        state.cursors[state.page + 1] = { before: boundary + 1, exclude: [...exclude] };
      }
      this._error = undefined;
    } catch (error) {
      if (request !== state.request) return;
      state.error = true;
      console.warn("Recorded clip review failed", error?.message);
    } finally {
      if (request === state.request) {
        state.loading = false;
        state.busy = false;
        this._loading = false;
        this.requestUpdate();
      }
    }
  };

  function decorate(card) {
    const root = card.shadowRoot;
    const surface = root?.querySelector("ha-card");
    if (!surface) return;
    const state = stateFor(card);
    let toolbar = root.querySelector(".clip-review-toolbar");
    if (!toolbar) {
      toolbar = document.createElement("div");
      toolbar.className = "clip-review-toolbar";
      toolbar.innerHTML = '<div class="review-heading"><strong>Recorded clips</strong><span class="review-status" aria-live="polite"></span></div><div class="review-actions"><select aria-label="Filter clips by camera"><option value="">All cameras</option></select><button data-review="latest">Latest</button><button data-review="newer">Newer</button><button data-review="older">Older</button><button data-review="now" title="Open recent saved footage for the selected camera">Recent footage</button></div>';
      const select = toolbar.querySelector("select");
      for (const camera of card._config.cameras || []) {
        const option = document.createElement("option");
        option.value = camera;
        option.textContent = card._formatCameraName(camera);
        select.appendChild(option);
      }
      select.addEventListener("change", () => {
        state.camera = select.value;
        state.page = 0;
        state.cursors = [null];
        card._loadEvents();
      });
      toolbar.addEventListener("click", async event => {
        const action = event.target.closest("[data-review]")?.dataset.review;
        if (!action) return;
        if (action === "now") {
          const button = toolbar.querySelector('[data-review="now"]');
          const camera = state.camera || card._events?.[0]?.camera || card._config.cameras[0];
          button.disabled = true;
          button.textContent = "Opening...";
          try {
            const now = Date.now() / 1000;
            const response = await card.hass.callWS({ type: "frigate/recordings/get",
              instance_id: card._config.frigate_client_id || "frigate", camera,
              after: Math.floor(now - 86400), before: Math.floor(now) });
            if (!card.isConnected) return;
            const recordings = (typeof response === "string" ? JSON.parse(response) : response)
              .filter(recording => recording.end_time > recording.start_time)
              .sort((a, b) => b.end_time - a.end_time);
            const nearNow = recordings.some(recording => now - 30 >= recording.start_time && now - 30 <= recording.end_time);
            const latest = recordings[0];
            // Motion-based retention can leave Now empty. Choose saved footage
            // explicitly here; historical camera switches still keep its time.
            const target = !nearNow && latest ? Math.max(latest.start_time, latest.end_time - 10) : undefined;
            await card._showTimelineModal(camera, target);
            if (Number.isFinite(target)) card.dispatchEvent(new CustomEvent("hass-notification", {
              detail: { message: `No recording near now. Opened latest saved footage from ${new Date(target * 1000).toLocaleString()}.` },
              bubbles: true, composed: true,
            }));
          } catch (error) {
            console.warn("Recent recording playback failed", error?.message);
            card.dispatchEvent(new CustomEvent("hass-notification", {
              detail: { message: "Unable to open recent footage. Please try again." }, bubbles: true, composed: true,
            }));
          } finally {
            button.disabled = false;
            button.textContent = "Recent footage";
          }
          return;
        }
        if (action === "older" && state.more) state.page++;
        else if (action === "newer") state.page = Math.max(0, state.page - 1);
        else if (action === "latest") { state.page = 0; state.cursors = [null]; }
        card._loadEvents();
        root.querySelector(".events")?.scrollTo({ top: 0 });
      });
      surface.prepend(toolbar);
      const style = document.createElement("style");
      style.textContent = `
        .clip-review-toolbar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 0; }
        .clip-review-toolbar[hidden] { display: none; }
        .review-heading { display: flex; flex-direction: column; gap: 4px; }
        .review-status { font-size: 12px; color: var(--secondary-text-color); }
        .review-actions { display: flex; gap: 6px; flex-wrap: wrap; }
        .review-actions button, .review-actions select { min-height: 36px; padding: 6px 10px; border: 1px solid var(--divider-color, #aaa); border-radius: 8px; background: var(--card-background-color); color: var(--primary-text-color); font: inherit; font-size: 13px; cursor: pointer; }
        .review-actions button:disabled { opacity: .4; cursor: default; }
        .events.grid { grid-template-columns: repeat(auto-fill, minmax(min(100%, 220px), 1fr)) !important; max-height: var(--review-height, 75vh); overflow-y: auto; padding: 3px; }
        .events .event { aspect-ratio: auto; }
        .events .event img { height: 150px; }
        .events .event video { height: 150px !important; }
        .review-caption { display: flex; flex-direction: column; gap: 4px; padding: 9px; color: var(--primary-text-color); font-size: 13px; line-height: 1.35; }
        .review-caption span { color: var(--secondary-text-color); font-size: 12px; }
        .placeholder { display: none; }
        [data-review-compact] .events.grid { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
        [data-review-compact] .events .event img, [data-review-compact] .events .event video { height: 100px !important; }
        @media (max-width: 600px) {
          [data-review-compact] .events.grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
      `;
      root.appendChild(style);
    }
    surface.style.setProperty("--review-height", card._config.grid_max_height || "75vh");
    surface.toggleAttribute("data-review-compact", !!card._config.review_compact);
    toolbar.hidden = !!card._config.review_compact;
    const size = card._config.event_count || 60;
    const count = card._events?.length || 0;
    toolbar.querySelector(".review-status").textContent = state.busy ? "Loading recorded clips..."
      : state.error ? "Could not load clips. Use Latest to retry."
      : count ? `Page ${state.page + 1} · ${count} recorded clips · newest first` : "No recorded clips for this camera.";
    toolbar.querySelector('[data-review="newer"]').disabled = state.busy || state.page === 0;
    toolbar.querySelector('[data-review="older"]').disabled = state.busy || !state.more;
    toolbar.querySelector('[data-review="latest"]').disabled = state.busy;
    root.querySelectorAll(".events .event").forEach((tile, index) => {
      const event = card._events[index];
      if (!event || index >= size) return;
      for (const node of [...tile.childNodes]) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.includes("}}")) node.remove();
      }
      let caption = tile.querySelector(".review-caption");
      if (card._config.review_compact) {
        caption?.remove();
        caption = null;
      } else if (!caption) {
        caption = document.createElement("div");
        caption.className = "review-caption";
        caption.append(document.createElement("strong"), document.createElement("span"));
        tile.appendChild(caption);
      }
      if (!tile.hasAttribute("role")) {
        tile.tabIndex = 0;
        tile.setAttribute("role", "button");
        tile.addEventListener("keydown", keyboard => {
          if (keyboard.key === "Enter" || keyboard.key === " ") { keyboard.preventDefault(); tile.click(); }
        });
      }
      const label = `${card._formatCameraName(event.camera)} · ${event.label}`;
      const time = new Date(event.start_time * 1000).toLocaleString();
      if (caption) {
        caption.querySelector("strong").textContent = label;
        caption.querySelector("span").textContent = time;
      }
      tile.setAttribute("aria-label", `${label}, ${time}`);
    });
  }

  Card.prototype.updated = function (...args) {
    updated.apply(this, args);
    if (this._config?.review_clips) decorate(this);
  };
}
