/* Haven read-only, filtered Home Assistant state client.
 * Credentials are supplied by the caller and never persisted or logged here.
 * Uses the native compressed entity subscription; ES5 syntax for older displays.
 */
(function (root) {
    'use strict';
    function Client(options) {
        var self = this, socket = null, authenticated = false, stopped = true;
        var sequence = 0, subscription = 0, requested = [], states = {}, pending = {}, listeners = {}, streams = [];
        var retry = null, ping = null, notify = null, reconnectDelay = 1000, forceToken = false;
        function status(connected, message) { if (options.onStatus) options.onStatus(connected, message || ''); }
        function emit() {
            if (notify) return;
            notify = setTimeout(function () { notify = null; if (options.onStates) options.onStates(states); }, 150);
        }
        function unique(values) {
            return values.filter(function (value, index) { return values.indexOf(value) === index; }).sort();
        }
        function send(message) {
            if (!socket || socket.readyState !== 1) return 0;
            message.id = ++sequence;
            socket.send(JSON.stringify(message));
            return message.id;
        }
        function subscribe() {
            if (!authenticated) return;
            if (subscription) send({type: 'unsubscribe_events', subscription: subscription});
            subscription = send({type: 'subscribe_entities', entity_ids: requested});
        }
        function subscribeStream(stream) {
            var message = {type: stream.type};
            for (var key in stream.data) message[key] = stream.data[key];
            var id = send(message); listeners[id] = stream.callback;
        }
        function apply(update) {
            var id, raw, existing, patch, add, remove, key, extras = [];
            for (id in update.a || {}) {
                raw = update.a[id];
                states[id] = {entity_id: id, state: raw.s, attributes: raw.a || {},
                    last_changed: new Date(raw.lc * 1000).toISOString(),
                    last_updated: new Date((raw.lu || raw.lc) * 1000).toISOString()};
            }
            for (id in update.c || {}) {
                existing = states[id];
                if (!existing) continue;
                patch = update.c[id]; add = patch['+'] || {}; remove = patch['-'] || {};
                if (add.s !== undefined) existing.state = add.s;
                for (key in add.a || {}) existing.attributes[key] = add.a[key];
                (remove.a || []).forEach(function (name) { delete existing.attributes[name]; });
                if (add.lc) existing.last_changed = new Date(add.lc * 1000).toISOString();
                if (add.lu || add.lc) existing.last_updated = new Date((add.lu || add.lc) * 1000).toISOString();
            }
            (update.r || []).forEach(function (name) { delete states[name]; });
            requested.forEach(function (name) {
                var members = states[name] && states[name].attributes.entity_id;
                if (Array.isArray(members)) extras = extras.concat(members);
            });
            if (extras.some(function (name) { return requested.indexOf(name) < 0; })) {
                requested = unique(requested.concat(extras));
                subscribe();
            }
            emit();
        }
        function reconnect() {
            if (stopped || retry) return;
            retry = setTimeout(function () { retry = null; connect(); }, reconnectDelay);
            reconnectDelay = Math.min(30000, reconnectDelay * 2);
        }
        function connect() {
            if (stopped) return;
            // Never reuse privacy switches from a previous connection.
            states={};if(options.onStates)options.onStates(states);
            options.getToken(function (token) {
                if (stopped) return;
                try { socket = new WebSocket(options.url.replace(/^http/, 'ws').replace(/\/+$/, '') + '/api/websocket'); }
                catch (error) { status(false, 'Home Assistant connection unavailable'); reconnect(); return; }
                socket.onmessage = function (event) {
                    var message;
                    try { message = JSON.parse(event.data); } catch (error) { return; }
                    if (message.type === 'auth_required') socket.send(JSON.stringify({type: 'auth', access_token: token}));
                    else if (message.type === 'auth_ok') {
                        authenticated = true; reconnectDelay = 1000; forceToken = false;
                        status(true); subscribe();
                        listeners = {}; streams.forEach(subscribeStream);
                        clearInterval(ping);
                        ping = setInterval(function () { send({type: 'ping'}); }, 30000);
                    } else if (message.type === 'auth_invalid') {
                        forceToken = true; status(false, 'Home Assistant session needs renewal'); socket.close();
                    } else if (message.type === 'event' && message.id === subscription) apply(message.event);
                    else if (message.type === 'event' && listeners[message.id]) listeners[message.id](message.event);
                    else if (message.type === 'result' && pending[message.id]) {
                        var request = pending[message.id];
                        delete pending[message.id]; clearTimeout(request.timer);
                        request.done(message.success, message.result, message.error);
                    } else if (message.type === 'result' && message.id === subscription && !message.success) {
                        status(false, 'Home Assistant state subscription unavailable');
                    }
                };
                socket.onclose = function () {
                    authenticated = false; clearInterval(ping);
                    for (var id in pending) {
                        clearTimeout(pending[id].timer);
                        pending[id].done(false, null, {message: 'Connection closed'});
                    }
                    pending = {};
                    if (!stopped) { status(false, 'Reconnecting to Home Assistant'); reconnect(); }
                };
                socket.onerror = function () { status(false, 'Home Assistant connection unavailable'); };
            }, function () { status(false, 'Home Assistant session unavailable'); reconnect(); }, forceToken);
        }
        this.start = function () { if (!stopped) return; stopped = false; connect(); };
        this.stop = function () {
            stopped = true; clearTimeout(retry); retry = null; clearInterval(ping);
            status(false);states={};if(options.onStates)options.onStates(states);
            if (socket) socket.close();
        };
        this.setEntities = function (entities) {
            var next = unique(entities.concat(requested));
            if (next.join('|') === requested.join('|')) return;
            requested = next; subscribe();
        };
        this.call = function (type, data, done) {
            if (!authenticated) { done(false, null, {message: 'Home Assistant is not connected'}); return; }
            var message = {type: type};
            for (var key in data || {}) message[key] = data[key];
            var id = send(message);
            pending[id] = {done: done, timer: setTimeout(function () {
                if (!pending[id]) return;
                delete pending[id]; done(false, null, {message: 'Home Assistant request timed out'});
            }, 15000)};
        };
        this.getStates = function () { return states; };
        this.subscribe = function (type, data, callback) {
            var stream = {type:type,data:data,callback:callback}; streams.push(stream);
            if (authenticated) subscribeStream(stream);
        };
        this.setEntities(options.entities || []);
    }
    root.HavenKioskClient = Client;
}(window));
