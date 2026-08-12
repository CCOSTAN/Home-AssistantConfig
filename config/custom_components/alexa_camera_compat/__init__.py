"""Add temporary-URI metadata to Alexa camera stream responses."""

import asyncio
from dataclasses import dataclass, field
from datetime import UTC, datetime, timedelta
import logging
import secrets
from typing import Any

from aiohttp import ClientError, web
from yarl import URL

from homeassistant.components import camera
from homeassistant.components.alexa.capabilities import AlexaCameraStreamController
from homeassistant.components.alexa.handlers import HANDLERS
from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.typing import ConfigType

_LOGGER = logging.getLogger(__name__)

_DOMAIN = "alexa_camera_compat"
_CAMERA_HANDLER = ("Alexa.CameraStreamController", "InitializeCameraStreams")
_STREAM_LIFETIME = timedelta(minutes=5)
_IDLE_TIMEOUT_SECONDS = 30
_MASTER_PLAYLIST_SUFFIX = "/master_playlist.m3u8"
_MEDIA_PLAYLIST_SUFFIX = "/playlist.m3u8"
_GO2RTC_PORT = 1984
_PROXY_PATH = f"/api/{_DOMAIN}"
_ORIGINAL_CAMERA_STREAM_CONFIGURATIONS = (
    AlexaCameraStreamController.camera_stream_configurations
)


def _camera_stream_configurations(
    controller: AlexaCameraStreamController,
) -> list[dict[str, Any]] | None:
    """Advertise the video-only stream configuration served by this integration."""
    configurations = _ORIGINAL_CAMERA_STREAM_CONFIGURATIONS(controller)
    if configurations is None:
        return None
    return [
        {**configuration, "audioCodecs": ["NONE"]}
        for configuration in configurations
    ]


class _Go2rtcSessionExpired(Exception):
    """Raised when go2rtc has retired an idle HLS session."""


@dataclass(slots=True)
class _StreamSession:
    """Short-lived mapping from an Alexa request to a go2rtc HLS session."""

    expires_at: datetime
    go2rtc_base: URL
    stream_name: str
    stream_id: str | None = None
    lock: asyncio.Lock = field(default_factory=asyncio.Lock)


