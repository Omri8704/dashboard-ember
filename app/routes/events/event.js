import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('event', params.event_id, { reload: true })
  },

  deactivate() {
    let model = this.get('currentModel');
    if (model.get("isNew")) {
      model.rollBackAttributes()
    }

    this.controllerFor('events.event.details').set('canShowErrors', false)
    this.controllerFor('events.event.tickets').set('canShowErrors', false)
  }
});
