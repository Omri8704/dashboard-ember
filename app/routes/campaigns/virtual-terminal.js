import Ember from 'ember';

export default Ember.Route.extend({
  settings: Ember.inject.service(),
  setupController: function(controller, model) {
    this._super(...arguments);
    controller.set('entity', this.get('settings.current_entity'));
    return this._super(controller, model);
  },
  deactivate: function() {
    return this.controller.reset(true);
  }
});
