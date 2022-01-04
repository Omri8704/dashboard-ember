export default {
  name: 'settings-service',
  initialize(app) {
    app.inject('route', 'settingsService', 'service:settings');
  }
};
