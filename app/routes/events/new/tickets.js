import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    if (this.controllerFor('events.new').get('disableTickets') === true) {
      this.transitionTo('events.new.details')
    }
  },

  afterModel(model) {
    if (model.get('noRegistration') == true) {
      this.controllerFor('events.new').set('disableConfirmation', false);
      this.transitionTo('events.new.confirmation')
    }
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('existingCustomFields', this.store.findAll("entity-custom-field") );
  },

  actions: {
    saveTicketsRoute() {
      this.controllerFor('events.new').set('disableConfirmation', false);
      this.transitionTo('events.new.confirmation');
    }
  }
});
