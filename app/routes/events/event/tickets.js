import Ember from 'ember';

export default Ember.Route.extend({
  afterModel(model) {
    if (model.get('noRegistration') == true) {
      this.transitionTo('events.event.confirmation')
    }
  }
});
