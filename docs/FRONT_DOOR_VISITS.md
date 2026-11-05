# Doorstep visits and welcome-home summary

Related: [issue #364](https://github.com/CCOSTAN/Home-AssistantConfig/issues/364).

The [front door package](../config/packages/front_door_visits.yaml) records
visits to the doorstep, sends the parents a snapshot with a recorded-clip link,
and counts visits during a household absence. This counts visit episodes,
not distinct people or physical doorbell button presses.

## Frigate setup

Create a camera-specific `doorstep` zone on `frontdoorbell`, covering the porch
floor and final approach. Restrict it to `person`, use inertia `3`, and leave
loitering at `0` so quick deliveries qualify. Tune coordinates against actual
footage: zone entry uses the bottom center of the tracked bounding box.
Keep the public sidewalk and decorative figures outside the zone.

Require `doorstep` for the camera's person **alerts**. General detections,
recording retention, package classifiers, and existing object masks are
unchanged. The integration should expose
`binary_sensor.doorstep_person_occupancy` after loading the new configuration.
Reload the Frigate integration if it has not discovered the zone.

See the official [zone guide](https://docs.frigate.video/configuration/zones/)
and [notification guide](https://docs.frigate.video/guides/ha_notifications/).

## When the Halloween decorations come down

The person-object mask named `halloween_scarecrow_2026` under
`frontdoorbell.objects.filters.person.mask` is temporary. Disable or remove it
when the scarecrow has actually been removed, then verify a normal approach and
a sidewalk pass against the unobstructed view. A calendar date alone does not
establish that the decoration has been taken down.

Keep the permanent `doorstep` zone. It defines where visits count, while the
temporary mask suppresses a specific decoration's false person detections.
Recheck the zone boundary after removal, especially around the right side of
the porch, rather than leaving a seasonal blind spot in place.

## Visit lifecycle

- A fresh person event first entering the zone opens one visit episode.
  Updates, repeated event IDs, and additional people in that episode do not
  produce more alerts or counts. Events older than 30 seconds are ignored.
- The zone must remain clear for 90 seconds before another visit can start.
  This groups people arriving together and brief tracking interruptions.
  Separate visits within that interval are deliberately grouped.
- The existing notification engine delivers to `parents`, honors the global
  text-notification switch, and uses the event snapshot and clip through the
  existing Frigate notification proxy. Clips are limited by recording retention
  and may need the active recording segment to finish before playback.
- Guest mode suppresses notifications and away counting. Notifications also
  wait five seconds and require household presence to have been stable for
  two minutes, reducing arrival/departure alerts.

## Snooze and clip filtering

Doorstep alerts apply both at home and away. Each mobile notification offers
**Snooze 1 hour** and **Snooze 4 hours** actions for a party or trick-or-treaters.
Snooze is controlled through actionable notifications; Clips contains no
snooze controls.
The shared `timer.front_door_alert_snooze` mutes these alerts for both parents,
restores across restarts, and resumes notifications automatically at expiry.
It does not stop recording or away counting. Guest mode and the existing global
notification switch still apply independently.

Choose **Doorstep visits** beside the camera filter in **Clips** to request
recorded person clips from the `doorstep` zone. Filtering happens in Frigate
before pagination, so older matching clips remain reachable with **Older**.
Changing the camera returns to **All activity**; clearing the zone filter keeps
the selected camera. This is a clip filter: several clips can belong to one
grouped visit episode. Clips created before the zone existed are not backfilled.

## Away count and briefing

`counter.front_door_visits_while_away` resets when `group.family` starts a new
absence. The group includes the existing four resident person entities; named
off-site zones still count as away from this house.

An episode can count only after the away session has lasted two minutes. It
remains pending for 60 seconds, and a household return in that interval cancels
it. This is a conservative presence grace period, not identity recognition:
very late location updates can still count a returning resident, and a real
visitor just before a return can be excluded.

The existing [Home Stats arrival briefing](../config/automation/Speech/home_stats.yaml)
includes a positive count after the first household return. Manual briefings
do not repeat it. The count remains available until the next departure.
Zero does not produce a claim that nobody visited; camera or HA downtime can
leave gaps. Visits before installation are not backfilled.

Episode, away-session, pending-visit, event ID, timers, and counter helpers
restore across restarts. Startup preserves an ongoing trip and gives a pending
confirmation whose timer expired offline a fresh grace period. Unknown presence
does not count or discard a pending visit until presence is known again.

## Validation and operations

The initial zone was compared with 225 recent person events. All 49 candidate
snapshots showed people at the doorstep; sampled sidewalk and decoration events
stayed outside. Quick-delivery, nighttime, and decoration-control video samples
were also checked. Stored paths are sparse, so this is geometric and footage
validation, not a complete detector replay or an accuracy benchmark.

An isolated check using the installed Home Assistant script and template engines
with captured service boundaries covers
zone filtering, episode grouping, stale/duplicate events, presence grace,
restart reconciliation, guest mode, briefing gating, and notification compatibility.
It also checks snooze delivery suppression, notification actions, and continued
away counting during a snooze.
The check never connects to live MQTT or sends notifications. The YAML DRY
verifier and Home Assistant configuration validation also pass.

For a physical acceptance check, walk past on the sidewalk, then visit the porch,
leave it clear for at least 90 seconds, and repeat. Check a real absence/return
for one counter increment and one arrival summary. Such a future physical test
is separate from the recorded-footage and isolated automation checks.
