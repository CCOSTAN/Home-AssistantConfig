import{e7 as e,e3 as t,e2 as a,e1 as s,e8 as i,c$ as n,e5 as r,e6 as o,dM as c,e9 as d,ea as m,eb as l,d7 as h,d9 as u}from"./card-e5d55e5b.js";import{B as y,a as g,g as p,i as _}from"./within-dates-446c6430.js";import{C as M}from"./engine-86b0096c.js";import{p as f}from"./parse-214d78af.js";import{e as C}from"./endOfDay-cfc9c86c.js";import"./engine-generic-93cdbee6.js";import"./media-c9012082.js";class w extends y{getProxyConfig(){return{...super.getProxyConfig(),media:"auto"===this._config.proxy.media||this._config.proxy.media}}}class D{static isMotionEyeEventQueryResults(e){return e.engine===t.MotionEye&&e.type===o.Event}}const E={"%Y":"yyyy","%m":"MM","%d":"dd","%H":"HH","%M":"mm","%S":"ss"},v=new RegExp(/(%Y|%m|%d|%H|%M|%S)/g);class x extends g{constructor(){super(...arguments),this._directoryCache=new e,this._fileCache=new e}getEngineType(){return t.MotionEye}async createCamera(e,t){const i=new w(t,this,{capabilities:new a({"favorite-events":!1,"favorite-recordings":!1,clips:!0,live:!0,menu:!0,recordings:!1,seek:!1,snapshots:!0,substream:!0,ptz:s(t)??void 0},{disable:t.capabilities?.disable,disableExcept:t.capabilities?.disable_except}),eventCallback:this._eventCallback});return await i.initialize({entityRegistryManager:this._entityRegistryManager,hass:e,stateWatcher:this._stateWatcher})}_convertMotionEyeTimeFormatToDateFNS(e){return e.replace(v,((e,t)=>E[t]))}_motionEyeMetadataGeneratorFile(e,t,a,s){let n=s?._metadata?.startDate??new Date;if(t){const e=a.title.replace(/\.[^/.]+$/,"");if(n=f(e,t,n),!i(n))return null}return{cameraID:e,startDate:n,endDate:n}}_motionEyeMetadataGeneratorDirectory(e,t,a,s){let r=s?._metadata?.startDate??new Date;if(t){const e=f(a.title,t,r);if(!i(e))return null;r=n(e)}return{cameraID:e,startDate:r,endDate:s?._metadata?.endDate??C(r)}}async _getMatchingDirectories(e,t,a,s,i){const n=t.getCamera(a),r=n?.getConfig();if(!(n instanceof y&&r))return null;const o=n.getEntity(),c=o?.config_entry_id,d=o?.device_id;if(!c||!d)return null;const m=(e,t)=>{const i=e.shift();if(!i)return[];const n=i.includes("%")?this._convertMotionEyeTimeFormatToDateFNS(i):null;return[{targets:t,metadataGenerator:(e,t)=>this._motionEyeMetadataGeneratorDirectory(a,n,e,t),matcher:e=>e.can_expand&&(!!n||e.title===i)&&_(e,s?.start,s?.end),advance:t=>m(e,t)}]};return await this._browseMediaManager.walkBrowseMedias(e,[...!1===s?.hasClip||s?.hasSnapshot?[]:m(r.motioneye.movies.directory_pattern.split("/"),[`media-source://motioneye/${c}#${d}#movies`]),...!1===s?.hasSnapshot||s?.hasClip?[]:m(r.motioneye.images.directory_pattern.split("/"),[`media-source://motioneye/${c}#${d}#images`])],{...!1!==i?.useCache&&{cache:this._directoryCache}})}async getEvents(e,a,s,i){if(s.favorite||s.tags?.size||s.what?.size||s.where?.size)return null;const n=new Map,c=async r=>{const c={...s,cameraIDs:new Set([r])},d=i?.useCache??1?this._requestCache.get(c):null;if(d)return void n.set(c,d);const u=a.getCameraConfig(r);if(!u)return;const y=await this._getMatchingDirectories(e,a,r,c,i);if(!y||!y.length)return;const g=this._convertMotionEyeTimeFormatToDateFNS(u.motioneye.movies.file_pattern),p=this._convertMotionEyeTimeFormatToDateFNS(u.motioneye.images.file_pattern),f=c.limit??M,C=await this._browseMediaManager.walkBrowseMedias(e,[{targets:y,metadataGenerator:(e,t)=>e.media_class===m||e.media_class===l?this._motionEyeMetadataGeneratorFile(r,e.media_class===m?p:g,e,t):null,earlyExit:e=>e.length>=f,matcher:e=>!e.can_expand&&_(e,c.start,c.end)}],{...!1!==i?.useCache&&{cache:this._fileCache}}),w=h(C,(e=>e._metadata?.startDate),"desc").slice(0,c.limit??M),D={type:o.Event,engine:t.MotionEye,browseMedia:w};(i?.useCache??1)&&this._requestCache.set(c,{...D,cached:!0},D.expiry),n.set(c,D)};return await r(s.cameraIDs,(e=>c(e))),n.size?n:null}generateMediaFromEvents(e,t,a,s){return D.isMotionEyeEventQueryResults(s)?p(s.browseMedia):null}async getMediaMetadata(e,a,s,i){const n=new Map;if((i?.useCache??1)&&this._requestCache.has(s)){const e=this._requestCache.get(s);if(e)return n.set(s,e),n}const m=new Set,l=async t=>{const s=await this._getMatchingDirectories(e,a,t,null,i);for(const e of s??[])e._metadata&&m.add(u(e._metadata?.startDate))};await r(s.cameraIDs,(e=>l(e)));const h={type:o.MediaMetadata,engine:t.MotionEye,metadata:{...m.size&&{days:m}},expiry:c(new Date,{seconds:d}),cached:!1};return(i?.useCache??1)&&this._requestCache.set(s,{...h,cached:!0},h.expiry),n.set(s,h),n}getCameraMetadata(e,t){return{...super.getCameraMetadata(e,t),engineIcon:"motioneye"}}getCameraEndpoints(e,t){const a=e.motioneye?.url?{endpoint:e.motioneye.url}:null;return{...super.getCameraEndpoints(e,t),...a&&{ui:a}}}}export{x as MotionEyeCameraManagerEngine};