class _AlexaCameraHlsView(HomeAssistantView):
    """Serve token-protected MPEG-TS HLS from the Frigate go2rtc restream."""

    url = f"{_PROXY_PATH}/{{token}}/{{resource}}"
    name = f"api:{_DOMAIN}:hls"
    requires_auth = False

    def __init__(
        self, hass: HomeAssistant, sessions: dict[str, _StreamSession]
    ) -> None:
        self._client = async_get_clientsession(hass)
        self._sessions = sessions

    async def _async_fetch(
        self, session: _StreamSession, path: str, params: dict[str, str]
    ) -> tuple[bytes, str | None]:
        url = session.go2rtc_base.with_path(path)
        try:
            async with asyncio.timeout(10):
                async with self._client.get(url, params=params) as response:
                    if response.status == 404:
                        raise _Go2rtcSessionExpired
                    response.raise_for_status()
                    return await response.read(), response.headers.get("Content-Type")
        except (ClientError, TimeoutError) as err:
            _LOGGER.warning("Unable to fetch Alexa HLS resource from go2rtc: %s", err)
            raise web.HTTPBadGateway() from err

    async def _async_initialize_stream(self, session: _StreamSession) -> None:
        if session.stream_id is not None:
            return

        async with session.lock:
            if session.stream_id is not None:
                return
            body, _ = await self._async_fetch(
                session, "/api/stream.m3u8", {"src": session.stream_name}
            )
            playlist_reference = next(
                (
                    line.strip()
                    for line in body.decode().splitlines()
                    if line.strip() and not line.startswith("#")
                ),
                None,
            )
            if not playlist_reference or not (
                stream_id := URL(playlist_reference).query.get("id")
            ):
                raise web.HTTPBadGateway(reason="go2rtc did not return an HLS session")
            session.stream_id = stream_id

    async def get(
        self, request: web.Request, token: str, resource: str
    ) -> web.Response:
        """Return an Alexa-compatible HLS playlist or MPEG-TS segment."""
        session = self._sessions.get(token)
        if session is None or session.expires_at <= datetime.now(UTC):
            self._sessions.pop(token, None)
            raise web.HTTPNotFound()

        await self._async_initialize_stream(session)
        assert session.stream_id is not None

        if resource == "playlist.m3u8":
            try:
                body, _ = await self._async_fetch(
                    session,
                    "/api/hls/playlist.m3u8",
                    {"id": session.stream_id},
                )
            except _Go2rtcSessionExpired:
                session.stream_id = None
                await self._async_initialize_stream(session)
                assert session.stream_id is not None
                try:
                    body, _ = await self._async_fetch(
                        session,
                        "/api/hls/playlist.m3u8",
                        {"id": session.stream_id},
                    )
                except _Go2rtcSessionExpired as err:
                    raise web.HTTPBadGateway(
                        reason="go2rtc HLS session expired during startup"
                    ) from err
            playlist_lines: list[str] = []
            for line in body.decode().splitlines():
                if not line or line.startswith("#"):
                    playlist_lines.append(line)
                    continue
                segment_number = URL(line).query.get("n")
                if segment_number is None or not segment_number.isdigit():
                    raise web.HTTPBadGateway(reason="Unexpected go2rtc HLS segment")
                playlist_lines.append(f"segment.ts?n={segment_number}")
            return web.Response(
                text="\n".join(playlist_lines) + "\n",
                content_type="application/vnd.apple.mpegurl",
                headers={"Cache-Control": "no-store"},
            )

        if resource == "segment.ts":
            segment_number = request.query.get("n")
            if segment_number is None or not segment_number.isdigit():
                raise web.HTTPBadRequest()
            try:
                body, content_type = await self._async_fetch(
                    session,
                    "/api/hls/segment.ts",
                    {"id": session.stream_id, "n": segment_number},
                )
            except _Go2rtcSessionExpired as err:
                raise web.HTTPNotFound() from err
            return web.Response(
                body=body,
                content_type=(content_type or "video/mp2t").split(";", 1)[0],
                headers={"Cache-Control": "no-store"},
            )

        raise web.HTTPNotFound()


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Wrap the built-in Alexa camera response with temporary-URI metadata."""
    sessions: dict[str, _StreamSession] = {}
    hass.data[_DOMAIN] = sessions
    hls_view = _AlexaCameraHlsView(hass, sessions)
    hass.http.register_view(hls_view)
    original_handler = HANDLERS[_CAMERA_HANDLER]
    AlexaCameraStreamController.camera_stream_configurations = (
        _camera_stream_configurations
    )

    async def async_initialize_camera_stream(
        hass: HomeAssistant,
        alexa_config: Any,
        directive: Any,
        context: Any,
    ) -> Any:
        response = await original_handler(hass, alexa_config, directive, context)
        expiration_time = (
            datetime.now(UTC) + _STREAM_LIFETIME
        ).replace(microsecond=0).isoformat().replace("+00:00", "Z")

        for stream in response.serialize()["event"]["payload"]["cameraStreams"]:
            stream["expirationTime"] = expiration_time
            stream["idleTimeoutSeconds"] = _IDLE_TIMEOUT_SECONDS
            stream["audioCodec"] = "NONE"
            stream_uri = URL(stream["uri"])
            source = await camera.async_get_stream_source(
                hass, directive.entity.entity_id
            )
            source_uri = URL(source) if source else None
            if (
                source_uri is not None
                and source_uri.scheme in {"rtsp", "rtsps"}
                and source_uri.host
                and (stream_name := source_uri.path.rsplit("/", 1)[-1])
            ):
                token = secrets.token_urlsafe(24)
                proxy_session = _StreamSession(
                    expires_at=datetime.now(UTC) + _STREAM_LIFETIME,
                    go2rtc_base=URL.build(
                        scheme="http", host=source_uri.host, port=_GO2RTC_PORT
                    ),
                    stream_name=stream_name,
                )
                sessions[token] = proxy_session
                try:
                    await hls_view._async_initialize_stream(proxy_session)
                except (web.HTTPException, _Go2rtcSessionExpired):
                    sessions.pop(token, None)
                else:
                    stream["uri"] = str(
                        stream_uri.with_path(
                            f"{_PROXY_PATH}/{token}/playlist.m3u8"
                        ).with_query(None)
                    )
            elif stream["uri"].endswith(_MASTER_PLAYLIST_SUFFIX):
                stream["uri"] = (
                    stream["uri"][: -len(_MASTER_PLAYLIST_SUFFIX)]
                    + _MEDIA_PLAYLIST_SUFFIX
                )

        now = datetime.now(UTC)
        for token, session in list(sessions.items()):
            if session.expires_at <= now:
                sessions.pop(token, None)

        return response

    HANDLERS[_CAMERA_HANDLER] = async_initialize_camera_stream
    _LOGGER.info("Enabled Alexa video-only MPEG-TS HLS compatibility responses")
    return True
