# Alexa Camera Stream Compatibility

Temporary compatibility layer for Home Assistant cameras exposed through the
Alexa CameraStreamController interface.

The integration keeps Home Assistant's normal camera response and image URL,
adds expiration and idle-timeout metadata, and replaces the Low-Latency HLS
camera URI with a short-lived MPEG-TS HLS proxy backed by the camera's go2rtc
restream. The proxy derives its host and stream name from the camera's RTSP
source, exposes only fixed playlist and segment routes, and protects each
session with a random token that expires after five minutes. It advertises
`audioCodec: NONE` in Alexa discovery and stream responses so video-only camera
feeds do not need a fabricated silent AAC producer.

Remove this integration when Home Assistant and Echo Show devices can play the
standard camera stream reliably without the compatibility route.

References:

- [Alexa CameraStreamController interface](https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-camerastreamcontroller.html)
- [Home Assistant Alexa camera stream issue](https://github.com/home-assistant/core/issues/172245)
