/* Optional read-only household information panel. All entity mappings are private config.
 * Daily energy comes from HA recorder day aggregates; forecasts use HA's native subscription.
 * Plain ES5 for TV WebViews. No household identifiers or credentials are embedded here.
 */
(function (root) {
    'use strict';
    function escape(value) { return String(value == null ? '' : value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
    function valid(value) { return value !== undefined && value !== null && ['unknown','unavailable','none',''].indexOf(value) < 0; }
    function number(value) { return valid(value) && isFinite(Number(value)) ? Number(value) : null; }
    function initial(name) { return String(name || '?').slice(0,1).toUpperCase(); }
    var paths = {
        garage:'M3 10L12 3l9 7v11h-4V11H7v10H3z M9 14h6 M9 17h6 M9 20h6',
        lock:'M7 10V7a5 5 0 0110 0v3 M5 10h14v12H5z M12 14v4',
        window:'M3 3h18v18H3z M12 3v18 M3 12h18',
        climate:'M9 14.5V5a3 3 0 016 0v9.5a5 5 0 11-6 0z M12 8v9',
        home:'M2 11L12 3l10 8 M5 10v12h5v-7h4v7h5V10',
        solar:'M4 9h16l2 11H2z M9 9L7 20 M15 9l2 11 M3 14h18 M12 2v3 M4 3l2 3 M20 3l-2 3',
        grid:'M9 2h6l5 20 M9 2L4 22 M6 8h12 M4 14h16 M9 2l8 12 M15 2L7 14',
        battery:'M4 6h16v15H4z M9 3h6v3 M8 10h8 M8 14h8 M8 18h5',
        water:'M12 2C10 7 5 11 5 16a7 7 0 0014 0c0-5-5-9-7-14z'
    };
    function icon(name) { return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+(paths[name] || paths.home)+'" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/></svg>'; }
    function weatherIcon(condition) {
        var name=String(condition || '');
        if (/snow|sleet/.test(name)) return '❄';
        if (/rain|pouring|lightning/.test(name)) return '☂';
        if (/cloud|fog/.test(name)) return '☁';
        return /night/.test(name) ? '☾' : '☀';
    }
    function Information(options) {
        var self=this, config=options.config || {}, ha=options.ha, client=null, states={}, forecasts=[];
        var cards=config.statusCards || [], people=(config.people || []).slice(0,4), energy=config.energy, agenda=config.agenda;
        var lastAgenda='', activePages='', pageIndex=0, pageSince=0;
        var weather=config.weatherEntity || options.weatherEntity, lastForecast='', lastAway='', lastEnergy='', lastEnergyAt=0;
        var avatarSources={}, avatarObjects={}, energyValues=null, connected=false;
        var ribbon=options.statusRoot, panel=options.panelRoot;
        ribbon.innerHTML=cards.map(function(card,index){return '<div class="kiosk-status-card normal" id="kiosk-status-'+index+'"><span class="status-icon">'+icon(card.icon)+'</span><div class="status-copy"><div class="status-name">'+escape(card.name)+'</div><div class="status-value">Loading</div></div></div>';}).join('');
        panel.innerHTML='<section class="kiosk-family-strip">'+people.map(function(person,index){return '<div class="kiosk-person unknown" id="kiosk-person-'+index+'"><div class="person-photo"><span class="person-initial">'+escape(initial(person.name))+'</span><img alt="'+escape(person.name)+'" hidden></div><div class="person-name">'+escape(person.name)+'</div><div class="person-state">Loading</div></div>';}).join('')+'</section>'+
            '<section class="kiosk-details"><div class="info-page family-weather"><div class="weather-now"><div><div class="weather-condition"></div><div class="weather-temperature"></div><div class="weather-context"></div></div><div class="weather-symbol"></div></div><div class="info-forecast"><div class="info-heading">UPCOMING WEATHER</div><div class="forecast-days">Loading forecast</div></div><div class="info-away-list"></div></div><div class="info-page energy" hidden><div class="energy-heading">Energy'+(energy && energy.water?' &amp; water':'')+' today <span>kWh</span></div><div class="energy-body">Loading today’s totals</div></div><div class="kiosk-pagination"><i></i><i></i></div></section>';
        function state(id) { return states[id] ? states[id].state : ''; }
        function attributes(id) { return states[id] ? states[id].attributes : {}; }
        var agendaPage=document.createElement('div');
        agendaPage.className='info-page family-agenda';agendaPage.hidden=true;
        agendaPage.innerHTML='<div class="agenda-heading">Upcoming <span>Family schedule</span></div><div class="agenda-list"></div>';
        panel.querySelector('.kiosk-details').insertBefore(agendaPage,panel.querySelector('.kiosk-pagination'));
        function renderAgenda() {
            var data=agenda && attributes(agenda.entity)[agenda.attribute || 'familyAgenda'], items=[], now=Date.now();
            var privacy=agenda && agenda.hideWhenEntities || [];
            if (connected && agenda && state(agenda.entity)==='ok' && privacy.length && privacy.every(function(id){return state(id)==='off';})
                && data && data.status==='ok' && Date.parse(data.expiresAt)>now && now-Date.parse(data.fetchedAt)<600000) {
                items=(Array.isArray(data.items)?data.items:[]).filter(function(item){return item && Date.parse(item.end)>now;}).slice(0,4);
            }
            var html=items.map(function(item){
                var tone=['person-0','person-1','shared'].indexOf(item.tone)>=0?item.tone:'shared';
                return '<div class="agenda-item '+tone+'"><div class="agenda-meta"><span class="agenda-when">'+escape(item.day)+' <b>·</b> '+escape(item.time)+'</span><span class="agenda-owner">'+escape(item.owner)+'</span></div><div class="agenda-title">'+escape(item.title)+'</div></div>';
            }).join('');
            if(html!==lastAgenda){agendaPage.querySelector('.agenda-list').innerHTML=html;lastAgenda=html;}
            return items.length>0;
        }
        function rotate() {
            var pages=['family-weather'];if(energy)pages.push('energy');if(renderAgenda())pages.push('family-agenda');
            var key=pages.join('|'),now=Date.now();
            if(key!==activePages){activePages=key;pageIndex=0;pageSince=now;}
            if(now-pageSince>=(config.rotationSeconds || 20)*1000){pageIndex=(pageIndex+1)%pages.length;pageSince=now;}
            ['family-weather','energy','family-agenda'].forEach(function(name){panel.querySelector('.'+name).hidden=pages[pageIndex]!==name;});
            panel.querySelector('.kiosk-pagination').innerHTML=pages.map(function(name,index){return '<i'+(index===pageIndex?' class="selected"':'')+'></i>';}).join('');
        }
        function avatar(person,index) {
            var source=attributes(person.entity).entity_picture, image=panel.querySelector('#kiosk-person-'+index+' img');
            if (!source || avatarSources[index]===source) return;
            avatarSources[index]=source;
            function show(url) {
                image.onload=function(){image.hidden=false;image.parentNode.querySelector('.person-initial').hidden=true;if(avatarObjects[index])URL.revokeObjectURL(avatarObjects[index]);avatarObjects[index]=/^blob:/.test(url)?url:null;};
                image.src=url;
            }
            if (/^https?:/i.test(source) && source.indexOf(ha.url+'/')!==0) {show(source);return;}
            options.getToken(function(token){
                var request=new XMLHttpRequest();request.open('GET',/^https?:/i.test(source)?source:ha.url+source,true);request.responseType='blob';request.timeout=10000;
                request.setRequestHeader('Authorization','Bearer '+token);
                request.onload=function(){if(request.status===200)show(URL.createObjectURL(request.response));};request.onerror=function(){};request.send();
            },function(){});
        }
        function renderStatus() {
            cards.forEach(function(card,index){
                var node=ribbon.querySelector('#kiosk-status-'+index), value=state(card.entity), data=attributes(card.entity), tone='normal', label;
                if (!valid(value)) {tone='warning';label='UNAVAILABLE';}
                else if(card.mode==='climate') {
                    var current=number(data.current_temperature),target=number(data.temperature),humidity=number(state(card.humidityEntity));
                    var active=card.coolingEntity ? state(card.coolingEntity)==='on' : ['cooling','heating','drying','fan'].indexOf(data.hvac_action)>=0;
                    tone=active?'active':'normal';
                    label=(current===null?'--':Math.round(current))+'° / '+(target===null?'--':Math.round(target))+'°'+(humidity===null?'':' · '+Math.round(humidity)+'%');
                } else {
                    if ((card.alertStates || []).indexOf(value)>=0) tone='alert';
                    else if ((card.warningStates || []).indexOf(value)>=0) tone='warning';
                    else if ((card.normalStates || []).indexOf(value)<0) tone='active';
                    label=card.labels && card.labels[value] || String(value).replace(/_/g,' ').toUpperCase();
                }
                node.className='kiosk-status-card '+tone;node.querySelector('.status-value').textContent=label;
            });
        }
        function renderPeople() {
            var away=[];
            people.forEach(function(person,index){
                var value=state(person.entity),node=panel.querySelector('#kiosk-person-'+index),home=(person.homeStates || ['home']).indexOf(value)>=0;
                node.className='kiosk-person '+(!valid(value)?'unknown':home?'home':'away');
                node.querySelector('.person-state').textContent=!valid(value)?'Unknown':home?'Home':'Away';
                avatar(person,index);
                if(person.showLocation && valid(value) && !home) {
                    var location=state(person.locationEntity), locationState=states[person.locationEntity] || states[person.entity];
                    if (!valid(location)) location=value==='not_home'?'Away from home':value;
                    var sinceMatch=location.match(/\s*\(since\s+([^)]+)\)\s*$/i);
                    location=location.replace(/\s*\(since\s+[^)]+\)\s*$/i,'').trim();
                    var changed=locationState && new Date(locationState.last_changed), since=sinceMatch?sinceMatch[1]:changed && isFinite(changed.getTime())?changed.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'}):'';
                    away.push('<div class="info-away-card"><div class="away-name">'+escape(person.name)+'</div><div class="away-location">'+escape(location)+'</div><div class="away-since">'+escape(since?'Since '+since:'Away from home')+'</div></div>');
                }
            });
            var html=away.slice(0,2).join('');
            if(html!==lastAway){panel.querySelector('.info-away-list').innerHTML=html;lastAway=html;}
        }
        function renderForecast() {
            var data=attributes(weather),condition=state(weather),temperature=number(data.temperature),humidity=number(data.humidity),feels=number(data.apparent_temperature);
            panel.querySelector('.weather-condition').textContent=valid(condition)?condition.replace(/-/g,' ').replace(/_/g,' '):'Weather unavailable';
            panel.querySelector('.weather-temperature').textContent=(temperature===null?'--':Math.round(temperature))+'°';
            panel.querySelector('.weather-context').textContent=(feels===null?'':'Feels like '+Math.round(feels)+'° · ')+(humidity===null?'':'Humidity '+Math.round(humidity)+'%');
            panel.querySelector('.weather-symbol').textContent=weatherIcon(condition);
            var key=JSON.stringify(forecasts);
            if(key===lastForecast)return;lastForecast=key;
            var days=forecasts.slice(0,3).map(function(day,index){
                var when=new Date(day.datetime), name=when.toDateString()===new Date().toDateString()?'Today':when.toLocaleDateString('en-US',{weekday:'short'});
                var high=number(day.temperature),low=number(day.templow),rain=number(day.precipitation_probability);
                return '<div class="forecast-day"><div class="forecast-name">'+escape(name)+'</div><div class="forecast-icon">'+weatherIcon(day.condition)+'</div><div class="forecast-temperature">'+(high===null?'--':Math.round(high))+'° <span>'+(low===null?'':Math.round(low)+'°')+'</span></div><div class="forecast-rain">'+(rain===null?'':Math.round(rain)+'% rain')+'</div></div>';
            }).join('');
            panel.querySelector('.forecast-days').innerHTML=days || 'Forecast temporarily unavailable';
        }
        function total(rows,id) {
            if(!id || !rows[id])return null;
            var now=Date.now(),current=rows[id].filter(function(row){return row.start<=now && row.end>now;});
            if(!current.length)return null;
            return number(current[current.length-1].change);
        }
        function readEnergy() {
            if(!client || !energy || !connected || Date.now()-lastEnergyAt<300000)return;
            lastEnergyAt=Date.now();
            var ids=Object.keys(energy).map(function(key){return energy[key];}).filter(function(id){return typeof id==='string' && id.indexOf('.')>0;});
            client.call('recorder/statistics_during_period',{start_time:new Date(Date.now()-36*3600000).toISOString(),end_time:new Date().toISOString(),statistic_ids:ids,period:'day',types:['change']},function(ok,rows){
                if(!ok){lastEnergyAt=Date.now()-285000;return;}
                var values={solar:total(rows,energy.solar),gridImport:total(rows,energy.gridImport),gridExport:total(rows,energy.gridExport),batteryCharge:total(rows,energy.batteryCharge),batteryDischarge:total(rows,energy.batteryDischarge),water:total(rows,energy.water)};
                values.home=[values.solar,values.gridImport,values.gridExport,values.batteryCharge,values.batteryDischarge].some(function(value){return value===null;})?null:Math.max(0,values.solar+values.gridImport-values.gridExport-values.batteryCharge+values.batteryDischarge);
                energyValues=values;drawEnergy();
            });
        }
        function drawEnergy() {
            if(!energyValues)return;
            var key=JSON.stringify(energyValues);if(key===lastEnergy)return;lastEnergy=key;
            function value(number,precision){return number===null?'--':number.toFixed(precision==null?1:precision);}
            function label(x,y,kind,valueText,color,detail){return '<g transform="translate('+x+' '+y+')"><text class="energy-label" y="-6">'+escape(kind)+'</text><text class="energy-value" y="43" style="fill:'+color+'">'+escape(valueText)+'</text>'+(detail?'<text class="energy-unit" y="78">'+escape(detail)+'</text>':'')+'</g>';}
            function line(id,d,color,amount){return '<path id="'+id+'" d="'+d+'" fill="none" stroke="'+color+'" stroke-width="2.5" opacity=".65"/>'+(amount>0?'<circle r="5" fill="'+color+'"><animateMotion dur="6s" repeatCount="indefinite" path="'+d+'"/></circle>':'');}
            var v=energyValues;
            var svg='<svg class="energy-diagram" viewBox="0 0 560 420" role="img" aria-label="Today’s energy'+(energy.water?' and water':'')+' distribution">';
            svg+=line('solar-flow','M280 90 V154','#e9c77c',v.solar);
            svg+=line('grid-in','M126 202 H224','#91b9ef',v.gridImport);
            svg+=line('grid-out','M224 220 H126','#ad89ed',v.gridExport);
            svg+=line('battery-in','M336 202 H434','#f27bb4',v.batteryCharge);
            svg+=line('battery-out','M434 220 H336','#83ceae',v.batteryDischarge);
            if(energy.water)svg+=line('water-flow','M475 122 Q380 122 325 176','#6ac9df',v.water);
            svg+='<circle cx="280" cy="210" r="56" fill="#1d3038" stroke="#44646c" stroke-width="2"/>';
            svg+=label(280,35,'SOLAR',value(v.solar),'#e9c77c','');
            svg+=label(280,195,'HOME',value(v.home),'#eff4f5','');
            if(energy.water)svg+='<g class="energy-water">'+label(475,35,'WATER',value(v.water,0),'#6ac9df',energy.waterUnit || 'gal')+'</g>';
            svg+=label(77,160,'GRID',value(v.gridImport),'#91b9ef','imported');
            svg+=label(475,160,'BATTERY',value(v.batteryCharge),'#83ceae','charged');
            svg+=label(77,295,'',value(v.gridExport),'#ad89ed','exported');
            svg+=label(475,295,'',value(v.batteryDischarge),'#83ceae','discharged');
            svg+='</svg><div class="energy-caption">Daily totals · since midnight</div>';
            panel.querySelector('.energy-body').innerHTML=svg;
        }
        this.dependencies=function(){
            var ids=[];cards.forEach(function(card){ids.push(card.entity);if(card.humidityEntity)ids.push(card.humidityEntity);if(card.coolingEntity)ids.push(card.coolingEntity);});
            people.forEach(function(person){ids.push(person.entity);if(person.locationEntity)ids.push(person.locationEntity);});if(weather)ids.push(weather);
            if(agenda){ids.push(agenda.entity);ids=ids.concat(agenda.hideWhenEntities || []);}return ids;
        };
        this.bind=function(connection){
            client=connection;
            if(weather)client.subscribe('weather/subscribe_forecast',{entity_id:weather,forecast_type:'daily'},function(event){forecasts=event.forecast || [];renderForecast();});
        };
        this.render=function(next){
            states=next;renderStatus();renderPeople();renderForecast();readEnergy();
            rotate();
        };
        this.setConnected=function(value){connected=value;if(value)lastEnergyAt=0;rotate();};
    }
    root.HavenKioskInformation=Information;
}(window));

