// Keep one wall-clock selection across cameras, including recording gaps.
import "/local/frigate-events-auth.js?v=2";

const Card = customElements.get("frigate-events-card");
const installed = Symbol.for("frigate-events-card.shared-time");
const RECORDING_DELAY = 30;

if (Card?.prototype._showTimelineModal && !Card.prototype[installed]) {
  Card.prototype[installed] = true;
  const show = Card.prototype._showTimelineModal;
  const render = Card.prototype._renderTimelineContent;
  const load = Card.prototype._loadTimelineVideo;
  const updatePlayhead = Card.prototype._updateTimelinePlayheadUI;
  const offsetToClock = Card.prototype._videoOffsetToWallClock;
  const advance = Card.prototype._advanceToNextTimelineWindow;
  const states = new WeakMap();
  const containers = new WeakSet();

  function selectedTime(card, state) {
    const video = card._timelineVideoEl;
    if (!state.loading && !state.gap && video?.readyState >= 2) {
      return card._videoOffsetToWallClock(video.currentTime);
    }
    return state.target;
  }

  function showMode(card, state) {
    card._timelineContainer?.querySelector('[data-jump="now"]')
      ?.setAttribute("aria-pressed", String(state.now));
  }

  async function changeCamera(card, camera) {
    const state = states.get(card);
    if (!state || camera === card._timelineCamera) return;
    state.target = state.now ? Date.now() / 1000 - RECORDING_DELAY : selectedTime(card, state);
    state.pauseAfterLoad = state.loading ? state.pauseAfterLoad : !!card._timelineVideoEl?.paused;
    state.loading = true;
    const request = ++state.request;
    const container = card._timelineContainer;
    // Do not interpret an outgoing video's offset using the incoming camera's
    // recording map, or expose its first frame before the requested seek.
    card._timelineVideoEl?.pause();
    card._clearTimelineSpeedInterval();
    if (card._timelineVideoEl) card._timelineVideoEl.hidden = true;
    const loading = container.querySelector(".timeline-player-loading");
    loading.style.display = "flex";
    loading.textContent = "Loading camera at the selected time...";
    card._isAdvancingTimeline = false;
    card._timelineCamera = camera;
    container.querySelectorAll(".timeline-camera-tab").forEach(tab => {
      tab.classList.toggle("active", tab.dataset.camera === camera);
    });
    container.querySelector(".timeline-camera-badge").textContent = card._formatCameraName(camera);
    if (state.now) {
      card._timelineEndTs = Math.floor(Date.now() / 1000);
      card._timelineStartTs = card._timelineEndTs - card._timelineWindowDurationSec;
    }
    card._updateTimelineWindowUI();
    await card._fetchTimelineEvents();
    if (request !== state.request || card._timelineContainer !== container) return;
    card._updateTimelineScrubberEvents();
    await card._loadTimelineVideo(state.target);
  }

  Card.prototype._showTimelineModal = function (camera, timestamp, event) {
    const now = !Number.isFinite(timestamp);
    const state = { now, target: now ? Date.now() / 1000 - RECORDING_DELAY : timestamp,
      loading: true, gap: false, request: 0, loadRequest: 0 };
    states.set(this, state);
    const result = show.call(this, camera, state.target, event);
    showMode(this, state);
    return result;
  };

  Card.prototype._advanceToNextTimelineWindow = async function () {
    const state = states.get(this);
    if (!state || !this.hass) return advance.call(this);
    if (state.advancePending || this._isAdvancingTimeline || !this._timelineContainer) return;
    const container = this._timelineContainer;
    const camera = this._timelineCamera;
    const end = this._timelineEndTs;
    const request = state.request;
    state.advancePending = true;
    try {
      const now = Math.floor(Date.now() / 1000);
      let hasLaterFootage = false;
      if (end < now - RECORDING_DELAY) {
        const response = await this.hass.callWS({ type: "frigate/recordings/get",
          instance_id: this._config.frigate_client_id || "frigate", camera,
          after: Math.floor(end), before: now });
        const recordings = typeof response === "string" ? JSON.parse(response) : response;
        hasLaterFootage = recordings.some(recording => recording.end_time > end);
      }
      if (states.get(this) !== state || state.request !== request || this._timelineContainer !== container
          || this._timelineCamera !== camera || this._timelineEndTs !== end) return;
      // Keep the last frame when saved footage ends. The vendor otherwise
      // requests an empty window as real time advances during playback.
      if (hasLaterFootage) return advance.call(this);
      this._timelineVideoEl?.pause();
      this._clearTimelineSpeedInterval();
      this._updateTimelinePlayheadUI();
    } catch (error) {
      console.warn("Unable to check for later footage", error?.message);
    } finally {
      state.advancePending = false;
    }
  };

  Card.prototype._renderTimelineContent = function (container) {
    render.call(this, container);
    if (containers.has(container)) return;
    containers.add(container);
    container.addEventListener("playing", event => {
      const state = states.get(this);
      const video = event.target;
      const hls = this._timelineActiveVideo === "a" ? this._timelineHlsA : this._timelineHlsB;
      const source = hls?.url || video.currentSrc || video.src || "";
      if (state && video === this._timelineVideoEl && !video.paused
          && source.includes(`/${encodeURIComponent(this._timelineCamera)}/`)) {
        state.loading = false;
        video.hidden = false;
        const loading = container.querySelector(".timeline-player-loading");
        if (loading) loading.style.display = "none";
        if (state.pauseAfterLoad) {
          state.pauseAfterLoad = false;
          this._timelineVideoEl?.pause();
        }
      }
    }, true);
    container.addEventListener("click", event => {
      const state = states.get(this);
      if (!state) return;
      const tab = event.target.closest(".timeline-camera-tab");
      if (tab) {
        event.stopImmediatePropagation();
        changeCamera(this, tab.dataset.camera).catch(error => console.warn("Camera time selection failed", error?.message));
        return;
      }
      const jump = event.target.closest("[data-jump]");
      if (jump?.dataset.jump === "now") {
        event.stopImmediatePropagation();
        state.now = true;
        state.target = Date.now() / 1000 - RECORDING_DELAY;
        state.loading = true;
        this._isAdvancingTimeline = false;
        this._timelineEndTs = Math.floor(Date.now() / 1000);
        this._timelineStartTs = this._timelineEndTs - this._timelineWindowDurationSec;
        this._updateTimelineWindowUI();
        showMode(this, state);
        const request = ++state.request;
        this._fetchTimelineEvents().then(() => {
          if (request !== state.request || this._timelineContainer !== container) return;
          this._updateTimelineScrubberEvents();
          return this._loadTimelineVideo(state.target);
        }).catch(error => console.warn("Timeline Now selection failed", error?.message));
        return;
      }
      const skip = event.target.closest("[data-skip]");
      const marker = event.target.closest(".timeline-event-marker");
      if (state.gap && (skip || marker)) {
        event.stopImmediatePropagation();
        state.now = false;
        const target = marker ? Number(marker.dataset.eventStart) : state.target + Number(skip.dataset.skip);
        this._loadTimelineVideo(Math.max(this._timelineStartTs, Math.min(this._timelineEndTs, target)));
        return;
      }
      if (jump || event.target.closest("[data-skip],.timeline-event-marker")) {
        state.now = false;
        showMode(this, state);
      }
      if (event.target.closest('[data-action="toggle-play"],.timeline-player-container')
          && !this._timelineVideoEl?.paused) {
        state.target = selectedTime(this, state);
        state.now = false;
        showMode(this, state);
      }
    }, true);
    container.addEventListener("pointerdown", event => {
      if (event.target.closest(".timeline-track-container")) {
        const state = states.get(this);
        state.now = false;
        showMode(this, state);
      }
    }, true);
    container.addEventListener("pointerup", event => {
      const state = states.get(this);
      const track = event.target.closest(".timeline-track-container");
      if (!state?.gap || !track || event.target.closest(".timeline-event-marker")) return;
      const bounds = track.getBoundingClientRect();
      const fraction = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
      this._loadTimelineVideo(this._timelineStartTs + fraction * (this._timelineEndTs - this._timelineStartTs));
    }, true);
    container.addEventListener("change", event => {
      if (event.target.matches(".timeline-datetime-input")) {
        const state = states.get(this);
        state.now = false;
        showMode(this, state);
      }
    }, true);
  };

  Card.prototype._loadTimelineVideo = async function (target, autoAdvance = false) {
    const state = states.get(this);
    const request = state ? ++state.loadRequest : 0;
    if (state && Number.isFinite(target) && !autoAdvance) {
      state.target = target;
      state.loading = true;
      state.gap = !(this._timelineRecordings || []).some(recording =>
        target >= recording.start_time - 0.05 && target <= recording.end_time + 0.05);
    }
    if (!autoAdvance) for (const video of [this._timelineVideoA, this._timelineVideoB]) {
      if (video) { video.pause(); video.hidden = true; }
    }
    if (!autoAdvance) this._clearTimelineSpeedInterval();
    await load.call(this, target, autoAdvance);
    if (!state || states.get(this) !== state || request !== state.loadRequest || !this._timelineContainer) return;
    if (state.gap && !autoAdvance) {
      for (const field of ["_timelineHlsA", "_timelineHlsB"]) {
        this[field]?.destroy();
        this[field] = null;
      }
      for (const video of [this._timelineVideoA, this._timelineVideoB]) {
        if (!video) continue;
        video.pause();
        video.hidden = true;
        video.removeAttribute("src");
        video.load();
      }
      for (const field of ["_timelineLoadingTimeout", "_timelineAdvanceTimeout", "_timelineSlotTransitionTimeout"]) {
        clearTimeout(this[field]);
        this[field] = undefined;
      }
      this._isAdvancingTimeline = false;
      const loading = this._timelineContainer.querySelector(".timeline-player-loading");
      loading.style.display = "flex";
      loading.textContent = `No saved footage at ${new Date(state.target * 1000).toLocaleTimeString()}. Choose another camera or time.`;
      this._updateTimelinePlayheadUI();
    }
    showMode(this, state);
  };

  Card.prototype._updateTimelinePlayheadUI = function (...args) {
    const state = states.get(this);
    if ((!state?.gap && !state?.loading) || !this._timelineContainer) return updatePlayhead.apply(this, args);
    if (state.loading && !state.gap) {
      const loading = this._timelineContainer.querySelector(".timeline-player-loading");
      if (loading) loading.style.display = "flex";
    }
    const span = this._timelineEndTs - this._timelineStartTs;
    const head = this._timelineContainer.querySelector(".timeline-playhead");
    if (head && span > 0) head.style.left = `${Math.max(0, Math.min(100, (state.target - this._timelineStartTs) / span * 100))}%`;
    const badge = this._timelineContainer.querySelector("[data-timeline-current-time]");
    if (badge) badge.textContent = new Date(state.target * 1000).toLocaleTimeString();
  };

  Card.prototype._videoOffsetToWallClock = function (offset) {
    const state = states.get(this);
    return state?.gap || state?.loading ? state.target : offsetToClock.call(this, offset);
  };

  const style = document.createElement("style");
  style.textContent = '.frigate-timeline-modal [data-jump="now"][aria-pressed="true"] { background: #1e3a5f; border-color: #3b82f6; color: #bfdbfe; } .frigate-timeline-modal video[hidden] { display: none; }';
  document.head.appendChild(style);
}
