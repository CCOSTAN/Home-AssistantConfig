customElements.whenDefined('card-tools').then(() => {
var ct = customElements.get('card-tools');

const BUILTIN_ACTIONS = [
  {
    matches: '^((magnet:.*)|(.*\.torrent.*))$',
    name: 'Add to Transmission',
    icon: 'mdi:progress-download',
    service: 'transmission.add_torrent',
    service_data: {
      torrent: '{1}'
    },
  }
];

const matchAndReplace = (text, matches) => {
  for (var i = 0; i < matches.length; i++) {
    text = text.replace('{' + i + '}', matches[i]);
  }
  return text;
}

class SearchCard extends ct.LitElement {

  static get properties() {
    return {
      config: {},
      hass: {},
    };
  }

  setConfig(config) {
    this.results = [];
    this.config = config;

    this.active_actions = [];
    this.max_results = this.config.max_results || 10;
    
    this.search_text = this.config.search_text || "Type to search...";

    this.actions = BUILTIN_ACTIONS.concat(this.config.actions || []);

    this.included_domains = this.config.included_domains;
    this.excluded_domains = this.config.excluded_domains || [];
  }

  getCardSize() {
    return 4;
  }

  render() {
      var results = this.results.slice(0, this.max_results).sort();
      var rows = results.map((entity_id) => this._createResultRow(entity_id));
      var actions = this.active_actions.map((x) => this._createActionRow(x[0], x[1]));
      return ct.LitHtml `
      <ha-card>
        <div id="searchContainer">
          <div id="searchTextFieldContainer">
            <ha-textfield
              id="searchText"
              @input="${this._valueChanged}"
              no-label-float type="text" autocomplete="off"
              icon iconTrailing
              label="${this.search_text}"
            >
              <ha-icon icon="mdi:magnify" id="searchIcon" slot="leadingIcon"></ha-icon>
              <ha-icon-button
                slot="trailingIcon"
                @click="${this._clearInput}"
                alt="Clear"
                title="Clear"
              >
                <ha-icon icon="mdi:close"></ha-icon>
              </ha-icon-button>
            </ha-textfield>
          </div>

          ${results.length > 0 ?
              ct.LitHtml `<div id="count">Showing ${results.length} of ${this.results.length} results</div>`
            : ''}
        </div>
        ${(rows.length > 0 || actions.length > 0) ?
              ct.LitHtml `<div id="results">${actions}${rows}</div>`
            : ''}
      </ha-card>
    `;
  }

  _createResultRow(entity_id) {
    var row = ct.createEntityRow({entity: entity_id});
    row.addEventListener("click", () => ct.moreInfo(entity_id));
    row.hass = this.hass;
    return row;
  }


  _createActionRow(action, matches) {
    var service_data = action.service_data;
    for (var key in service_data) {
      service_data[key] = matchAndReplace(service_data[key], matches);
    }

    const elem = cardTools.createThing("service-row", {
      type: "call",
      name: matchAndReplace(action.name, matches),
      icon: action.icon || 'mdi:lamp',
      service: action.service,
      service_data: service_data,
    });
    elem.hass = this.hass;
    return elem;
  }


  _clearInput()
  {
    this.shadowRoot.getElementById('searchText').value = '';
    this._updateSearchResults('');
  }

  _valueChanged(ev) {
    var searchText = ev.target.value;
    this._updateSearchResults(searchText);
  }

  _updateSearchResults(searchText) {
    this.results = [];
    this.active_actions = [];

    if (!this.config || !this.hass || searchText === "") {
      this.update();
      return;
    }

    try {
      var searchRegex = new RegExp(searchText, 'i');
      for (var entity_id in this.hass.states) {
        if (
            (
              entity_id.search(searchRegex) >= 0 ||
              this.hass.states[entity_id].attributes.friendly_name?.search(searchRegex) >= 0
            ) 
            && 
            (
              this.included_domains 
                ? this.included_domains.includes(entity_id.split(".")[0])
                : !this.excluded_domains.includes(entity_id.split(".")[0])
            )
          ) {
          this.results.push(entity_id);
        }
      }
    } catch (err) {
      console.warn(err);
    }

    this.active_actions = this._getActivatedActions(searchText);

    this.update();
  }

  _getActivatedActions(searchText) {
    var active = [];

    for (const action of this.actions) {
      if (this._serviceExists(action.service)) {
        var matches = searchText.match(action.matches);
        if (matches != null) {
          active.push([action, matches]);
        }
      }
    }
    return active;
  }

  _serviceExists(serviceCall) {
      var [domain, service] = serviceCall.split('.');
      var servicesForDomain = this.hass.services[domain];
      return servicesForDomain && service in servicesForDomain;
  }

  static get styles() {
    return ct.LitCSS `
      #searchContainer {
        width: 90%;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
      #searchTextFieldContainer {
        display: flex;
        padding-top: 5px;
        padding-bottom: 5px;
      }
      #searchText {
        flex-grow: 1;
      }
      #count {
        text-align: right;
        font-style: italic;
      }
      #results {
        width: 90%;
        display: block;
        padding-bottom: 15px;
        margin-top: 15px;
        margin-left: auto;
        margin-right: auto;
      }
    `;
  }
}

customElements.define('search-card', SearchCard);

});

setTimeout(() => {
  if(customElements.get('card-tools')) return;
  customElements.define('search-card', class extends HTMLElement{
    setConfig() { throw new Error("Can't find card-tools. See https://github.com/thomasloven/lovelace-card-tools");}
  });
}, 2000);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "search-card",
  name: "Search Card",
  preview: true,
  description: "Card to search entities"
});