/* Configurable Haven camera kiosk. Household mappings live in shell-config.js.
 * Optional notification adapters return {items, dependencies}; no credentials in this file.
 * Passive ES5 display: refreshed camera wall, one native live decoder for HA events.
 */
(function () {
    'use strict';
    var H = window.Haven, cfg = H.kiosk ? H.kiosk() : {}, ha = H.ha();
    var cameras = (cfg.cameras || []).slice(0,4), states = {}, client = null, connected = false;
    var feed = null, information = null, current = '';
    var generation = 0, playerTimer = null, snapshotTimer = null, avActive = false;
    var lastThumbs = 0, lastFeedCheck = 0, feedText = '', reconnectPlayback = false;
    var stage = document.getElementById('stage');
    function el(id) { return document.getElementById(id); }
    function text(id, value) { el(id).textContent = value || ''; }
    function state(id) { return states[id] ? states[id].state : ''; }
    function script(url, done) {
        var node = document.createElement('script'); node.src = url;
        node.onload = function () { done(true); }; node.onerror = function () { done(false); };
        document.head.appendChild(node);
    }
    function absolute(url) { return /^https?:/i.test(url) ? url : ha.url + url; }
    function snapshotUrl(id) {
        var camera = states[id], url = camera && camera.attributes.entity_picture;
        return url ? absolute(url) + (url.indexOf('?') < 0 ? '?' : '&') + 't=' + Date.now() : '';
    }
    function setConnection(ok, message) {
        if (ok && !connected) reconnectPlayback = true;
        connected = ok; el('kiosk-connection').hidden = ok;
        if (information) information.setConnected(ok);
        text('kiosk-connection', message || 'Connecting to Home Assistant');
        if (!ok) { reconnectPlayback = true; stopPlayback(); current = ''; }
    }
    stage.innerHTML = '<main id="kiosk"><div id="kiosk-connection">Connecting to Home Assistant</div>' +
        '<section id="kiosk-status"></section><section id="kiosk-cameras"><div id="kiosk-visual"><div id="kiosk-wall"></div>' +
        '<div id="kiosk-main" class="kiosk-camera" hidden><img id="kiosk-snapshot" alt="Active household camera"><video id="kiosk-video" autoplay muted playsinline hidden></video>' +
        '<span id="kiosk-live" role="status" hidden>CONNECTING</span></div></div><aside id="kiosk-info"></aside></section>' +
        '<section id="kiosk-notice"><div id="kiosk-kicker">HOUSEHOLD</div><div id="kiosk-notice-title">Loading household information</div><div id="kiosk-notice-detail"></div></section></main>';
    cameras.forEach(function (camera, index) {
        var node = document.createElement('div'); node.className = 'kiosk-camera';
        var image = document.createElement('img'); image.id = 'kiosk-wall-image-' + index; image.alt = camera.name || 'Household camera';
        node.appendChild(image); el('kiosk-wall').appendChild(node);
    });
    function roots() {
        var ids = cameras.map(function (camera) { return camera.entity; });
        if (cfg.weatherEntity) ids.push(cfg.weatherEntity);
        if (cfg.notificationEntity) ids.push(cfg.notificationEntity);
        if (cfg.events && cfg.events.entity) ids.push(cfg.events.entity);
        if (information) ids = ids.concat(information.dependencies());
        if (feed && Array.isArray(feed.dependencies)) ids = ids.concat(feed.dependencies);
        if (cfg.events && cfg.events.views) Object.keys(cfg.events.views).forEach(function (key) { ids.push(cfg.events.views[key].entity); });
        return ids;
    }
    function adoptFeed(code) {
        try {
            (0, eval)(code);
            var candidate = window[cfg.feedGlobal || 'HavenKioskAmbient'];
            if (!candidate || typeof candidate.build !== 'function') return;
            feed = candidate; feedText = code; H.set('kioskFeed', code);
            if (client) client.setEntities(roots());
        } catch (error) { /* Keep the last valid adapter and camera layout. */ }
    }
    function checkFeed() {
        if (!cfg.feedUrl || document.hidden || Date.now()-lastFeedCheck < 60000) return;
        lastFeedCheck = Date.now();
        H.fetchText(absolute(cfg.feedUrl) + '?t=' + lastFeedCheck, 6000, function (code) { if (code !== feedText) adoptFeed(code); }, function () {});
    }
    var cachedFeed = H.get('kioskFeed', '');
    if (cachedFeed) adoptFeed(cachedFeed);
    checkFeed();
    function setAvMode(on) {
        avActive = on;
        document.documentElement.style.background = on ? 'transparent' : '#000';
        document.body.style.background = on ? 'transparent' : '#000';
        el('kiosk').className = on ? 'avplay-on' : '';
        // The native video plane must not share its letterbox area with a still.
        // An inline visibility value otherwise overrides the AVPlay stylesheet.
        if (on) el('kiosk-snapshot').style.visibility = 'hidden';
    }
    function stopPlayback() {
        generation++; clearTimeout(playerTimer); clearInterval(snapshotTimer); snapshotTimer = null;
        var video = el('kiosk-video'); video.onplaying = video.onerror = null;
        try { video.pause(); video.removeAttribute('src'); video.load(); } catch (error) {}
        video.hidden = true;
        if (avActive) closeNativePlayer();
        setAvMode(false);
        var snapshot = el('kiosk-snapshot');
        snapshot.onload = snapshot.onerror = null;
        snapshot.style.visibility = 'hidden'; snapshot.removeAttribute('src');
    }
    function avRect() {
        return [24,140,1240,708];
    }
    function closeNativePlayer() {
        // stop() can reject while preparing; close() must still release the decoder.
        try {window.webapis.avplay.stop();} catch (error) {}
        try {window.webapis.avplay.close();} catch (error) {}
    }
    function refreshMainSnapshot() {
        var url = snapshotUrl(current), snapshot = el('kiosk-snapshot'), token = generation;
        if (!url) return;
        snapshot.onload = function () {
            // A late still must never cover either live player or a newer event.
            if (token === generation && !avActive && el('kiosk-live').textContent !== 'LIVE') {
                snapshot.style.visibility = 'visible';
            }
        };
        snapshot.onerror = function () {
            if (token === generation) snapshot.style.visibility = 'hidden';
        };
        snapshot.src = url;
    }
    function useSnapshots(token) {
        if (token !== generation) return;
        if (avActive) closeNativePlayer();
        clearTimeout(playerTimer); clearInterval(snapshotTimer); setAvMode(false); el('kiosk-video').hidden = true;
        el('kiosk-snapshot').style.visibility = 'hidden'; text('kiosk-live','SNAPSHOTS');
        refreshMainSnapshot(); snapshotTimer = setInterval(refreshMainSnapshot, 3000);
    }
    function tryAvplay(url, token) {
        var av = window.webapis && window.webapis.avplay;
        if (!av || token !== generation) { useSnapshots(token); return; }
        el('kiosk-video').hidden = true;
        if (!el('kiosk-avplayer')) {
            var object = document.createElement('object'); object.id = 'kiosk-avplayer'; object.type = 'application/avplayer';
            el('kiosk-main').insertBefore(object, el('kiosk-main').firstChild);
        }
        try {
            setAvMode(true); av.open(url); av.setDisplayRect.apply(av, avRect());
            av.setDisplayMethod('PLAYER_DISPLAY_MODE_LETTER_BOX');
            av.setListener({onerror:function () {useSnapshots(token);}});
            playerTimer = setTimeout(function () {useSnapshots(token);},20000);
            av.prepareAsync(function () {
                if (token !== generation) return;
                clearTimeout(playerTimer); av.play(); text('kiosk-live','LIVE');
            },function () {useSnapshots(token);});
        } catch (error) { useSnapshots(token); }
    }
    function play(id) {
        if (current === id && !reconnectPlayback) return;
        stopPlayback(); current = id; reconnectPlayback = false;
        text('kiosk-live','CONNECTING'); refreshMainSnapshot();
        if (!connected || !client) return;
        var token = generation;
        client.call('camera/stream',{entity_id:id,format:'hls'},function (ok,result) {
            if (token !== generation || document.hidden) return;
            if (!ok || !result || !result.url) { useSnapshots(token); return; }
            var url = absolute(result.url), video = el('kiosk-video'), settled = false;
            // Some TVs advance HTML video and emit playing while the embedded plane stays blank.
            // AVPlay gives the main panel an explicit native rectangle on Samsung hardware.
            if (H.isTV && window.webapis && window.webapis.avplay) { tryAvplay(url,token); return; }
            function fail() {
                if (settled || token !== generation) return;
                settled = true; clearTimeout(playerTimer); video.onplaying = video.onerror = null;
                try {video.pause(); video.removeAttribute('src'); video.load();} catch(error) {}
                tryAvplay(url,token);
            }
            video.hidden = false;
            video.onplaying = function () {
                if (token !== generation) return;
                settled = true; clearTimeout(playerTimer); el('kiosk-snapshot').style.visibility = 'hidden'; text('kiosk-live','LIVE');
            };
            video.onerror = fail; playerTimer = setTimeout(fail,20000); video.src = url;
            var promise = video.play(); if (promise && promise.catch) promise.catch(fail);
        });
    }
    function render() {
        if (document.hidden) return;
        var root = el('kiosk'), eventCamera = cfg.events && cfg.events.views && cfg.events.views[state(cfg.events.entity)];
        el('kiosk-main').hidden = !eventCamera; el('kiosk-wall').hidden = !!eventCamera;
        if (eventCamera) play(eventCamera.entity);
        else if (current) {stopPlayback(); current = '';}
        if (information) information.render(states);
        // Optional shared theme adapter; keep status/notice colors and native video intact.
        var seasonal = !eventCamera && feed && typeof feed.seasonal === 'function'
            ? feed.seasonal(states) : {mode:'standard',wash:'none',edge:'none'};
        root.setAttribute('data-seasonal-theme',seasonal.mode);
        el('kiosk-status').style.backgroundImage = seasonal.wash;
        el('kiosk-status').style.boxShadow = seasonal.edge;
        el('kiosk-notice').style.backgroundImage = seasonal.wash;
        el('kiosk-notice').style.boxShadow = seasonal.edge;
        el('kiosk-notice').style.backgroundImage = seasonal.art ? 'url("' + absolute(seasonal.art) + '"),' + seasonal.wash : 'none';
        el('kiosk-notice').style.backgroundPosition = 'right 28px center, center';
        el('kiosk-notice').style.backgroundSize = '196px 112px, cover';
        el('kiosk-notice').style.backgroundRepeat = 'no-repeat';
        el('kiosk-notice').style.paddingRight = seasonal.art ? '246px' : '30px';
        var notices = feed ? feed.build(states,new Date()).items : null;
        if (!notices && cfg.notificationEntity && states[cfg.notificationEntity]) {
            var entity = states[cfg.notificationEntity]; notices = entity.attributes.items || [{title:entity.state,detail:entity.attributes.detail}];
        }
        if (!notices || !notices.length) notices = [{kicker:'HOUSEHOLD',title:'Everything is handled',detail:''}];
        var notice = notices[Math.floor(Date.now()/10000)%notices.length];
        el('kiosk-notice-title').style.fontSize = String(notice.title || '').length > 75 ? '39px' : String(notice.title || '').length > 55 ? '43px' : '49px';
        el('kiosk-notice').className = String(notice.title || '').length > 75 ? 'long-title' : '';
        text('kiosk-kicker',notice.kicker || 'HOUSEHOLD'); text('kiosk-notice-title',notice.title); text('kiosk-notice-detail',notice.detail || notice.message);
        root.style.setProperty('--notice-accent',/^#[0-9a-f]{6}$/i.test(notice.accent || '') ? notice.accent : '#56b6ee');
        if (Date.now()-lastThumbs > 5000) {
            lastThumbs = Date.now(); if (!eventCamera) cameras.forEach(function (item,index) {
                var url = snapshotUrl(item.entity); if (url) el('kiosk-wall-image-'+index).src = url;
            });
        }
    }
    function startClient() {
        if (window.HavenKioskInformation) information = new window.HavenKioskInformation({config:cfg.information,ha:ha,weatherEntity:cfg.weatherEntity,
            getToken:function(done,failed){if(H.accessToken)H.accessToken(done,failed);else done(ha.token);},statusRoot:el('kiosk-status'),panelRoot:el('kiosk-info')});
        client = new window.HavenKioskClient({url:ha.url,entities:roots(),
            getToken:function (done,failed,force) {
                if (H.accessToken) H.accessToken(done,failed,force); else done(ha.token);
            },
            onStates:function (next) {states=next; render();},onStatus:setConnection});
        if (information) information.bind(client);
        client.start();
    }
    function loadClient() {
        if (window.HavenKioskClient) startClient();
        else script(cfg.clientUrl ? absolute(cfg.clientUrl) : 'kiosk/client.js',function (ok) {
            if (ok && window.HavenKioskClient) startClient(); else text('kiosk-connection','Camera kiosk connection module unavailable');
        });
    }
    if (window.HavenKioskInformation) loadClient();
    else script('kiosk/information.js',loadClient);
    document.addEventListener('visibilitychange',function () {
        if (document.hidden) {stopPlayback(); current=''; if(client) client.stop();}
        else {if(client) client.start(); lastThumbs=0; checkFeed(); render();}
    });
    H.isIdle = function () {return !current;};
    H.ready(); render(); setInterval(function () {render(); checkFeed();},1000);
}());
