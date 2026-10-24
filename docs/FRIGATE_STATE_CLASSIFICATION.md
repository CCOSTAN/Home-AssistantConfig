# Local Frigate package and garage bin state classification

Tracking: [package detection #1984](https://github.com/CCOSTAN/Home-AssistantConfig/issues/1984) and [camera-assisted automations #2016](https://github.com/CCOSTAN/Home-AssistantConfig/issues/2016).

[![Watch local package detection](https://img.shields.io/badge/Watch-Local%20Package%20Detection-FF0000?logo=youtube&logoColor=white)](https://youtu.be/KpPYo_Uur7k) [![Local package detection blog](https://img.shields.io/static/v1?label=vCloudInfo&message=Local%20Package%20Detection&color=21759B&logo=wordpress&logoColor=white)](https://www.vcloudinfo.com/2026/10/local-package-detection-frigate-home-assistant.html)

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

Seasonal decorations, signs, floor reflections, and moving shadows still mean `clear` when no package is present. If the Recent tab labels them as packages, categorize a small, visually varied set of those mistakes as `clear` and retrain the existing model. Keep separate examples out of training for replay checks, and confirm that boxes and shipping bags still pass. Person/object masks do not change a state classifier's crop.

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

LLM Vision's provider/settings entries and HACS component are removed, along with its old helpers, update entity, provider reference, and timeline artifacts, including the orphaned old cans-in registry entry. A private backup was retained before cleanup. Garage classification now uses the actual bins in their regular storage positions; the former reflective marker is not used.

## Garage garbage and recycling

[![Watch smarter garbage reminders](https://img.shields.io/badge/Watch-Smarter%20Garbage%20Reminders-FF0000?logo=youtube&logoColor=white)](https://youtu.be/zcCrtwcw-S4) [![Garbage reminders blog](https://img.shields.io/static/v1?label=vCloudInfo&message=Garbage%20Reminders&color=21759B&logo=wordpress&logoColor=white)](https://www.vcloudinfo.com/2026/10/home-assistant-frigate-garbage-bin-reminders.html)

Two separate local models classify the regular garbage pail and recycling containers. Each uses `stored`, `absent`, and `obstructed` labels, a 0.9 acceptance threshold, motion checks, a 15-second interval, and Frigate's three-observation consensus. Camera-specific crop coordinates belong in the private Frigate configuration; adapt them to the actual bin positions when copying this pattern.

The household rule is explicit: bins absent from their usual garage storage position are assumed to be at the curb. This does not perform curb-camera verification. Recycling lids remaining on the floor count as containers absent, while containers holding cardboard or turned at an angle still count as stored. Include these cases when labeling real recordings.

`binary_sensor.garage_garbage_at_curb` and `binary_sensor.garage_recycling_at_curb` derive from the respective Frigate classification sensors. Unknown, unavailable, or confirmed `obstructed` sources do not establish bins out. Frigate preserves its last verified label through below-threshold predictions; those individual uncertain frames are not new state observations.

`binary_sensor.garbage_cans_out` keeps its existing identity and represents the bins required for the current collection day: garbage on Sunday, garbage plus recycling on Wednesday. A recycling observation is unnecessary for Sunday's garbage-only decision. The existing `input_boolean.garbage_cans_out` mirrors verified completion for kiosk compatibility, and is off while completion is unknown; it is not a claim that unknown bins are inside.

The shared `garbage_bins.jinja` macro names only bins that still need attention. Sunday checks garbage out; Wednesday checks garbage and recycling out. Monday checks garbage returned; Thursday checks both types returned. Return reminders are eligible from 08:00 to 21:00, including following days until the next take-out day. Pickup-day timing is a household reminder window, not evidence that a truck has collected the bins.

Verification is layered into the existing garage-open automation and shared speech briefing. The door must still open for 20 seconds, the phone recipient and snooze actions are unchanged, and garage repeats retain their 30/90/180-second cadence. No new reminder automation or clock schedule is added. Each repeat refreshes its wording: taking garbage out first on Wednesday leaves only recycling reminders; returning garbage first on Thursday also leaves only recycling. Verified completion stops further reminders. Unknown, offline, or obstructed views never establish a completed return. Tire-only garage reminders remain available.

Initial training uses a small private set of real historical crops, including day/night lighting, a parked car, an empty garage, people obstructing the view, and lids left behind. Calibration examples and classifier scores do not establish operational accuracy. Keep household images and models private. Validate a real take-out and return cycle for each bin type, partial Wednesday completion, obstructions, and camera/MQTT loss and recovery before treating the classifiers as proven.

## Timestamp and motion mask

The camera bridge exposes a timestamp on/off control, with no position control. The original camera timestamp is disabled, and the Frigate/go2rtc source applies a top-left overlay. The Wyze app therefore has no burned-in timestamp; Frigate and its Home Assistant streams include the replacement.

For a go2rtc FFmpeg video source, append a drawtext filter using a font available in the container. This example uses a placeholder source stream:

```text
ffmpeg:doorbell_raw#video=h264#drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:fontsize=38:fontcolor=white:borderw=2:bordercolor=black:x=20:y=20:text=%{localtime}
```

This encodes the source video, so verify CPU use, live playback, recording, and any audio requirements for your camera. Keep existing compatible presentation streams downstream of the annotated source. Confirm the container's local time matches the desired timezone.

The existing timestamp motion mask moves to the top-left area (`0,0,0.345,0,0.345,0.045,0,0.045` for this portrait image). Keep other masks unchanged and adapt this polygon to your own timestamp width and camera resolution. Removing the old lower-right overlay and mask exposes the doorstep edge.

## Validation and remaining checks

The package cutover's Frigate and Home Assistant configurations passed validation. Both package classifier states restored as clear and the startup automation completed successfully. No LLM Vision config entries, services, or installed HACS component remain. The package sensors and shared notification automation remain in use. The separate garage rollout adds local storage classifiers and collection-day reminder gating; its operational checks are described above.

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
