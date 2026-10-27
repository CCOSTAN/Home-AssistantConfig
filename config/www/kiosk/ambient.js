/* Shared household kiosk notification model.
 * Kitchen, Upstairs, Office, Bedroom and Haven consume this one list.
 * Add notification types in build(); keep ES5 syntax for older displays.
 * State and actions are data only; renderers decide presentation and interaction.
 * Issue #2029: seasonal accents follow the lighting mode, never a second calendar.
 */
(function (root) {
    'use strict';
    function firstIndex(values, predicate) {
        for (var index = 0; index < values.length; index++) {
            if (predicate(values[index], index, values)) return index;
        }
        return -1;
    }
    function seasonal(states) {
        // Palette values follow scene/monthly_colors.yaml and Joanna's approved art.
        // Return decoration only: never recolor text, warning icons, or camera pixels.
        var palettes = {
            halloween: [[255,165,0], [0,128,0], [30,144,255]],
            thanksgiving: [[255,165,0]],
            christmas: [[204,0,0], [0,128,0]],
            hanukkah: [[30,144,255], [255,255,255]],
            rwb: [[204,0,0], [245,245,245], [30,144,255]],
            new_years_day: [[255,165,0], [30,144,255], [0,128,0]],
            valentine: [[220,20,60]],
            mardi_gras: [[255,223,0], [128,0,128], [0,128,0]],
            pi: [[3,14,159]],
            st_patty: [[0,128,0]],
            easter: [[244,187,255], [255,193,204], [255,255,0]],
            starwars: [[204,0,0], [245,245,245]],
            cinco_de_mayo: [[204,0,0], [245,245,245], [0,128,0]],
            mothers_day: [[244,187,255]],
            fathers_day: [[255,165,0], [30,144,255]],
            veterans: [[0,128,0]]
        };
        var source = states && states['sensor.holiday_lighting_mode'];
        var mode = String(source && source.state || '').trim().toLowerCase();
        var colors = Object.prototype.hasOwnProperty.call(palettes, mode) ? palettes[mode] : null;
        if (!colors) return {mode: 'standard', label: '', art: '', emblem: '', wash: 'none', edge: 'none', background: 'none', compactBackground: 'none'};
        var labels = {
            halloween: 'Halloween', thanksgiving: 'Thanksgiving', christmas: 'Christmas',
            hanukkah: 'Hanukkah', rwb: 'Stars & Stripes', new_years_day: 'New Year',
            valentine: "Valentine's Day", mardi_gras: 'Mardi Gras', pi: 'Pi Day',
            st_patty: "St. Patrick's Day", easter: 'Easter', starwars: 'Star Wars Day',
            cinco_de_mayo: 'Cinco de Mayo', mothers_day: "Mother's Day",
            fathers_day: "Father's Day", veterans: 'Veterans Day'
        };
        function rgba(color, opacity) { return 'rgba(' + color.join(',') + ',' + opacity + ')'; }
        var wash = 'linear-gradient(115deg,' + rgba(colors[0], 0.14) + ',' +
            rgba(colors[Math.min(1, colors.length - 1)], 0.055) + ' 60%,' +
            rgba(colors[colors.length - 1], 0.10) + ')';
        var art = '/local/kiosk/seasonal/' + mode + '.svg';
        return {
            mode: mode,
            label: labels[mode], art: art,
            emblem: '/local/kiosk/seasonal/' + mode + '-emblem.svg',
            wash: wash,
            background: 'url("' + art + '") right 14px top 6px / 112px 64px no-repeat,' + wash,
            compactBackground: 'url("' + art + '") right 8px top 4px / 63px 36px no-repeat,' + wash,
            edge: 'inset 0 2px 0 ' + rgba(colors[0], 0.75)
        };
    }
    function build(states, now) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        now = now || new Date();
        var state = function (entityId) { var _a; return (_a = states[entityId]) === null || _a === void 0 ? void 0 : _a.state; };
        var valid = function (value) { return ['unknown', 'unavailable', 'none', '', undefined].indexOf(value) < 0; };
        var pretty = function (value) { return String(value || 'Unknown').split('_').join(' '); };
        var dateKey = function (date) {
            var year = date.getFullYear();
            var month = ('0' + (date.getMonth() + 1)).slice(-2);
            var day = ('0' + date.getDate()).slice(-2);
            return "".concat(year, "-").concat(month, "-").concat(day);
        };
        var items = [];
        var radarWeatherEvent = states['binary_sensor.kiosk_rain_radar_weather_event'];
        var radarDisplayTimer = states['timer.kitchen_kiosk_radar_display'];
        var radarReplayReady = (radarWeatherEvent === null || radarWeatherEvent === void 0 ? void 0 : radarWeatherEvent.state) === 'on' &&
            state('binary_sensor.kiosk_rain_radar_active') !== 'on' &&
            (radarDisplayTimer === null || radarDisplayTimer === void 0 ? void 0 : radarDisplayTimer.state) === 'idle' &&
            new Date(radarDisplayTimer.last_changed).getTime() >
                new Date(radarWeatherEvent.last_changed).getTime();
        if (radarReplayReady) {
            items.push({
                kicker: 'WEATHER RADAR',
                title: 'Storms Approaching',
                detail: 'Tap for radar',
                icon: 'mdi:radar',
                accent: '#0288d1',
                action: {
                    service: 'kitchen_kiosk_show_event',
                    data: { event_type: 'radar' }
                }
            });
        }
        var phynAlerts = [
            'binary_sensor.garage_phyn_battery_alert',
            'binary_sensor.garage_phyn_freeze_warning_alert',
            'binary_sensor.garage_phyn_high_pressure_alert',
            'binary_sensor.garage_phyn_leak_alert',
            'binary_sensor.garage_phyn_offline_leak_shutoff_alert',
            'binary_sensor.garage_phyn_pinhole_leak_alert',
            'binary_sensor.garage_phyn_recurring_flow_alert',
            'binary_sensor.garage_phyn_temperature_alert'
        ].filter(function (entityId) { return state(entityId) === 'on'; });
        var phynValveState = state('valve.phyn_shutoff_valve');
        if (phynAlerts.length > 0 || (valid(phynValveState) && phynValveState !== 'open')) {
            var alertNames = phynAlerts.map(function (entityId) { var _a, _b; return ((_b = (_a = states[entityId]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name) || pretty(entityId.split('.')[1]); });
            items.push({
                kicker: 'WATER SYSTEM',
                title: phynValveState === 'closed' ? 'Main water is off' : 'Phyn needs attention',
                detail: "".concat(alertNames.join(' · ') || "Valve is ".concat(pretty(phynValveState)), " \u00B7 Tap for water details"),
                icon: 'mdi:water-alert-outline',
                accent: '#c62828',
                action: {
                    service: 'kitchen_kiosk_show_detail',
                    data: { detail_type: 'phyn' }
                }
            });
        }
        var weatherAlertEntity = states['sensor.nws_alerts_alerts'];
        var weatherAlertCount = Number.parseInt(weatherAlertEntity === null || weatherAlertEntity === void 0 ? void 0 : weatherAlertEntity.state, 10);
        var weatherAlerts = Array.isArray((_a = weatherAlertEntity === null || weatherAlertEntity === void 0 ? void 0 : weatherAlertEntity.attributes) === null || _a === void 0 ? void 0 : _a.Alerts)
            ? weatherAlertEntity.attributes.Alerts
            : [];
        var cleanAlertText = function (value) { return String(value || '').replace(/\s+/g, ' ').trim(); };
        var alertSection = function (description, label) {
            var _a;
            var pattern = new RegExp("\\*\\s*".concat(label, "\\.{3}\\s*([\\s\\S]*?)(?=\\n\\s*\\n\\s*\\*\\s*[A-Z ]+\\.{3}|$)"), 'i');
            return cleanAlertText((_a = String(description || '').match(pattern)) === null || _a === void 0 ? void 0 : _a[1]);
        };
        var limitAlertText = function (value, maxLength) {
            if (maxLength === void 0) { maxLength = 240; }
            var text = cleanAlertText(value);
            if (text.length <= maxLength)
                return text;
            return "".concat(text.slice(0, maxLength - 3).replace(/\s+\S*$/, ''), "...");
        };
        var severityOrder = { Extreme: 0, Severe: 1, Moderate: 2, Minor: 3, Unknown: 4 };
        var severityColors = {
            Extreme: '#b71c1c',
            Severe: '#c62828',
            Moderate: '#d84315',
            Minor: '#f9a825',
            Unknown: '#546e7a'
        };
        var uniqueWeatherAlerts = weatherAlerts
            .filter(function (alert, index, alerts) {
            var alertKey = alert.ID || alert.URL || "".concat(alert.Event, "|").concat(alert.Expires);
            return firstIndex(alerts, function (candidate) {
                return (candidate.ID || candidate.URL || "".concat(candidate.Event, "|").concat(candidate.Expires)) === alertKey;
            }) === index;
        })
            .sort(function (left, right) {
            var _a, _b;
            return ((_a = severityOrder[left.Severity]) !== null && _a !== void 0 ? _a : severityOrder.Unknown)
                - ((_b = severityOrder[right.Severity]) !== null && _b !== void 0 ? _b : severityOrder.Unknown);
        });
        if (uniqueWeatherAlerts.length > 0) {
            uniqueWeatherAlerts.forEach(function (alert, index) {
                var severity = severityColors[alert.Severity] ? alert.Severity : 'Unknown';
                var detailParts = [
                    alertSection(alert.Description, 'WHAT'),
                    alertSection(alert.Description, 'WHERE'),
                    alertSection(alert.Description, 'WHEN')
                ].filter(Boolean);
                var detail = detailParts.length > 0
                    ? detailParts.join(' · ')
                    : alert.Headline || alert.Description || 'Active National Weather Service alert';
                var position = uniqueWeatherAlerts.length > 1
                    ? " ".concat(index + 1, "/").concat(uniqueWeatherAlerts.length)
                    : '';
                items.push({
                    kicker: "WEATHER ALERT".concat(position, " \u00B7 ").concat(severity.toUpperCase()),
                    title: alert.Event || "".concat(weatherAlertCount, " active alerts"),
                    detail: limitAlertText(detail),
                    icon: 'mdi:weather-lightning-rainy',
                    accent: severityColors[severity],
                    action: {
                        service: 'kitchen_kiosk_show_detail',
                        data: {
                            detail_type: 'weather',
                            detail_subject: String(alert.ID || index)
                        }
                    }
                });
            });
        }
        else if (Number.isFinite(weatherAlertCount) && weatherAlertCount > 0) {
            items.push({
                kicker: 'WEATHER ALERT',
                title: "".concat(weatherAlertCount, " active ").concat(weatherAlertCount === 1 ? 'alert' : 'alerts'),
                detail: 'Alert details are temporarily unavailable',
                icon: 'mdi:weather-lightning-rainy',
                accent: severityColors.Unknown,
                action: {
                    service: 'kitchen_kiosk_show_detail',
                    data: { detail_type: 'weather', detail_subject: '0' }
                }
            });
        }
        if (valid(state('group.garage_doors')) && ['closed', 'off'].indexOf(state('group.garage_doors')) < 0) {
            var openGarages = ['cover.large_garage_door', 'cover.small_garage_door']
                .filter(function (entityId) { return valid(state(entityId)) && state(entityId) !== 'closed'; })
                .map(function (entityId) { var _a, _b; return ((_b = (_a = states[entityId]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name) || pretty(entityId.split('.')[1]); });
            items.push({
                kicker: 'GARAGE',
                title: 'Garage door open',
                detail: openGarages.join(' · ') || 'Check both garage doors',
                icon: 'mdi:garage-open-variant',
                accent: '#ef6c00'
            });
        }
        if (state('group.entry_points') === 'on') {
            var openEntries = (((_c = (_b = states['group.entry_points']) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.entity_id) || [])
                .filter(function (entityId) { return state(entityId) === 'on'; })
                .map(function (entityId) { var _a, _b; return ((_b = (_a = states[entityId]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name) || pretty(entityId.split('.')[1]); });
            var extraCount = Math.max(0, openEntries.length - 3);
            var entryDetail = openEntries.slice(0, 3).join(' · ') + (extraCount ? " \u00B7 +".concat(extraCount, " more") : '');
            items.push({
                kicker: 'ENTRY POINT',
                title: openEntries.length === 1 ? 'Door or window open' : "".concat(openEntries.length, " openings detected"),
                detail: entryDetail || 'Check the exterior doors and windows',
                icon: 'mdi:door-open',
                accent: '#ef6c00',
                action: {
                    service: 'kitchen_kiosk_show_detail',
                    data: { detail_type: 'entry_points' }
                }
            });
        }
        if (valid(state('group.locks')) && state('group.locks') !== 'locked') {
            items.push({
                kicker: 'SECURITY',
                title: 'Check the front door lock',
                detail: "Lock group is ".concat(pretty(state('group.locks'))),
                icon: 'mdi:lock-alert-outline',
                accent: '#c62828'
            });
        }
        if (state('binary_sensor.front_door_packages_present') === 'on') {
            items.push({
                kicker: 'FRONT DOOR',
                title: 'Package waiting',
                detail: 'Tap for the front door view',
                icon: 'mdi:package-variant-closed',
                accent: '#8e5a2b',
                action: {
                    service: 'kitchen_kiosk_show_detail',
                    data: { detail_type: 'package' }
                }
            });
        }
        var rheemAlertCount = Number.parseInt(state('sensor.rheem_wh_alert_count'), 10);
        var rheemStatus = state('sensor.rheem_wh_diagnostic_status');
        var rheemProblem = state('binary_sensor.rheem_wh_problem') === 'on';
        if (rheemProblem) {
            var activeAlert = state('binary_sensor.rheem_wh_active_alert') === 'on';
            var telemetryStale = state('binary_sensor.rheem_wh_telemetry_stale') === 'on';
            items.push({
                kicker: telemetryStale && !activeAlert ? 'WATER HEATER TELEMETRY' : 'WATER HEATER ALERT',
                title: activeAlert && Number.isFinite(rheemAlertCount)
                    ? "".concat(rheemAlertCount, " active ").concat(rheemAlertCount === 1 ? 'alert' : 'alerts')
                    : "Rheem status: ".concat(pretty(rheemStatus)),
                detail: telemetryStale
                    ? 'EcoNet data has been unavailable for 10 minutes · Tap for diagnostics'
                    : 'Home Assistant Repairs has the diagnostic snapshot · Tap for details',
                icon: 'mdi:water-boiler-alert',
                accent: telemetryStale && !activeAlert ? '#ef6c00' : '#c62828',
                action: {
                    service: 'kitchen_kiosk_show_detail',
                    data: { detail_type: 'hot_water' }
                }
            });
        }
        var hotWater = Number.parseFloat(state('sensor.rheem_wh_available_hot_water'));
        if (!rheemProblem && Number.isFinite(hotWater) && hotWater < 30) {
            items.push({
                kicker: 'HOT WATER',
                title: 'Hot water is running low',
                detail: "".concat(Math.round(hotWater), "% available \u00B7 Tap for recovery details"),
                icon: 'mdi:water-thermometer-outline',
                accent: '#0277bd',
                action: {
                    service: 'kitchen_kiosk_show_detail',
                    data: { detail_type: 'hot_water' }
                }
            });
        }
        var weekday = now.toLocaleDateString('en-US', { weekday: 'short' });
        if (['Wed', 'Sun'].indexOf(weekday) >= 0 && state('input_boolean.garbage_cans_out') !== 'on') {
            items.push({
                kicker: 'TODAY',
                title: weekday === 'Wed' ? 'Garbage + recycling day' : 'Garbage day',
                detail: 'Put the cans at the curb',
                icon: 'mdi:trash-can-outline',
                accent: '#2e7d32'
            });
        }
        var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        if (state('input_datetime.water_delivery_date') === dateKey(tomorrow)) {
            items.push({
                kicker: 'WATER DELIVERY TOMORROW',
                title: 'Put the bottles out',
                detail: 'Stage them before leaving the house',
                icon: 'mdi:bottle-soda-classic-outline',
                accent: '#0277bd'
            });
        }
        var battery = Number.parseFloat(state('sensor.spaceship_battery_level'));
        var lastClose = new Date(String(state('input_datetime.tesla_model_y_last_garage_close')).replace(' ', 'T'));
        var snoozeUntil = new Date(String(state('input_datetime.tesla_model_y_plug_in_snooze_until')).replace(' ', 'T'));
        var recentArrival = Number.isFinite(lastClose.getTime()) && (now.getTime() - lastClose.getTime()) < 43200000;
        var snoozeExpired = !Number.isFinite(snoozeUntil.getTime()) || snoozeUntil <= now;
        if (Number.isFinite(battery) && battery < 50 && recentArrival && snoozeExpired &&
            state('switch.spaceship_charge') === 'off' &&
            state('person.carlo') === 'home' && state('person.stacey') === 'home') {
            items.push({
                kicker: 'MODEL Y',
                title: 'Plug in the Tesla',
                detail: "".concat(Math.round(battery), "% battery after the latest garage arrival"),
                icon: 'mdi:ev-plug-tesla',
                accent: '#c62828'
            });
        }
        if (state('light.sink') === 'unavailable') {
            items.push({
                kicker: 'CHECK WALL SWITCH',
                title: 'Kitchen sink light',
                detail: 'Please turn its physical switch back on.',
                icon: 'mdi:lightbulb-alert-outline',
                accent: '#ef6c00'
            });
        }
        var saltDays = Number.parseFloat(state('sensor.water_softener_salt_days_since_last_add'));
        var saltAverage = Number.parseFloat(state('sensor.water_softener_salt_average_days_between_refills'));
        if (Number.isFinite(saltDays) && Number.isFinite(saltAverage) && saltAverage > 0 &&
            saltDays >= saltAverage * 0.9) {
            items.push({
                kicker: 'WATER SOFTENER',
                title: 'Salt refill coming due',
                detail: "".concat(Math.round(saltDays), " days since the last refill"),
                icon: 'mdi:shaker-outline',
                accent: '#00838f'
            });
        }
        var bowlingHighlights = (_e = (_d = states['sensor.bearclaw_status_telemetry']) === null || _d === void 0 ? void 0 : _d.attributes) === null || _e === void 0 ? void 0 : _e.bowlingHighlights;
        if ((bowlingHighlights === null || bowlingHighlights === void 0 ? void 0 : bowlingHighlights.active) && Array.isArray(bowlingHighlights.items)) {
            bowlingHighlights.items.forEach(function (highlight) {
                var expiresAt = new Date((highlight === null || highlight === void 0 ? void 0 : highlight.expiresAt) || '');
                var games = (Array.isArray(highlight === null || highlight === void 0 ? void 0 : highlight.games) ? highlight.games : [])
                    .map(function (score) { return Number.parseInt(score, 10); })
                    .filter(Number.isFinite);
                var highGame = Number.parseInt(highlight === null || highlight === void 0 ? void 0 : highlight.highGame, 10);
                var seriesTotal = Number.parseInt(highlight === null || highlight === void 0 ? void 0 : highlight.seriesTotal, 10);
                if (!Number.isFinite(expiresAt.getTime()) || expiresAt <= now || !games.length || !Number.isFinite(highGame))
                    return;
                var records = Array.isArray(highlight === null || highlight === void 0 ? void 0 : highlight.personalBestIds) ? highlight.personalBestIds : [];
                var highGameRecord = records.indexOf('bowling_high_game') >= 0;
                var highSeriesRecord = records.indexOf('bowling_high_series') >= 0 && Number.isFinite(seriesTotal);
                var title = highGameRecord
                    ? "".concat(highlight.displayName, "'s new high game: ").concat(highGame)
                    : (highSeriesRecord
                        ? "".concat(highlight.displayName, "'s new high series: ").concat(seriesTotal)
                        : "".concat(highlight.displayName, "'s high game: ").concat(highGame));
                var detail = [
                    games.join(' / '),
                    Number.isFinite(seriesTotal) ? "".concat(seriesTotal, " series") : '',
                    Number.isFinite(Number(highlight === null || highlight === void 0 ? void 0 : highlight.weekNum)) ? "Week ".concat(highlight.weekNum) : ''
                ].filter(Boolean).join(' · ');
                items.push({
                    kicker: highGameRecord || highSeriesRecord ? 'BOWLING PERSONAL BEST' : 'TUESDAY BOWLING',
                    title: title,
                    detail: detail,
                    icon: 'mdi:bowling',
                    accent: '#7e57c2'
                });
            });
        }
        var phoneFeed = states['sensor.kiosk_recent_phone_notifications'];
        if (Array.isArray((_f = phoneFeed === null || phoneFeed === void 0 ? void 0 : phoneFeed.attributes) === null || _f === void 0 ? void 0 : _f.items)) {
            phoneFeed.attributes.items.forEach(function (notification) {
                if (Number(notification.expires_at) * 1000 <= now.getTime())
                    return;
                items.push({
                    kicker: "PHONE NOTIFICATION \u00B7 ".concat(notification.sent_time),
                    title: notification.title,
                    detail: notification.message,
                    icon: notification.icon,
                    accent: notification.color
                });
            });
        }
        var recordFeed = states['sensor.kiosk_recent_personal_records'];
        var personalRecords = (recordFeed === null || recordFeed === void 0 ? void 0 : recordFeed.state) === 'ready' ? (_g = recordFeed.attributes) === null || _g === void 0 ? void 0 : _g.items : null;
        if (Array.isArray(personalRecords)) {
            personalRecords.forEach(function (record) {
                var occurredAt = new Date((record === null || record === void 0 ? void 0 : record.occurredAt) || '');
                if (!Number.isFinite(occurredAt.getTime()) ||
                    occurredAt > now || now - occurredAt > 7 * 24 * 60 * 60 * 1000 ||
                    !(record === null || record === void 0 ? void 0 : record.person) || !(record === null || record === void 0 ? void 0 : record.label) || !(record === null || record === void 0 ? void 0 : record.displayValue))
                    return;
                items.push({
                    kicker: 'NEW PERSONAL BEST',
                    title: "".concat(record.person, ": ").concat(record.label),
                    detail: [record.displayValue, record.activityType, record.dayKey].filter(Boolean).join(' · '),
                    icon: 'mdi:trophy-outline',
                    accent: '#2e7d32'
                });
            });
        }
        var cruiseDays = Number.parseInt(state('sensor.next_booked_cruise_countdown'), 10);
        var cruiseEntity = states['sensor.next_booked_cruise_countdown'];
        var cruiseShip = String(((_h = cruiseEntity === null || cruiseEntity === void 0 ? void 0 : cruiseEntity.attributes) === null || _h === void 0 ? void 0 : _h.ship) || '').trim();
        var cruiseDate = String(((_j = cruiseEntity === null || cruiseEntity === void 0 ? void 0 : cruiseEntity.attributes) === null || _j === void 0 ? void 0 : _j.sail_date) || '').trim();
        if (Number.isInteger(cruiseDays) && cruiseDays >= 0 && cruiseShip && cruiseDate) {
            var sailDate = new Date("".concat(cruiseDate, "T12:00:00"));
            var sailLabel = Number.isFinite(sailDate.getTime())
                ? sailDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                : cruiseDate;
            var cruiseNights = Number.parseInt((_k = cruiseEntity === null || cruiseEntity === void 0 ? void 0 : cruiseEntity.attributes) === null || _k === void 0 ? void 0 : _k.nights, 10);
            var cruisePort = String(((_l = cruiseEntity === null || cruiseEntity === void 0 ? void 0 : cruiseEntity.attributes) === null || _l === void 0 ? void 0 : _l.port) || '').trim();
            var detail = [
                "Departs ".concat(sailLabel),
                Number.isInteger(cruiseNights) && cruiseNights > 0
                    ? "".concat(cruiseNights, " ").concat(cruiseNights === 1 ? 'night' : 'nights')
                    : '',
                cruisePort
            ].filter(Boolean).join(' · ');
            items.push({
                kicker: 'NEXT BOOKED CRUISE',
                title: cruiseDays === 0
                    ? "".concat(cruiseShip, " sails today")
                    : "".concat(cruiseDays, " ").concat(cruiseDays === 1 ? 'day' : 'days', " until ").concat(cruiseShip),
                detail: detail,
                icon: 'mdi:ferry',
                accent: '#00838f'
            });
        }
        [
            ['Carlo', 'person.carlo', 'sensor.carlo_location_display'],
            ['Stacey', 'person.stacey', 'sensor.stacey_location_display'],
            ['Justin', 'person.justin', 'sensor.justin_location_display'],
            ['Paige', 'person.paige', 'sensor.paige_location_display']
        ].forEach(function (_a) {
            var _b;
            var name = _a[0], personId = _a[1], locationId = _a[2];
            var personState = state(personId);
            if (valid(personState) && personState !== 'home') {
                var locationEntity = states[locationId];
                var rawLocation = pretty(valid(state(locationId)) ? state(locationId) : personState);
                var withoutName = rawLocation.replace(new RegExp("^".concat(name, "\\s+"), 'i'), '');
                var sinceMatch = withoutName.match(/\s*\(since\s+([^)]+)\)\s*$/i);
                var location = withoutName.replace(/\s*\(since\s+[^)]+\)\s*$/i, '').trim();
                var changedAt = new Date((locationEntity === null || locationEntity === void 0 ? void 0 : locationEntity.last_changed) || ((_b = states[personId]) === null || _b === void 0 ? void 0 : _b.last_changed));
                var since = (sinceMatch === null || sinceMatch === void 0 ? void 0 : sinceMatch[1]) || (Number.isFinite(changedAt.getTime())
                    ? changedAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
                    : 'recently');
                items.push({
                    kicker: 'FAMILY LOCATION',
                    title: "".concat(name, " - ").concat(location || pretty(personState)),
                    detail: "Since ".concat(since),
                    icon: 'mdi:map-marker-account-outline',
                    accent: '#6a1b9a',
                    action: {
                        service: 'kitchen_kiosk_show_detail',
                        data: { detail_type: 'family', detail_subject: personId }
                    }
                });
            }
        });
        if (items.length === 0) {
            items.push({
                kicker: 'HOUSEHOLD',
                title: 'Everything is handled',
                detail: 'Everyone is home and there are no active reminders',
                icon: 'mdi:check-circle-outline',
                accent: '#2e7d32'
            });
        }
        return { items: items, state: state, valid: valid, pretty: pretty, dateKey: dateKey, cleanAlertText: cleanAlertText, alertSection: alertSection, limitAlertText: limitAlertText, uniqueWeatherAlerts: uniqueWeatherAlerts, phynAlerts: phynAlerts, rheemProblem: rheemProblem };
    }
    root.BearStoneKioskAmbient = { version: '1.2.0', seasonal: seasonal, dependencies: ["sensor.holiday_lighting_mode", "binary_sensor.garage_phyn_battery_alert", "binary_sensor.garage_phyn_freeze_warning_alert", "binary_sensor.garage_phyn_high_pressure_alert", "binary_sensor.garage_phyn_leak_alert", "binary_sensor.garage_phyn_offline_leak_shutoff_alert", "binary_sensor.garage_phyn_pinhole_leak_alert", "binary_sensor.garage_phyn_recurring_flow_alert", "binary_sensor.garage_phyn_temperature_alert", "valve.phyn_shutoff_valve", "sensor.phyn_current_water_pressure", "sensor.phyn_average_water_flow_rate", "sensor.nws_alerts_alerts", "group.garage_doors", "group.entry_points", "group.locks", "binary_sensor.front_door_packages_present", "sensor.rheem_wh_available_hot_water", "sensor.rheem_wh_alert_count", "sensor.rheem_wh_diagnostic_status", "binary_sensor.rheem_wh_problem", "binary_sensor.rheem_wh_active_alert", "binary_sensor.rheem_wh_telemetry_stale", "binary_sensor.rheem_wh_running", "sensor.rheem_wh_tank_health", "sensor.rheem_wh_compressor_health", "water_heater.rheem_wh", "light.sink", "input_boolean.garbage_cans_out", "input_datetime.water_delivery_date", "sensor.water_softener_salt_days_since_last_add", "sensor.water_softener_salt_average_days_between_refills", "sensor.spaceship_battery_level", "switch.spaceship_charge", "input_datetime.tesla_model_y_last_garage_close", "input_datetime.tesla_model_y_plug_in_snooze_until", "sensor.next_booked_cruise_countdown", "sensor.bearclaw_status_telemetry", "sensor.kiosk_recent_personal_records", "sensor.kiosk_recent_phone_notifications", "person.carlo", "person.stacey", "person.justin", "person.paige", "sensor.carlo_location_display", "sensor.stacey_location_display", "sensor.justin_location_display", "sensor.paige_location_display", "binary_sensor.kiosk_rain_radar_weather_event", "binary_sensor.kiosk_rain_radar_active", "timer.kitchen_kiosk_radar_display", "input_text.kitchen_kiosk_detail_view", "timer.kitchen_kiosk_detail_display", "sensor.kiosk_active_camera_view", "camera.frontdoorbell"], build: build };
}(window));
