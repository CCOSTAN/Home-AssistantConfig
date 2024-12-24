import{_ as e,n as t,t as n,a as i,cL as a,x as r,l,cP as s,cW as c,r as o,db as p}from"./card-e5d55e5b.js";let u=class extends i{constructor(){super(...arguments),this._refInput=a()}get value(){return this._refInput.value?.value?new Date(this._refInput.value.value):null}reset(){this._refInput.value&&(this._refInput.value.value="")}render(){const e=()=>{const e=this._refInput.value?.value;p(this,"date-picker:change",{date:e?new Date(e):null})};return r`<input
        aria-label="${l("timeline.select_date")}"
        title="${l("timeline.select_date")}"
        ${s(this._refInput)}
        type="datetime-local"
        @input=${()=>e()}
        @change=${()=>e()}
      />
      <frigate-card-icon
        aria-label="${l("timeline.select_date")}"
        title="${l("timeline.select_date")}"
        .icon=${{icon:this.icon??"mdi:calendar-search"}}
        @click=${e=>{c(e),this._refInput.value?.showPicker()}}
      >
      </frigate-card-icon>`}static get styles(){return o(":host {\n  display: inline-block;\n  position: relative;\n  width: var(--mdc-icon-size, 24px);\n  height: var(--mdc-icon-size, 24px);\n}\n\ninput {\n  display: block;\n  height: 100%;\n  width: 100%;\n  position: absolute;\n  padding: 0px;\n  border: 0px;\n}\n\n/**\n * Hack warning: Safari on iOS does not support showPicker with\n * datetime-local:\n * https://caniuse.com/mdn-api_htmlinputelement_showpicker_datetime_local_input\n *\n * The hack is to render the input element in front of the icon, with an\n * opacity of 0. This only works if the underlying input element accepts the\n * click at the exact place the user happens to click. From trial and error,\n * this seems to work better than expected / quite reliably, but had the user\n * manually changed icon sizes with Safari iOS their experience may vary.\n */\n@supports (-webkit-touch-callout: none) {\n  input {\n    opacity: 0;\n    z-index: 1;\n  }\n}\n@supports not (-webkit-touch-callout: none) {\n  input {\n    visibility: hidden;\n  }\n}\nfrigate-card-icon {\n  display: block;\n  height: 100%;\n  width: 100%;\n  position: absolute;\n}")}};e([t({attribute:!1})],u.prototype,"icon",void 0),u=e([n("frigate-card-date-picker")],u);export{u as F};
