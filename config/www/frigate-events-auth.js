// Frigate Events Card v2.5.23 signs thumbnails but leaves timeline media unsigned.
// Keep the HACS bundle intact and adapt only this card's timeline media loaders.
// Version the underlying bundle as well as the adapters: an old HACS cache key
// can otherwise load a card release that does not have the timeline API.
import "/hacsfiles/frigate-events-card/frigate-events-card.js?v=2.5.23";

const Card = customElements.get("frigate-events-card");
const originalLoad = Card?.prototype._loadTimelineVideo;
const patched = Symbol.for("frigate-events-card.signed-timeline");
const cardStates = new WeakMap();
const mediaSrc = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, "src");

function stateFor(card) {
  let state = cardStates.get(card);
  if (state) return state;
  state = { request: 0, urls: new Map(), videos: new WeakSet() };
  cardStates.set(card, state);

  // The card assigns Hls.js before calling loadSource. Translate that one URL;
  // Frigate propagates the manifest's authSig to its init and media segments.
  for (const field of ["_timelineHlsA", "_timelineHlsB"]) {
    let value = card[field];
    Object.defineProperty(card, field, {
      configurable: true,
      get: () => value,
      set(next) {
        value = next;
        if (!next) return;
        const loadSource = next.loadSource;
        next.loadSource = function (url) {
          return loadSource.call(this, state.urls.get(url) || url);
        };
      },
    });
  }
  return state;
}

function adaptVideo(video, state) {
  if (!video || state.videos.has(video)) return;
  state.videos.add(video);
  // Native HLS and the MP4 fallback use video.src and cannot send a bearer
  // header. Change only the two signed timeline paths, leaving blob URLs alone.
  Object.defineProperty(video, "src", {
    configurable: true,
    get() { return mediaSrc.get.call(this); },
    set(url) { mediaSrc.set.call(this, state.urls.get(url) || url); },
  });
}

if (originalLoad && mediaSrc?.get && mediaSrc?.set && !Card.prototype[patched]) {
  Card.prototype[patched] = true;
  Card.prototype._loadTimelineVideo = async function (...args) {
    if (!this._timelineContainer || !this._timelineCamera) return;
    // A configured direct Frigate origin has its own authentication policy.
    if (this._config?.frigate_url) return originalLoad.apply(this, args);

    const state = stateFor(this);
    const request = ++state.request;
    const container = this._timelineContainer;
    const camera = this._timelineCamera;
    const start = Math.floor(this._timelineStartTs);
    const end = Math.floor(this._timelineEndTs);
    const client = encodeURIComponent(this._config?.frigate_client_id || "frigate");
    const windowPath = `${encodeURIComponent(camera)}/start/${start}/end/${end}`;
    const urls = [
      `/api/frigate/${client}/vod/${windowPath}/index.m3u8`,
      `/api/frigate/${client}/recording/${windowPath}`,
    ];

    try {
      const signed = await Promise.all(urls.map(async (path) => {
        const result = await this.hass.callWS({
          type: "auth/sign_path", path, expires: 86400,
        });
        if (!result?.path) throw new Error("Home Assistant returned no signed path");
        return [path, result.path];
      }));
      // Camera/window changes or closing the modal invalidate pending signing.
      if (state.request !== request || this._timelineContainer !== container
          || this._timelineCamera !== camera
          || Math.floor(this._timelineStartTs) !== start
          || Math.floor(this._timelineEndTs) !== end) return;

      state.urls = new Map(signed);
      adaptVideo(this._timelineVideoA, state);
      adaptVideo(this._timelineVideoB, state);
      return originalLoad.apply(this, args);
    } catch (error) {
      if (state.request !== request || this._timelineContainer !== container) return;
      console.warn("Frigate timeline media authorization failed", error?.message);
      this._isAdvancingTimeline = false;
      const loading = container.querySelector(".timeline-player-loading");
      if (loading) {
        loading.style.display = "flex";
        loading.textContent = "Unable to authorize footage. Close the timeline and try again.";
      }
    }
  };
} else if (!originalLoad) {
  console.warn("Frigate timeline authentication adapter: card API changed; review compatibility.");
}
