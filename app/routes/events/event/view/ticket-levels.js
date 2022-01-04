import Ember from 'ember';

const { get } = Ember

export default Ember.Route.extend({
  model() {
    return get(this, 'store').query('ticket-level', {
      event: this.modelFor('events.event').get('id')
    })
  }
});
