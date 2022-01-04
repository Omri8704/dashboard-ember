import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord("event")
  },
  deactivate() {
    const model = this.modelFor('events.new');

    if (model.get("isNew")) {
      model.get('ticketLevels').forEach( (ticketLevel) => {
        if (ticketLevel.get('isNew')) {
          ticketLevel.deleteRecord();
        }
      })

      model.deleteRecord()
    }

    this.controllerFor('events.new.details').set('canShowErrors', false)
    this.controllerFor('events.new.tickets').set('canShowErrors', false)
    this.controllerFor('events.new').set('disableTickets', true)
    this.controllerFor('events.new').set('disableConfirmation', true)

  }
});
