/*
    Floorplan for Home Assistant
    Version: 1.0.7.42
    By Petar Kozul
    https://github.com/pkozul/ha-floorplan
*/

'use strict';

if (typeof window.Floorplan !== 'function') {
  class Floorplan {
    constructor() {
      this.version = '1.0.7.42';
      this.doc = {};
      this.hass = {};
      this.openMoreInfo = () => { };
      this.setIsLoading = () => { };
      this._config = {};
      this.config = {};
      this.timeDifference = undefined;
      this.pageInfos = [];
      this.entityInfos = [];
      this.elementInfos = [];
      this.cssRules = [];
      this.entityTransitions = {};
      this.lastMotionConfig = {};
      this.logLevels = [];
      this.handleEntitiesDebounced = {};
      this.variables = [];

      this.setIsLoading(true);
    }

    hassChanged(newHass, oldHass) {
      this.hass = newHass;

      if (!this.config) {
        return;
      }

      this.handleEntitiesDebounced(); // use debounced wrapper
    }

    /***************************************************************************************************************************/
    /* Startup
    /***************************************************************************************************************************/

    init(doc, hass, openMoreInfo, setIsLoading, _config, config) {
      this.doc = doc;
      this.hass = hass;
      this.openMoreInfo = openMoreInfo;
      this.setIsLoading = setIsLoading;
      this._config = _config;
      this.config = config;

      window.onerror = this.handleWindowError.bind(this);

      this.handleEntitiesDebounced = this.debounce(() => {
        return this.handleEntities();
      }, 100);

      this.initTimeDifference();

      return ((this._config && this._config.config) ? this.loadConfig(this._config.config) : Promise.resolve(this._config))
        .then(config => {
          this.config = config;

          this.getLogLevels();
          this.logInfo('VERSION', `Floorplan v${this.version}`);

          if (!this.validateConfig(this.config)) {
            this.setIsLoading(false);
            return Promise.resolve();
          }

          return this.loadLibraries()
            .then(() => {
              this.initFullyKiosk();
              return this.config.pages ? this.initMultiPage() : this.initStandard();
            });
        })
        .catch(error => {
          this.setIsLoading(false);
          this.handleError(error);
        });
    }

    initMultiPage() {
      return this.loadPages()
        .then(() => {
          this.setIsLoading(false);
          this.initPageDisplay();
          this.initStartupActions();
          return this.handleEntities(true);
        });
    }

    initStandard() {
      return this.loadFloorplanSvg(this.config.image)
        .then((svg) => {
          this.config.svg = svg;
          return this.loadStyleSheet(this.config.stylesheet)
            .then(() => {
              return Promise.resolve(this.initFloorplan(svg, this.config))
                .then(() => {
                  this.setIsLoading(false);
                  this.initPageDisplay();
                  this.initStartupActions();
                  return this.handleEntities(true);
                })
            });
        });
    }

    getLogLevels() {
      if (!this.config.log_level) {
        return;
      }

      let allLogLevels = {
        error: ['error'],
        warning: ['error', 'warning'],
        info: ['error', 'warning', 'info'],
        debug: ['error', 'warning', 'info', 'debug'],
      };

      this.logLevels = allLogLevels[this.config.log_level.toLowerCase()];
    }

    /***************************************************************************************************************************/
    /* Loading resources
    /***************************************************************************************************************************/

    loadConfig(configUrl) {
      return this.getResource(configUrl, false)
        .then(config => {
          return Promise.resolve(YAML.parse(config));
        });
    }

    loadLibraries() {
      let promises = [];

      if (this.isOptionEnabled(this.config.pan_zoom)) {
        promises.push(this.loadScript('/local/custom_ui/floorplan/lib/svg-pan-zoom.min.js'));
      }

      if (this.isOptionEnabled(this.config.fully_kiosk)) {
        promises.push(this.loadScript('/local/custom_ui/floorplan/lib/fully-kiosk.js'));
      }

      return promises.length ? Promise.all(promises) : Promise.resolve();
    }

    loadScript(scriptUrl) {
      return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.src = this.cacheBuster(scriptUrl);
        script.onload = () => {
          return resolve();
        };
        script.onerror = (err) => {
          reject(new URIError(`${err.target.src}`));
        };

        this.doc.appendChild(script);
      });
    }

    loadPages() {
      let defaultPageConfigUrl = this.config.pages.length ? this.config.pages[0] : undefined; // default page

      let promises = this.config.pages.map(pageConfigUrl =>
        this.loadPage(pageConfigUrl, (pageConfigUrl === defaultPageConfigUrl)));
      return promises.length ? Promise.all(promises) : Promise.resolve([]);
    }

    loadPage(pageConfigUrl, isDefault) {
      return this.loadConfig(pageConfigUrl)
        .then((pageConfig) => {
          let pageInfo = this.createPageInfo(pageConfig);
          pageInfo.isDefault = isDefault;
          return this.loadFloorplanSvg(pageInfo.config.image)
            .then((svg) => {
              pageInfo.svg = svg;
              return this.loadStyleSheet(pageInfo.config.stylesheet)
                .then(() => {
                  return this.initFloorplan(pageInfo.svg, pageInfo.config);
                });
            });
        });
    }

    createPageInfo(pageConfig, isDefault) {
      let pageInfo = { config: pageConfig };

      // Merge the page's rules with the main config's rules
      if (pageInfo.config.rules && this.config.rules) {
        pageInfo.config.rules = pageInfo.config.rules.concat(this.config.rules);
      }

      this.pageInfos[pageInfo.config.page_id] = pageInfo;

      return pageInfo;
    }

    loadStyleSheet(stylesheetUrl) {
      return new Promise((resolve, reject) => {
        if (!stylesheetUrl) {
          return resolve();
        }

        this.loadStyleSheetInternal(stylesheetUrl, function (success, link) {
          if (success && link && link.sheet && link.sheet.cssRules) {
            this.instance.doc.appendChild(link);
            let styleSheet = link.sheet;
            this.instance.cssRules = this.instance.cssRules.concat(this.instance.getArray(styleSheet.cssRules));
            return this.resolve();
          }
          else {
            reject(new URIError(`${stylesheetUrl}`));
          }
        }.bind({ instance: this, resolve: resolve, reject: reject }));
      });
    }

    loadFloorplanSvg(imageUrl) {
      return this.getResource(imageUrl, true)
        .then(result => {
          let svg = $(result).find('svg')[0];

          $(svg).height('100%');
          $(svg).width('100%');
          $(svg).css('position', this.isPanel ? 'absolute' : 'relative');
          $(svg).css('cursor', 'default');
          $(svg).css('opacity', 0);

          $(this.doc).find('#floorplan').append(svg);

          // Enable pan / zoom if enabled in config
          if (this.isOptionEnabled(this.config.pan_zoom)) {
            svgPanZoom($(svg)[0], {
              zoomEnabled: true,
              controlIconsEnabled: true,
              fit: true,
              center: true,
            });
          }

          return Promise.resolve(svg);
        });
    }

    loadImage(imageUrl, svgElementInfo, entityId, rule) {
      if (imageUrl.toLowerCase().indexOf('.svg') >= 0) {
        return this.loadSvgImage(imageUrl, svgElementInfo, entityId, rule);
      }
      else {
        return this.loadBitmapImage(imageUrl, svgElementInfo, entityId, rule);
      }
    }

    loadBitmapImage(imageUrl, svgElementInfo, entityId, rule) {
      return this.getResource(imageUrl, false, true)
        .then(imageData => {
          let svgElement = svgElementInfo.svgElement; // assume the target element already exists

          if (!$(svgElement).is('image')) {
            svgElement = this.createImageElement(svgElementInfo.originalSvgElement);

            $(svgElement).append(document.createElementNS('http://www.w3.org/2000/svg', 'title'))
              .off('click')
              .on('click', this.onEntityClick.bind({ instance: this, svgElementInfo: svgElementInfo, entityId: entityId, rule: rule }))
              .css('cursor', 'pointer')
              .addClass('ha-entity');

            svgElementInfo.svgElement = this.replaceElement(svgElementInfo.svgElement, svgElement);
          }

          if ($(svgElement).attr('href') !== imageData) {
            $(svgElement).attr('href', imageData);
          }

          return Promise.resolve(svgElement);
        });
    }

    loadSvgImage(imageUrl, svgElementInfo, entityId, rule) {
      return this.getResource(imageUrl, true)
        .then(result => {
          let svgElement = $(result).find('svg')[0];

          let height = Number.parseFloat($(svgElement).attr('height'));
          let width = Number.parseFloat($(svgElement).attr('width'));
          if (!$(svgElement).attr('viewBox')) {
            $(svgElement).attr('viewBox', `0 0 ${width} ${height}`);
          }

          $(svgElement)
            .attr('id', svgElementInfo.svgElement.id)
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('height', svgElementInfo.originalBBox.height)
            .attr('width', svgElementInfo.originalBBox.width)
            .attr('x', svgElementInfo.originalBBox.x)
            .attr('y', svgElementInfo.originalBBox.y);

          $(svgElement).find('*').append(document.createElementNS('http://www.w3.org/2000/svg', 'title'))
            .off('click')
            .on('click', this.onEntityClick.bind({ instance: this, svgElementInfo: svgElementInfo, entityId: entityId, rule: rule }))
            .css('cursor', 'pointer')
            .addClass('ha-entity');

          svgElementInfo.svgElement = this.replaceElement(svgElementInfo.svgElement, svgElement);

          return Promise.resolve(svgElement);
        })
    }

    replaceElement(prevousSvgElement, svgElement) {
      let $parent = $(prevousSvgElement).parent();

      $(prevousSvgElement).find('*')
        .off('click');

      $(prevousSvgElement)
        .off('click')
        .remove();

      $parent.append(svgElement);

      return svgElement;
    }

    /***************************************************************************************************************************/
    /* Initialization
    /***************************************************************************************************************************/

    initTimeDifference() {
      this.hass.connection.socket.addEventListener('message', event => {
        let data = JSON.parse(event.data);

        // Store the time difference between the local web browser and the Home Assistant server
        if (data.event && data.event.time_fired) {
          let lastEventFiredTime = moment(data.event.time_fired).toDate();
          this.timeDifference = moment().diff(moment(lastEventFiredTime), 'milliseconds');
        }
      });
    }

    initFullyKiosk() {
      if (this.isOptionEnabled(this.config.fully_kiosk)) {
        this.fullyKiosk = new FullyKiosk(this);
        this.fullyKiosk.init();
      }
    }

    initPageDisplay() {
      if (this.config.pages) {
        Object.keys(this.pageInfos).map(key => {
          let pageInfo = this.pageInfos[key];

          $(pageInfo.svg).css('opacity', 1);
          $(pageInfo.svg).css('display', pageInfo.isDefault ? 'initial' : 'none'); // Show the first page
        });
      }
      else {
        // Show the SVG
        $(this.config.svg).css('opacity', 1);
        $(this.config.svg).css('display', 'initial');
      }
    }

    initStartupActions() {
      let actions = [];

      let startup = this.config.startup;
      if (startup && (startup.action || startup.actions)) {
        actions = actions.concat(startup.actions ? startup.actions : [startup.action]);
      }

      if (this.config.pages) {
        for (let key of Object.keys(this.pageInfos)) {
          let pageInfo = this.pageInfos[key];

          let startup = pageInfo.config.startup;
          if (startup && (startup.action || startup.actions)) {
            actions = actions.concat(startup.actions ? startup.actions : [startup.action]);
          }
        }
      }

      for (let action of actions) {
        if (action.service || action.service_template) {
          let actionService = this.getActionService(action);

          switch (this.getDomain(actionService)) {
            case 'floorplan':
              this.callFloorplanService(action);
              break;

            default:
              this.callHomeAssistantService(action);
              break;
          }
        }
      }
    }

    /***************************************************************************************************************************/
    /* SVG initialization
    /***************************************************************************************************************************/

    initFloorplan(svg, config) {
      if (!config.rules) {
        return;
      }

      let svgElements = $(svg).find('*').toArray();

      this.initLastMotion(config, svg, svgElements);
      this.initRules(config, svg, svgElements);
    }

    initLastMotion(config, svg, svgElements) {
      // Add the last motion entity if required
      if (config.last_motion && config.last_motion.entity && config.last_motion.class) {
        this.lastMotionConfig = config.last_motion;

        let entityInfo = { ruleInfos: [], lastState: undefined };
        this.entityInfos[config.last_motion.entity] = entityInfo;
      }
    }

    initRules(config, svg, svgElements) {
      for (let rule of config.rules) {
        if (rule.entity || rule.entities) {
          this.initEntityRule(rule, svg, svgElements);
        }
        else if (rule.element || rule.elements) {
          this.initElementRule(rule, svg, svgElements);
        }
      }
    }

    initEntityRule(rule, svg, svgElements) {
      let entities = this.initGetEntityRuleEntities(rule);
      for (let entity of entities) {
        let entityId = entity.entityId;
        let elementId = entity.elementId;

        let entityInfo = this.entityInfos[entityId];
        if (!entityInfo) {
          entityInfo = { ruleInfos: [], lastState: undefined };
          this.entityInfos[entityId] = entityInfo;
        }

        let ruleInfo = { rule: rule, svgElementInfos: {}, };
        entityInfo.ruleInfos.push(ruleInfo);

        let svgElement = svgElements.find(svgElement => svgElement.id === elementId);
        if (!svgElement) {
          this.logWarning('CONFIG', `Cannot find element '${elementId}' in SVG file`);
          continue;
        }

        let svgElementInfo = this.addSvgElementToRule(svg, svgElement, ruleInfo);

        let $svgElement = $(svgElementInfo.svgElement);
        if ($svgElement.length) {
          svgElementInfo.svgElement = $svgElement[0];

          // Create a title element (to support hover over text)
          $svgElement.append(document.createElementNS('http://www.w3.org/2000/svg', 'title'));

          $svgElement.off('click').on('click', this.onEntityClick.bind({ instance: this, svgElementInfo: svgElementInfo, entityId: entityId, rule: ruleInfo.rule }));
          $svgElement.css('cursor', 'pointer');
          $svgElement.addClass('ha-entity');

          if ($svgElement.is('text') && ($svgElement[0].id === elementId)) {
            this.addBackgroundRectToText($svgElement[0]);
          }
        }
      }
    }

    initGetEntityRuleEntities(rule) {
      let targetEntities = [];

      // Split out HA entity groups into separate entities
      if (rule.groups) {
        for (let entityId of rule.groups) {
          let group = this.hass.states[entityId];
          if (group) {
            for (let entityId of group.attributes.entity_id) {
              targetEntities.push({ entityId: entityId, elementId: entityId });
            }
          }
          else {
            this.logWarning('CONFIG', `Cannot find '${entityId}' in Home Assistant groups`);
          }
        }
      }

      // HA entity treated as is
      if (rule.entity) {
        rule.entities = [rule.entity];
      }

      // HA entities treated as is
      if (rule.entities) {
        let entityIds = rule.entities.filter(x => (typeof x === 'string'));
        for (let entityId of entityIds) {
          let entity = this.hass.states[entityId];
          let isFloorplanVariable = (entityId.split('.')[0] === 'floorplan');

          if (entity || isFloorplanVariable) {
            let elementId = rule.element ? rule.element : entityId;
            targetEntities.push({ entityId: entityId, elementId: elementId });
          }
          else {
            this.logWarning('CONFIG', `Cannot find '${entityId}' in Home Assistant entities`);
          }
        }

        let entityObjects = rule.entities.filter(x => (typeof x !== 'string'));
        for (let entityObject of entityObjects) {
          let entity = this.hass.states[entityObject.entity];
          let isFloorplanVariable = (entityObject.entity.split('.')[0] === 'floorplan');

          if (entity || isFloorplanVariable) {
            targetEntities.push({ entityId: entityObject.entity, elementId: entityObject.element });
          }
          else {
            this.logWarning('CONFIG', `Cannot find '${entityObject.entity}' in Home Assistant entities`);
          }
        }
      }

      return targetEntities;
    }

    initElementRule(rule, svg, svgElements) {
      if (rule.element) {
        rule.elements = [rule.element];
      }

      for (let elementId of rule.elements) {
        let svgElement = svgElements.find(svgElement => svgElement.id === elementId);
        if (svgElement) {
          let elementInfo = this.elementInfos[elementId];
          if (!elementInfo) {
            elementInfo = { ruleInfos: [], lastState: undefined };
            this.elementInfos[elementId] = elementInfo;
          }

          let ruleInfo = { rule: rule, svgElementInfos: {}, };
          elementInfo.ruleInfos.push(ruleInfo);

          let svgElementInfo = this.addSvgElementToRule(svg, svgElement, ruleInfo);

          $(svgElement).off('click').on('click', this.onElementClick.bind({ instance: this, svgElementInfo: svgElementInfo, elementId: elementId, rule: rule }));
          $(svgElement).css('cursor', 'pointer');

          let actions = rule.actions ? rule.actions : [rule.action];
          for (let action of actions) {
            if (action) {
              switch (action.service) {
                case 'toggle':
                  for (let otherElementId of action.data.elements) {
                    let otherSvgElement = svgElements.find(svgElement => svgElement.id === otherElementId);
                    $(otherSvgElement).addClass(action.data.default_class);
                  }
                  break;

                default:
                  break;
              }
            }
          }
        }
        else {
          this.logWarning('CONFIG', `Cannot find '${elementId}' in SVG file`);
        }
      }
    }

    addBackgroundRectToText(svgElement) {
      let bbox = svgElement.getBBox();

      let rect = $(document.createElementNS('http://www.w3.org/2000/svg', 'rect'))
        .attr('id', svgElement.id + '.background')
        .attr('height', bbox.height + 1)
        .attr('width', bbox.width + 2)
        .attr('x', bbox.x - 1)
        .attr('y', bbox.y - 0.5)
        .css('fill-opacity', 0);

      $(rect).insertBefore(svgElement);
    }

    addSvgElementToRule(svg, svgElement, ruleInfo) {
      let svgElementInfo = {
        entityId: svgElement.id,
        svg: svg,
        svgElement: svgElement,
        originalSvgElement: svgElement,
        originalStroke: svgElement.style.stroke,
        originalFill: svgElement.style.fill,
        originalClasses: this.getArray(svgElement.classList),
        originalBBox: svgElement.getBBox(),
        originalClientRect: svgElement.getBoundingClientRect(),
      };
      ruleInfo.svgElementInfos[svgElement.id] = svgElementInfo;

      this.addNestedSvgElementsToRule(svgElement, ruleInfo);

      return svgElementInfo;
    }

    addNestedSvgElementsToRule(svgElement, ruleInfo) {
      $(svgElement).find('*').each((i, svgNestedElement) => {
        ruleInfo.svgElementInfos[svgNestedElement.id] = {
          entityId: svgElement.id,
          svgElement: svgNestedElement,
          originalSvgElement: svgNestedElement,
          originalStroke: svgNestedElement.style.stroke,
          originalFill: svgNestedElement.style.fill,
          originalClasses: this.getArray(svgNestedElement.classList),
          //originalBBox: svgNestedElement.getBBox(),
          //originalClientRect: svgNestedElement.getBoundingClientRect(),
        };
      });
    }

    createImageElement(svgElement) {
      return $(document.createElementNS('http://www.w3.org/2000/svg', 'image'))
        .attr('id', $(svgElement).attr('id'))
        .attr('x', $(svgElement).attr('x'))
        .attr('y', $(svgElement).attr('y'))
        .attr('height', $(svgElement).attr('height'))
        .attr('width', $(svgElement).attr('width'))[0];
    }

    addClass(entityId, svgElement, className) {
      this.logDebug('CLASS', `${entityId} (adding class: ${className})`);

      if ($(svgElement).hasClass('ha-leave-me-alone')) {
        return;
      }

      //this.logDebug(`Adding class '${className}' to '${entityId}'`);
      if (!$(svgElement).hasClass(className)) {
        $(svgElement).addClass(className);

        if ($(svgElement).is('text')) {
          $(svgElement).parent().find(`[id="${entityId}.background"]`).each((i, rectElement) => {
            if (!$(rectElement).hasClass(className + '-background')) {
              $(rectElement).addClass(className + '-background');
            }
          });
        }
      }

      $(svgElement).find('*').each((i, svgNestedElement) => {
        if (!$(svgNestedElement).hasClass('ha-leave-me-alone')) {
          if (!$(svgNestedElement).hasClass(className)) {
            $(svgNestedElement).addClass(className);
          }
        }
      });
    }

    removeClasses(entityId, svgElement, classes) {
      for (let className of classes) {
        this.logDebug('CLASS', `${entityId} (removing class: ${className})`);

        //this.logDebug(`Removing class '${className}' from '${entityId}'`);
        if ($(svgElement).hasClass(className)) {
          $(svgElement).removeClass(className);

          if ($(svgElement).is('text')) {
            $(svgElement).parent().find(`[id="${entityId}.background"]`).each((i, rectElement) => {
              if ($(rectElement).hasClass(className + '-background')) {
                $(rectElement).removeClass(className + '-background');
              }
            });
          }

          $(svgElement).find('*').each((i, svgNestedElement) => {
            if ($(svgNestedElement).hasClass(className)) {
              $(svgNestedElement).removeClass(className);
            }
          });
        }
      }
    }

    setEntityStyle(svgElementInfo, svgElement, entityInfo, ruleInfo) {
      let stateConfig = ruleInfo.rule.states.find(stateConfig => (stateConfig.state === entityInfo.lastState.state));
      if (stateConfig) {
        let stroke = this.getStroke(stateConfig);
        if (stroke) {
          svgElement.style.stroke = stroke;
        }
        else {
          if (svgElementInfo.originalStroke) {
            svgElement.style.stroke = svgElementInfo.originalStroke;
          }
          else {
            // ???
          }
        }

        let fill = this.getFill(stateConfig);
        if (fill) {
          svgElement.style.fill = fill;
        }
        else {
          if (svgElementInfo.originalFill) {
            svgElement.style.fill = svgElementInfo.originalFill;
          }
          else {
            // ???
          }
        }
      }
    }

    /***************************************************************************************************************************/
    /* Entity handling (when states change)
    /***************************************************************************************************************************/

    handleEntities(isInitialLoad) {
      let variableNames = this.storeFloorplanVariables();

      this.handleElements();

      let changedEntityIds = this.getChangedEntities(isInitialLoad).concat(variableNames);

      if (changedEntityIds && changedEntityIds.length) {
        let promises = changedEntityIds.map(entityId => this.handleEntity(entityId, isInitialLoad));
        return Promise.all(promises)
          .then(() => {
            return Promise.resolve(changedEntityIds);
          });
      }
      else {
        return Promise.resolve();
      }
    }

    storeFloorplanVariables() {
      let variableNames = Object.keys(this.variables);
      for (let variableName of variableNames) {
        this.hass.states[variableName] = {
          entity_id: variableName,
          state: this.variables[variableName],
          attributes: [],
        };
      }

      return variableNames;
    }

    getChangedEntities(isInitialLoad) {
      let changedEntityIds = [];

      let entityIds = Object.keys(this.hass.states);

      let lastMotionEntityInfo, oldLastMotionState, newLastMotionState;

      if (this.lastMotionConfig) {
        lastMotionEntityInfo = this.entityInfos[this.lastMotionConfig.entity];
        if (lastMotionEntityInfo && lastMotionEntityInfo.lastState) {
          oldLastMotionState = lastMotionEntityInfo.lastState.state;
          newLastMotionState = this.hass.states[this.lastMotionConfig.entity].state;
        }
      }

      for (let entityId of entityIds) {
        let entityInfo = this.entityInfos[entityId];
        if (entityInfo) {
          let entityState = this.hass.states[entityId];

          if (isInitialLoad) {
            this.logDebug('STATE', `${entityId}: ${entityState.state} (initial load)`);
            if (changedEntityIds.indexOf(entityId) < 0) {
              changedEntityIds.push(entityId);
            }
          }
          else if (entityInfo.lastState) {
            let oldState = entityInfo.lastState.state;
            let newState = entityState.state;

            if (entityState.last_changed !== entityInfo.lastState.last_changed) {
              this.logDebug('STATE', `${entityId}: ${newState} (last changed ${moment(entityInfo.lastState.last_changed).format("DD-MMM-YYYY HH:mm:ss")})`);
              if (changedEntityIds.indexOf(entityId) < 0) {
                changedEntityIds.push(entityId);
              }
            }
            else {
              if (!this.equal(entityInfo.lastState.attributes, entityState.attributes)) {
                this.logDebug('STATE', `${entityId}: attributes (last updated ${moment(entityInfo.lastState.last_changed).format("DD-MMM-YYYY HH:mm:ss")})`);
                if (changedEntityIds.indexOf(entityId) < 0) {
                  changedEntityIds.push(entityId);
                }
              }
            }

            if (this.lastMotionConfig) {
              if ((newLastMotionState !== oldLastMotionState) && (entityId.indexOf('binary_sensor') >= 0)) {
                let friendlyName = entityState.attributes.friendly_name;

                if (friendlyName === newLastMotionState) {
                  this.logDebug('LAST_MOTION', `${entityId} (new)`);
                  if (changedEntityIds.indexOf(entityId) < 0) {
                    changedEntityIds.push(entityId);
                  }
                }
                else if (friendlyName === oldLastMotionState) {
                  this.logDebug('LAST_MOTION', `${entityId} (old)`);
                  if (changedEntityIds.indexOf(entityId) < 0) {
                    changedEntityIds.push(entityId);
                  }
                }
              }
            }
          }
        }
      }

      return changedEntityIds;
    }

    handleEntity(entityId, isInitialLoad) {
      let entityState = this.hass.states[entityId];
      let entityInfo = this.entityInfos[entityId];

      entityInfo.lastState = Object.assign({}, entityState);

      return this.handleEntityUpdateDom(entityId)
        .then(() => {
          this.handleEntityUpdateCss(entityId, isInitialLoad);
          this.handleEntityUpdateLastMotionCss(entityId);
          this.handleEntitySetHoverOver(entityId);

          return Promise.resolve();
        });
    }

    handleEntityUpdateDom(entityId) {
      let promises = [];

      let entityState = this.hass.states[entityId];
      let entityInfo = this.entityInfos[entityId];

      for (let ruleInfo of entityInfo.ruleInfos) {
        for (let svgElementId in ruleInfo.svgElementInfos) {
          let svgElementInfo = ruleInfo.svgElementInfos[svgElementId];

          if ($(svgElementInfo.svgElement).is('text')) {
            this.handleEntityUpdateText(entityId, ruleInfo, svgElementInfo);
          }
          else if (ruleInfo.rule.image || ruleInfo.rule.image_template) {
            promises.push(this.handleEntityUpdateImage(entityId, ruleInfo, svgElementInfo));
          }
        }
      }

      return promises.length ? Promise.all(promises) : Promise.resolve();
    }

    handleElements() {
      let promises = [];

      Object.keys(this.elementInfos).map(key => {
        promises.push(this.handleElementUpdateDom(this.elementInfos[key]));
      });

      return promises.length ? Promise.all(promises) : Promise.resolve();
    }

    handleElementUpdateDom(elementInfo) {
      let promises = [];

      for (let ruleInfo of elementInfo.ruleInfos) {
        for (let svgElementId in ruleInfo.svgElementInfos) {
          let svgElementInfo = ruleInfo.svgElementInfos[svgElementId];

          if ($(svgElementInfo.svgElement).is('text')) {
            this.handleEntityUpdateText(svgElementId, ruleInfo, svgElementInfo);
          }
          else if (ruleInfo.rule.image || ruleInfo.rule.image_template) {
            promises.push(this.handleEntityUpdateImage(svgElementId, ruleInfo, svgElementInfo));
          }
        }
      }

      return promises.length ? Promise.all(promises) : Promise.resolve();
    }

    handleEntityUpdateText(entityId, ruleInfo, svgElementInfo) {
      let svgElement = svgElementInfo.svgElement;
      let state = this.hass.states[entityId] ? this.hass.states[entityId].state : undefined;

      let text = ruleInfo.rule.text_template ? this.evaluate(ruleInfo.rule.text_template, entityId) : state;

      let tspan = $(svgElement).find('tspan');
      if (tspan.length) {
        $(tspan).text(text);
      }
      else {
        let title = $(svgElement).find('title');
        $(svgElement).text(text);
        if (title.length) {
          $(svgElement).append(title);
        }
      }

      let rect = $(svgElement).parent().find(`[id="${entityId}.background"]`);
      if (rect.length) {
        let bbox = svgElement.getBBox();
        $(rect)
          .attr('x', bbox.x - 1)
          .attr('y', bbox.y - 0.5)
          .attr('height', bbox.height + 1)
          .attr('width', bbox.width + 2)
          .height(bbox.height + 1)
          .width(bbox.width + 2);
      }
    }

    handleEntityUpdateImage(entityId, ruleInfo, svgElementInfo) {
      let svgElement = svgElementInfo.svgElement;

      let imageUrl = ruleInfo.rule.image ? ruleInfo.rule.image : this.evaluate(ruleInfo.rule.image_template, entityId);

      if (imageUrl && (ruleInfo.imageUrl !== imageUrl)) {
        ruleInfo.imageUrl = imageUrl;

        if (ruleInfo.imageLoader) {
          clearInterval(ruleInfo.imageLoader); // cancel any previous image loading for this rule
        }

        if (ruleInfo.rule.image_refresh_interval) {
          let refreshInterval = parseInt(ruleInfo.rule.image_refresh_interval);

          ruleInfo.imageLoader = setInterval((imageUrl, svgElement) => {
            this.loadImage(imageUrl, svgElementInfo, entityId, ruleInfo.rule)
              .catch(error => {
                this.handleError(error);
              });
          }, refreshInterval * 1000, imageUrl, svgElement);
        }

        return this.loadImage(imageUrl, svgElementInfo, entityId, ruleInfo.rule)
          .catch(error => {
            this.handleError(error);
          });
      }
      else {
        return Promise.resolve();
      }
    }

    handleEntitySetHoverOver(entityId) {
      let entityState = this.hass.states[entityId];
      let entityInfo = this.entityInfos[entityId];

      for (let ruleInfo of entityInfo.ruleInfos) {
        if (ruleInfo.rule.hover_over !== false) {
          for (let svgElementId in ruleInfo.svgElementInfos) {
            let svgElementInfo = ruleInfo.svgElementInfos[svgElementId];

            this.handlEntitySetHoverOverText(svgElementInfo.svgElement, entityState);
          }
        }
      }
    }

    handlEntitySetHoverOverText(element, entityState) {
      let dateFormat = this.config.date_format ? this.config.date_format : 'DD-MMM-YYYY';

      $(element).find('title').each((i, titleElement) => {
        let lastChangedElapsed = moment().to(moment(entityState.last_changed));
        let lastChangedDate = moment(entityState.last_changed).format(dateFormat);
        let lastChangedTime = moment(entityState.last_changed).format('HH:mm:ss');

        let lastUpdatedElapsed = moment().to(moment(entityState.last_updated));
        let lastUpdatedDate = moment(entityState.last_updated).format(dateFormat);
        let lastUpdatedTime = moment(entityState.last_updated).format('HH:mm:ss');

        let titleText = `${entityState.attributes.friendly_name}\n`;
        titleText += `State: ${entityState.state}\n\n`;

        Object.keys(entityState.attributes).map(key => {
          titleText += `${key}: ${entityState.attributes[key]}\n`;
        });
        titleText += '\n';

        titleText += `Last changed: ${lastChangedDate} ${lastChangedTime}\n`;
        titleText += `Last updated: ${lastUpdatedDate} ${lastUpdatedTime}`;

        $(titleElement).html(titleText);
      });
    }

    handleEntityUpdateCss(entityId, isInitialLoad) {
      if (!this.cssRules || !this.cssRules.length) {
        return;
      }

      let entityState = this.hass.states[entityId];
      let entityInfo = this.entityInfos[entityId];

      for (let ruleInfo of entityInfo.ruleInfos) {
        for (let svgElementId in ruleInfo.svgElementInfos) {
          let svgElementInfo = ruleInfo.svgElementInfos[svgElementId];
          let svgElement = svgElementInfo.svgElement;

          let hasTransitionConfig = false;
          let wasTransitionApplied = false;

          if (ruleInfo.rule.states && ruleInfo.rule.state_transitions) {
            hasTransitionConfig = true;
            let transitionConfig = ruleInfo.rule.state_transitions.find(transitionConfig => (transitionConfig.to_state === entityState.state));
            if (transitionConfig && transitionConfig.from_state && transitionConfig.to_state && transitionConfig.duration) {
              let elapsed = Math.max(moment().diff(moment(entityState.last_changed), 'milliseconds'), 0);
              let remaining = (transitionConfig.duration * 1000) - elapsed;

              let fromStateConfig = ruleInfo.rule.states.find(stateConfig => (stateConfig.state === transitionConfig.from_state));
              let toStateConfig = ruleInfo.rule.states.find(stateConfig => (stateConfig.state === transitionConfig.to_state));

              let fromColor = this.getFill(fromStateConfig);
              let toColor = this.getFill(toStateConfig);

              if (fromColor && toColor) {
                if (remaining > 0) {
                  let transition = this.entityTransitions[entityId];
                  if (!transition) {
                    this.logDebug('TRANSITION', `${entityId} (created)`);
                    transition = {
                      entityId: entityId,
                      svgElementInfo: svgElementInfo,
                      ruleInfo: ruleInfo,
                      duration: transitionConfig.duration,
                      fromStateConfig: fromStateConfig,
                      toStateConfig: toStateConfig,
                      fromColor: fromColor,
                      toColor: toColor,
                      startMoment: undefined,
                      endMoment: undefined,
                      isActive: false,
                    };
                    this.entityTransitions[entityId] = transition;
                  }

                  // Assume the transition starts (or started) when the origin state change occurred
                  transition.startMoment = this.serverToLocalMoment(moment(entityState.last_changed));
                  transition.endMoment = transition.startMoment.clone();
                  transition.endMoment.add(transition.duration, 'seconds');

                  // If the transition is not currently running, kick it off
                  if (!transition.isActive) {
                    // If this state change just occurred, the transition starts as of now
                    if (!isInitialLoad) {
                      let nowMoment = moment();
                      transition.startMoment = nowMoment.clone();
                      transition.endMoment = transition.startMoment.clone();
                      transition.endMoment.add(transition.duration, 'seconds');
                    }

                    this.logDebug('TRANSITION', `${transition.entityId}: (start)`);
                    transition.isActive = true;
                    this.handleEntityTransition(transition);
                  }
                  else {
                    // If the transition is currently running, it will be extended with latest start / end times
                    this.logDebug('TRANSITION', `${transition.entityId} (continue)`);
                  }
                }
                else {
                  this.setEntityStyle(svgElementInfo, svgElement, entityInfo, ruleInfo);
                }
              }
              else {
                this.setEntityStyle(svgElementInfo, svgElement, entityInfo, ruleInfo);
              }
              wasTransitionApplied = true;
            }
          }

          let targetClass = undefined;
          let obsoleteClasses = [];

          if (ruleInfo.rule.class_template) {
            targetClass = this.evaluate(ruleInfo.rule.class_template, entityId);
          }

          // Get the config for the current state
          if (ruleInfo.rule.states) {
            let stateConfig = ruleInfo.rule.states.find(stateConfig => (stateConfig.state === entityState.state));
            if (stateConfig && stateConfig.class && !wasTransitionApplied) {
              targetClass = stateConfig.class;
            }

            // Remove any other previously-added state classes
            for (let otherStateConfig of ruleInfo.rule.states) {
              if (!stateConfig || (otherStateConfig.state !== stateConfig.state)) {
                if (otherStateConfig.class && (otherStateConfig.class !== 'ha-entity') && $(svgElement).hasClass(otherStateConfig.class)) {
                  if (svgElementInfo.originalClasses.indexOf(otherStateConfig.class) < 0) {
                    obsoleteClasses.push(otherStateConfig.class);
                  }
                }
              }
            }
          }
          else {
            for (let otherClassName of this.getArray(svgElement.classList)) {
              if ((otherClassName !== targetClass) && (otherClassName !== 'ha-entity')) {
                if (svgElementInfo.originalClasses.indexOf(otherClassName) < 0) {
                  obsoleteClasses.push(otherClassName);
                }
              }
            }
          }

          // Remove any obsolete classes from the entity
          if (obsoleteClasses.length) {
            //this.logDebug(`${entityId}: Removing obsolete classes: ${obsoleteClasses.join(', ')}`);
            this.removeClasses(entityId, svgElement, obsoleteClasses);
          }

          // Add the target class to the entity
          if (targetClass) {
            if (hasTransitionConfig && !wasTransitionApplied) {
              let transition = this.entityTransitions[entityId];
              if (transition && transition.isActive) {
                this.logDebug('TRANSITION', `${transition.entityId} (cancel)`);
                transition.isActive = false;
              }
            }

            this.addClass(entityId, svgElement, targetClass);
          }
        }
      }
    }

    handleEntityTransition(transition) {
      if (!transition.isActive) {
        return;
      }

      let nowMoment = moment();

      let isExpired = (nowMoment >= transition.endMoment);

      let ratio = isExpired ? 1 : (nowMoment - transition.startMoment) / (transition.endMoment - transition.startMoment);
      let color = this.getTransitionColor(transition.fromColor, transition.toColor, ratio);
      //this.logDebug('TRANSITION', `${transition.entityId} (ratio: ${ratio}, element: ${transition.svgElementInfo.svgElement.id}, fill: ${color})`);
      transition.svgElementInfo.svgElement.style.fill = color;

      if (isExpired) {
        transition.isActive = false;
        this.logDebug('TRANSITION', `${transition.entityId} (end)`);
        return;
      }

      setTimeout(() => {
        this.handleEntityTransition(transition);
      }, 100);
    }

    handleEntityUpdateLastMotionCss(entityId) {
      if (!this.lastMotionConfig || !this.cssRules || !this.cssRules.length) {
        return;
      }

      let entityState = this.hass.states[entityId];
      let entityInfo = this.entityInfos[entityId];

      for (let ruleInfo of entityInfo.ruleInfos) {
        for (let svgElementId in ruleInfo.svgElementInfos) {
          let svgElementInfo = ruleInfo.svgElementInfos[svgElementId];
          let svgElement = svgElementInfo.svgElement;

          if (this.hass.states[this.lastMotionConfig.entity] &&
            (entityState.attributes.friendly_name === this.hass.states[this.lastMotionConfig.entity].state)) {
            if (!$(svgElement).hasClass(this.lastMotionConfig.class)) {
              //this.logDebug(`${entityId}: Adding last motion class '${this.lastMotionConfig.class}'`);
              $(svgElement).addClass(this.lastMotionConfig.class);
            }
          }
          else {
            if ($(svgElement).hasClass(this.lastMotionConfig.class)) {
              //this.logDebug(`${entityId}: Removing last motion class '${this.lastMotionConfig.class}'`);
              $(svgElement).removeClass(this.lastMotionConfig.class);
            }
          }
        }
      }
    }

    /***************************************************************************************************************************/
    /* Floorplan helper functions
    /***************************************************************************************************************************/

    isOptionEnabled(option) {
      return ((option === null) || (option !== undefined));
    }

    isLastMotionEnabled() {
      return this.lastMotionConfig && this.config.last_motion.entity && this.config.last_motion.class;
    }

    validateConfig(config) {
      let isValid = true;

      if (!config.pages && !config.rules) {
        this.setIsLoading(false);
        this.logWarning('CONFIG', `Cannot find 'pages' nor 'rules' in floorplan configuration`);
        isValid = false;
      }
      else {
        if (config.pages) {
          if (!config.pages.length) {
            this.logWarning('CONFIG', `The 'pages' section must contain one or more pages in floorplan configuration`);
            isValid = false;
          }
        }
        else {
          if (!config.rules) {
            this.logWarning('CONFIG', `Cannot find 'rules' in floorplan configuration`);
            isValid = false;
          }

          let invalidRules = config.rules.filter(x => (x.entity || x.entities) && (x.element || x.elements));
          if (invalidRules.length) {
            this.logWarning('CONFIG', `A rule cannot contain both 'entities' and 'elements' in floorplan configuration`);
            isValid = false;
          }

          invalidRules = config.rules.filter(x => !(x.entity || x.entities) && !(x.element || x.elements));
          if (invalidRules.length) {
            this.logWarning('CONFIG', `A rule must contain either 'entities' or 'elements' in floorplan configuration`);
            isValid = false;
          }
        }
      }

      return isValid;
    }

    localToServerMoment(localMoment) {
      let serverMoment = localMoment.clone();
      if (this.timeDifference >= 0)
        serverMoment.subtract(this.timeDifference, 'milliseconds');
      else
        serverMoment.add(Math.abs(this.timeDifference), 'milliseconds');
      return serverMoment;
    }

    serverToLocalMoment(serverMoment) {
      let localMoment = serverMoment.clone();
      if (this.timeDifference >= 0)
        localMoment.add(Math.abs(this.timeDifference), 'milliseconds');
      else
        localMoment.subtract(this.timeDifference, 'milliseconds');
      return localMoment;
    }

    evaluate(code, entityId) {
      let entityState = this.hass.states[entityId];
      let functionBody = (code.indexOf('return') >= 0) ? code : `return \`${code}\`;`;
      let func = new Function('entity', 'entities', 'hass', 'config', functionBody);
      return func(entityState, this.hass.states, this.hass, this.config);
    }

    /***************************************************************************************************************************/
    /* Event handlers
    /***************************************************************************************************************************/

    onElementClick(e) {
      e.stopPropagation();
      this.instance.onActionClick(this.svgElementInfo, this.entityId, this.elementId, this.rule);
    }

    onEntityClick(e) {
      e.stopPropagation();
      this.instance.onActionClick(this.svgElementInfo, this.entityId, this.elementId, this.rule);
    }

    onActionClick(svgElementInfo, entityId, elementId, rule) {
      if (!rule || !(rule.action || rule.actions)) {
        if (entityId && (rule.more_info !== false)) {
          this.openMoreInfo(entityId);
        }
        return;
      }

      let calledServiceCount = 0;

      let actions = rule.actions ? rule.actions : [rule.action];
      for (let action of actions) {
        if (action.service || action.service_template) {
          let actionService = this.getActionService(action, entityId);

          switch (this.getDomain(actionService)) {
            case 'floorplan':
              this.callFloorplanService(action, entityId, svgElementInfo);
              break;

            default:
              this.callHomeAssistantService(action, entityId);
              break;
          }

          calledServiceCount++;
        }
      }

      if (!calledServiceCount) {
        if (entityId && (rule.more_info !== false)) {
          this.openMoreInfo(entityId);
        }
      }
    }

    callFloorplanService(action, entityId, svgElementInfo) {
      let actionService = this.getActionService(action, entityId);
      let actionData = this.getActionData(action);

      switch (this.getService(actionService)) {
        case 'class_toggle':
          if (actionData) {
            let classes = actionData.classes;

            for (let otherElementId of actionData.elements) {
              let otherSvgElement = $(svgElementInfo.svg).find(`[id="${otherElementId}"]`);

              if ($(otherSvgElement).hasClass(classes[0])) {
                $(otherSvgElement).removeClass(classes[0]);
                $(otherSvgElement).addClass(classes[1]);
              }
              else if ($(otherSvgElement).hasClass(classes[1])) {
                $(otherSvgElement).removeClass(classes[1]);
                $(otherSvgElement).addClass(classes[0]);
              }
              else {
                $(otherSvgElement).addClass(actionData.default_class);
              }
            }
          }
          break;

        case 'page_navigate':
          let page_id = actionData.page_id;
          let targetPageInfo = page_id && this.pageInfos[page_id];

          if (targetPageInfo) {
            Object.keys(this.pageInfos).map(key => {
              let pageInfo = this.pageInfos[key];

              if ($(pageInfo.svg).css('display') !== 'none') {
                $(pageInfo.svg).css('display', 'none');
              }
            });

            $(targetPageInfo.svg).css('display', 'initial');
          }
          break;

        case 'variable_set':
          if (actionData.variable) {
            let value = this.getActionValue(actionData, entityId);
            this.setVariable(actionData.variable, value);
          }
          break;

        default:
          // Unknown floorplan service
          break;
      }
    }

    getActionValue(action, entityId) {
      let value = action.value;
      if (action.value_template) {
        value = this.evaluate(action.value_template, entityId);
      }
      return value;
    }

    setVariable(variableName, value) {
      this.variables[variableName] = value;

      // Simulate an event change to all entities
      this.handleEntitiesDebounced(); // use debounced wrapper
    }

    /***************************************************************************************************************************/
    /* Home Assisant helper functions
    /***************************************************************************************************************************/

    callHomeAssistantService(action, entityId) {
      let actionService = this.getActionService(action, entityId);
      let actionData = this.getActionData(action, entityId);

      if (!actionData.entity_id && entityId) {
        actionData.entity_id = entityId;
      }

      this.hass.callService(this.getDomain(actionService), this.getService(actionService), actionData);
    }

    getActionData(action, entityId) {
      let data = action.data ? action.data : {};
      if (action.data_template) {
        let result = this.evaluate(action.data_template, entityId);
        data = JSON.parse(result);
      }
      return data;
    }

    getActionService(action, entityId) {
      let service = action.service;
      if (action.service_template) {
        service = this.evaluate(action.service_template, entityId);
      }
      return service;
    }

    getDomain(actionService) {
      return actionService.split(".")[0];
    }

    getService(actionService) {
      return actionService.split(".")[1];
    }

    /***************************************************************************************************************************/
    /* Logging / error handling functions
    /***************************************************************************************************************************/

    handleWindowError(msg, url, lineNo, columnNo, error) {
      this.setIsLoading(false);

      if (msg.toLowerCase().indexOf("script error") >= 0) {
        this.logError('Script error: See browser console for detail');
      }
      else {
        let message = [
          msg,
          'URL: ' + url,
          'Line: ' + lineNo + ', column: ' + columnNo,
          'Error: ' + JSON.stringify(error)
        ].join('<br>');

        this.logError(message);
      }

      return false;
    }

    handleError(error) {
      let message = error;
      if (error.stack) {
        message = `${error.stack}`;
      }
      else if (error.message) {
        message = `${error.message}`;
      }

      this.log('error', message);
    }

    logError(message) {
      this.log('error', message);
    }

    logWarning(area, message) {
      this.log('warning', `${area} ${message}`);
    }

    logInfo(area, message) {
      this.log('info', `${area} ${message}`);
    }

    logDebug(area, message) {
      this.log('debug', `${area} ${message}`);
    }

    log(level, message) {
      let text = `${moment().format("DD-MM-YYYY HH:mm:ss")} ${level.toUpperCase()} ${message}`;
      console.log(text);

      if (!this.config) {
        // Always log messages before the config has been loaded
      }
      else if (!this.logLevels || !this.logLevels.length || (this.logLevels.indexOf(level) < 0)) {
        return;
      }

      let log = $(this.doc).find('#log');
      $(log).find('ul').prepend(`<li class="${level}">${text}</li>`)
      $(log).css('display', 'block');
    }

    /***************************************************************************************************************************/
    /* CSS helper functions
    /***************************************************************************************************************************/

    getStroke(stateConfig) {
      let stroke = undefined;

      for (let cssRule of this.cssRules) {
        if (cssRule.selectorText && cssRule.selectorText.indexOf(`.${stateConfig.class}`) >= 0) {
          if (cssRule.style && cssRule.style.stroke) {
            if (cssRule.style.stroke[0] === '#') {
              stroke = cssRule.style.stroke;
            }
            else {
              let rgb = cssRule.style.stroke.substring(4).slice(0, -1).split(',').map(x => parseInt(x));
              stroke = `#${rgb[0].toString(16)[0]}${rgb[1].toString(16)[0]}${rgb[2].toString(16)[0]}`;
            }
          }
        }
      }

      return stroke;
    }

    getFill(stateConfig) {
      let fill = undefined;

      for (let cssRule of this.cssRules) {
        if (cssRule.selectorText && cssRule.selectorText.indexOf(`.${stateConfig.class}`) >= 0) {
          if (cssRule.style && cssRule.style.fill) {
            if (cssRule.style.fill[0] === '#') {
              fill = cssRule.style.fill;
            }
            else {
              let rgb = cssRule.style.fill.substring(4).slice(0, -1).split(',').map(x => parseInt(x));
              fill = `#${rgb[0].toString(16)}${rgb[1].toString(16)}${rgb[2].toString(16)}`;
            }
          }
        }
      }

      return fill;
    }

    getTransitionColor(fromColor, toColor, value) {
      return (value <= 0) ? fromColor :
        ((value >= 1) ? toColor : this.rgbToHex(this.mix(this.hexToRgb(toColor), this.hexToRgb(fromColor), value)));
    }

    loadStyleSheetInternal(path, fn, scope) {
      let head = document.getElementsByTagName('head')[0]; // reference to document.head for appending / removing link nodes
      let link = document.createElement('link');           // create the link node
      link.setAttribute('href', this.cacheBuster(path));
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('type', 'text/css');

      let sheet, cssRules;
      // get the correct properties to check for depending on the browser
      if ('sheet' in link) {
        sheet = 'sheet'; cssRules = 'cssRules';
      }
      else {
        sheet = 'styleSheet'; cssRules = 'rules';
      }

      let intervalId = setInterval(function () {                     // start checking whether the style sheet has successfully loaded
        try {
          if (link[sheet] && link[sheet][cssRules].length) { // SUCCESS! our style sheet has loaded
            clearInterval(intervalId);                      // clear the counters
            clearTimeout(timeoutId);
            fn.call(scope || window, true, link);           // fire the callback with success == true
          }
        }
        catch (e) { debugger; }
        finally { }
      }, 10),                                               // how often to check if the stylesheet is loaded
        timeoutId = setTimeout(function () {                // start counting down till fail
          clearInterval(intervalId);                        // clear the counters
          clearTimeout(timeoutId);
          head.removeChild(link);                           // since the style sheet didn't load, remove the link node from the DOM
          fn.call(scope || window, false, link);            // fire the callback with success == false
        }, 15000);                                          // how long to wait before failing

      head.appendChild(link);  // insert the link node into the DOM and start loading the style sheet

      return link; // return the link node
    }

    /***************************************************************************************************************************/
    /* General helper functions
    /***************************************************************************************************************************/

    getResource(resourceUrl, useCache, isImage) {
      resourceUrl = this.cacheBuster(resourceUrl);
      useCache = false;

      return new Promise((resolve, reject) => {
        let options = {
          url: resourceUrl,
          cache: (useCache === true),
          //processData: false,
          error: (err) => {
            reject(new URIError(`${resourceUrl}: ${err.responseText}`));
          },
          success: (result) => {
            resolve(isImage ? `data:image/jpeg;base64,${this.base64Encode(result)}` : result);
          },
        };

        if (isImage) {
          options.mimeType = 'text/plain; charset=x-user-defined';
        }

        jQuery.ajax(options);
      });
    }

    /***************************************************************************************************************************/
    /* Utility functions
    /***************************************************************************************************************************/

    getArray(list) {
      return Array.isArray(list) ? list : Object.keys(list).map(key => list[key]);
    }

    base64Encode(str) {
      let CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      let out = "", i = 0, len = str.length, c1, c2, c3;
      while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i === len) {
          out += CHARS.charAt(c1 >> 2);
          out += CHARS.charAt((c1 & 0x3) << 4);
          out += "==";
          break;
        }
        c2 = str.charCodeAt(i++);
        if (i === len) {
          out += CHARS.charAt(c1 >> 2);
          out += CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
          out += CHARS.charAt((c2 & 0xF) << 2);
          out += "=";
          break;
        }
        c3 = str.charCodeAt(i++);
        out += CHARS.charAt(c1 >> 2);
        out += CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += CHARS.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += CHARS.charAt(c3 & 0x3F);
      }
      return out;
    }

    cacheBuster(url) {
      return `${url}${(url.indexOf('?') >= 0) ? '&' : '?'}_=${new Date().getTime()}`;
    }

    debounce(func, wait, immediate) {
      let timeout;
      return function () {
        let context = this, args = arguments;

        let later = function () {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };

        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
      };
    }

    equal(a, b) {
      if (a === b) return true;

      var arrA = Array.isArray(a)
        , arrB = Array.isArray(b)
        , i;

      if (arrA && arrB) {
        if (a.length != b.length) return false;
        for (i = 0; i < a.length; i++)
          if (!this.equal(a[i], b[i])) return false;
        return true;
      }

      if (arrA != arrB) return false;

      if (a && b && typeof a === 'object' && typeof b === 'object') {
        var keys = Object.keys(a);
        if (keys.length !== Object.keys(b).length) return false;

        var dateA = a instanceof Date
          , dateB = b instanceof Date;
        if (dateA && dateB) return a.getTime() == b.getTime();
        if (dateA != dateB) return false;

        var regexpA = a instanceof RegExp
          , regexpB = b instanceof RegExp;
        if (regexpA && regexpB) return a.toString() == b.toString();
        if (regexpA != regexpB) return false;

        for (i = 0; i < keys.length; i++)
          if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

        for (i = 0; i < keys.length; i++)
          if (!this.equal(a[keys[i]], b[keys[i]])) return false;

        return true;
      }

      return false;
    }

    /***************************************************************************************************************************/
    /* Color functions
    /***************************************************************************************************************************/

    rgbToHex(rgb) {
      return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
    }

    hexToRgb(hex) {
      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b;
      });

      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    mix(color1, color2, weight) {
      let p = weight;
      let w = p * 2 - 1;
      let w1 = ((w / 1) + 1) / 2;
      let w2 = 1 - w1;
      let rgb = [
        Math.round(color1.r * w1 + color2.r * w2),
        Math.round(color1.g * w1 + color2.g * w2),
        Math.round(color1.b * w1 + color2.b * w2)
      ];
      return rgb;
    }
  }

  window.Floorplan = Floorplan;
}
