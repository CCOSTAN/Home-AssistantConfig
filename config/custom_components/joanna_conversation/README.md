# Joanna Conversation

Connect an explicitly enrolled Assist satellite to an existing Joanna service.
The service owns the user binding, shared agent, memory, capability policy and
persistent conversation. Home Assistant owns speech recognition, TTS and the
satellite overlay. This integration does not run a second model.

Add **Joanna Conversation** through Devices & services using the server URL,
the enrolled satellite's HA device ID and its dedicated credential. The config
flow validates the exact device binding before creating the conversation agent.
Use that agent in a separate Assist pipeline, then select the pipeline on the
enrolled satellite. Keep credentials in the config entry, never in YAML/source.

For a fleet that syncs the selected assistant, use the integration's **Configure**
option to enroll each additional satellite with its own device ID and credential.
They can share one pipeline while each keeps its server-bound profile and
conversation. Fleet synchronization alone never grants another device access.

The server fixes identity from enrollment. Another satellite, a request without
device context, or a spoken request to become another user cannot inherit that
identity. A household device enrolled to a personal account uses that account
for everyone who speaks to the enrolled device.

Successful answers use native follow-up listening. Context also survives a new
wake-word turn through the server's dedicated device conversation. The agent's
final text is returned unchanged for speech and display. Each submission has a
unique request ID; an uncertain connection is reconciled by reading that ID,
never by submitting the action again. A 180-second deadline or canceled pipeline
requests server cancellation and does not claim already-started actions were undone.

Revert by selecting the previous pipeline on the satellite. The other Assist
pipelines and satellites need no changes. Revoke the device's enrollment at the
server to disable its credential.

Validation: `tools/test_joanna_conversation.py` tests the HTTP boundary with local
fixtures. Run the repository config check before restarting Home Assistant.
Verify native playback separately; receiving response text does not prove audio.

The kiosk package can acknowledge a heard request when the native voice sensor
enters `processing` on the Joanna Voice pipeline. Its audio-only announcement
plays the cached `www/joanna-voice/acknowledgement.mp3`, using the private
`joanna_voice_ack_url` secret for the local HTTP URL. This is a fixed receipt cue,
not an agent answer or a claim that an action completed. It adds no model call
and does not change the satellite master volume or the final Assist response.
