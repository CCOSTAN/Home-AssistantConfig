/* Optional browser-preview settings. Copy to kiosk-config.js and keep it private.
 * The preview reuses the signed-in Home Assistant browser session; never add a token.
 * All names and entity IDs below are examples.
 */
window.HAVEN_KIOSK_PREVIEW = {
    weatherEntity: 'weather.home',
    notificationEntity: 'sensor.household_notification',
    cameras: [
        {entity: 'camera.entry', name: 'Entry'},
        {entity: 'camera.lawn', name: 'Lawn'},
        {entity: 'camera.drive', name: 'Driveway'},
        {entity: 'camera.garage', name: 'Garage'}
    ],
    events: {entity: 'sensor.kiosk_camera_view', views: {garage: {entity: 'camera.garage'}}},
    information: {
        rotationSeconds: 20,
        // Optional: source attribute must contain only approved display fields.
        // agenda: {entity:'sensor.household_status',attribute:'familyAgenda',hideWhenEntities:['input_boolean.guest_mode','input_boolean.vacation_mode']},
        statusCards: [
            {entity: 'cover.garage', name: 'Garage', icon: 'garage', normalStates: ['closed'], alertStates: ['open','opening','closing']},
            {entity: 'lock.entry', name: 'Entry', icon: 'lock', normalStates: ['locked'], alertStates: ['unlocked','unlocking','locking','jammed']},
            {entity: 'binary_sensor.windows', name: 'Windows', icon: 'window', normalStates: ['off'], alertStates: ['on'], labels: {off:'SECURE',on:'OPEN'}},
            {entity: 'climate.downstairs', name: 'Downstairs', icon: 'climate', mode: 'climate'},
            {entity: 'climate.upstairs', name: 'Upstairs', icon: 'climate', mode: 'climate'}
        ],
        people: [
            {entity: 'person.alex', name: 'Alex'},
            {entity: 'person.jamie', name: 'Jamie'},
            {entity: 'person.sam', name: 'Sam', homeStates: ['home','University Residence'], locationEntity: 'sensor.sam_location', showLocation: true},
            {entity: 'person.riley', name: 'Riley', homeStates: ['home','City Apartment'], locationEntity: 'sensor.riley_location', showLocation: true}
        ],
        energy: {
            solar: 'sensor.solar_energy_total',
            gridImport: 'sensor.grid_import_total', gridExport: 'sensor.grid_export_total',
            batteryCharge: 'sensor.battery_charge_total', batteryDischarge: 'sensor.battery_discharge_total',
            water: 'sensor.water_usage_daily', waterUnit: 'gal'
        }
    }
};
