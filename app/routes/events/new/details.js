import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    saveEventRoute() {
      this.controllerFor('events.new').set('disableTickets', false);
      this.transitionTo('events.new.tickets');
    }
  }
});
