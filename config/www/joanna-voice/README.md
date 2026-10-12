# Voice request acknowledgment

`acknowledgement.mp3` says **Let me check on that.** It is a 2.16-second
Home Assistant Cloud TTS clip using en-US JennyNeural, generated once for local
playback. The kiosk package plays it without a chime or modal when an enrolled
Joanna Voice satellite starts processing a heard request. Final speech remains
in the Assist pipeline.

Set the private `joanna_voice_ack_url` secret to this Home Assistant server's
local HTTP URL ending in `/local/joanna-voice/acknowledgement.mp3`.
