# Local Frigate package state classification

Tracking: [issue #1984](https://github.com/CCOSTAN/Home-AssistantConfig/issues/1984).

The front-door package flow now uses Frigate 0.18 custom state classification. Two camera crops look at the white porch floor where deliveries are placed. Inference runs locally; this flow makes no LLM Vision or OpenAI calls. The existing Home Assistant package helpers, dashboard references, snapshot notifications, and shared notification engine remain in use.

The source is [frigate_classification.yaml](../config/packages/frigate_classification.yaml). The package/cans binary sensors keep their internal registry identities so existing consumers remain compatible. The package status and diagnostic helpers use neutral names; obsolete LLM Vision helpers and the disabled garage automation are removed.

## Frigate setup

Train two separate state classifiers through Frigate's Classification UI. Use the same two labels, `clear` and `package_present`, for each model. These are camera-specific models, not a generic pretrained package detector. Adjust the crops to match your own camera and delivery area.

```yaml
classification:
  custom:
    front_door_packages:
      threshold: 0.9
      save_attempts: 200
      state_config:
        motion: true
        interval: 15
        cameras:
          frontdoorbell:
            crop: [0.10, 0.74, 1.0, 1.0]
    front_door_package_edge:
      threshold: 0.9
      save_attempts: 200
      state_config:
        motion: true
        interval: 15
        cameras:
          frontdoorbell:
            crop: [0.70, 0.74, 1.0, 1.0]
```

The broad crop covers the white floor. The narrower crop gives partially visible boxes near the bottom-right edge more image detail. The timestamp is outside both crops.

Label real deliveries, cardboard boxes, shipping bags, partial packages, empty floor, shadows, people walking through, and people carrying packages without placing them down. Include day and night images and train after categorizing examples. Keep household images and generated models private. This implementation seeded each model with 46 examples: 15 package-present and 31 clear.

Frigate checks on motion and every 15 seconds. Its state classifier requires three matching confident observations before publishing a state change, with follow-up verification checks while a change is pending. Low-confidence predictions do not publish a new state; they preserve the previous verified state. The 0.9 threshold is an acceptance setting, not a measured accuracy percentage.

See the [official state-classification guide](https://docs.frigate.video/configuration/custom_classification/state_classification/).

## Home Assistant behavior

The Frigate integration supplies these entities:

- `sensor.frontdoorbell_front_door_packages_classification`
- `sensor.frontdoorbell_front_door_package_edge_classification`

Both must have valid labels before the adapter changes the existing helper. Either crop reporting `package_present` turns `input_boolean.front_door_packages_present` on. Both reporting `clear` turn it off. An unknown or unavailable source leaves the helper unchanged and makes `binary_sensor.front_door_packages_present` unavailable.

The existing one-minute positive-state hold, family/Carlo routing, package icon, camera attachment, and Activity Feed logging are preserved. Continuous local classification replaces the former person/lock-triggered cloud capture, three-minute wait, and API rate limit.

`input_button.front_door_package_check` reports the last verified classifier state; it does not force a new camera inference. `input_datetime.front_door_package_last_sync` records the latest successful state synchronization, not every inference. `input_text.front_door_package_classification` records the synchronized label. Obsolete key-frame helpers are removed; notifications still use the camera image.

Create/reload the Frigate integration after adding classifiers. If a new classification sensor stays `Unknown`, ensure it receives a fresh classifier result before enabling the adapter. Frigate publishes classification changes without MQTT retention; the integration restores previously known states, but a newly discovered sensor can miss the initial result. Disabling and re-enabling that classifier through the supported config API after discovery lets it establish a fresh verified state. Do not publish invented classifier labels to initialize production.

LLM Vision's provider/settings entries and HACS component are removed, along with its old helpers, update entity, provider reference, and timeline artifacts, including the orphaned old cans-in registry entry. A private backup was retained before cleanup. The garage remains non-production with no classifier or active automation: its reflective X marker is gone. A future garage classifier must train on the actual cans in the upper-right image area and confirm how present/absent maps to cans-out semantics.

## Timestamp and motion mask

The camera bridge exposes a timestamp on/off control, with no position control. The original camera timestamp is disabled, and the Frigate/go2rtc source applies a top-left overlay. The Wyze app therefore has no burned-in timestamp; Frigate and its Home Assistant streams include the replacement.

For a go2rtc FFmpeg video source, append a drawtext filter using a font available in the container. This example uses a placeholder source stream:

```text
ffmpeg:doorbell_raw#video=h264#drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:fontsize=38:fontcolor=white:borderw=2:bordercolor=black:x=20:y=20:text=%{localtime}
```

This encodes the source video, so verify CPU use, live playback, recording, and any audio requirements for your camera. Keep existing compatible presentation streams downstream of the annotated source. Confirm the container's local time matches the desired timezone.

The existing timestamp motion mask moves to the top-left area (`0,0,0.345,0,0.345,0.045,0,0.045` for this portrait image). Keep other masks unchanged and adapt this polygon to your own timestamp width and camera resolution. Removing the old lower-right overlay and mask exposes the doorstep edge.

## Validation and remaining checks

The Frigate configuration and Home Assistant configuration passed validation. After the cutover restart, both classifier states restored as clear and the startup automation completed successfully. No LLM Vision config entries, services, or installed HACS component remain. Both live classification sensors report `clear` on the empty porch; a completed automation trace confirms helper synchronization. The existing mobile dashboard displays Packages: CLEAR. Notification automation remains enabled and no garage classifier or automation is enabled.

An isolated replay through Frigate's native classifier confirms clear -> package_present -> clear after three confident observations, and no new publication through low-confidence frames. These replay labels were never injected into production MQTT. Replay evaluation uses real historical images. Difficult tall and partly visible boxes initially failed and were moved into the training/calibration data, so they are not independent test results. The final separate check contains 28 clear frames and one unseen shipping-bag delivery. The broad model's top label matches all 29; the edge model has one wrong label below the acceptance threshold, so it does not publish that prediction. Some clear frames fall below threshold in both models. This small set does not establish production accuracy or removal reliability. Per-crop inference measured roughly 5-6 ms on the current host; this is not end-to-end alert latency.

Before calling the replacement proven, verify:

- A new delivery produces a stable present state and one notification.
- A stationary package remains present through lighting changes.
- Pickup/removal produces clear from both crops.
- Night, white mailers, shadows, occlusion, and small edge packages behave correctly.
- Camera/MQTT outages and recovery preserve safe state and resume updates.
- New errors are categorized in Frigate and used for retraining.

## Rollback and future work

Retain the prior package YAML, Frigate configuration, and protected Home Assistant backup privately. To return to LLM Vision, reinstall its HACS component and configure the provider again, then restore the prior automation configuration and validate before reloading. The pre-removal backup also retains the removed integration configuration. Timestamp rollback removes the overlay, re-enables the camera timestamp, and restores its original mask. Use supported integration/configuration workflows; do not edit Home Assistant storage or Frigate model-cache files manually.

OpenAI Decisions remains an optional verification experiment in issue #1984. It is unnecessary for this local implementation and was not enabled or benchmarked. A candidate-only verifier cannot catch a package missed by the local classifier, so any later verification design should account for reconciliation too.

A future blog/video can show the original LLM Vision experiment, camera crops, labeling/training, the timestamp change, difficult cases, and measured real delivery/removal results. The [original video](https://youtu.be/nAhCezFetvI) documents the earlier cloud-based approach.
