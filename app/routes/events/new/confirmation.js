import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    // possible refactor into service object
    if (this.controllerFor('events.new').get('disableConfirmation') === true) {
      this.transitionTo('events.new.details')
    }
  }
});
