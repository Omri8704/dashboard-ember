import Ember from 'ember';

const { Controller, inject, computed, computed: { alias }, get } = Ember

export default Controller.extend({
  settings: inject.service('settings'),
  entity: alias('settings.current_entity'),
  event: alias('model'),
  notify: Ember.inject.service(),

  ticketLevels: alias('event.ticketLevels'),
  totalAmount: computed('ticketLevels', function() {
    return get(this, 'ticketLevels').reduce( (prev, current) => {
      return prev + ( get(current, 'amount') ) * ( get(current, 'sold') )
    }, 0)
  }),

  totalSold: computed('ticketLevels', function() {
    return get(this, 'ticketLevels').reduce( (prev, current) => {
      return prev + parseInt(get(current, 'sold'))
    }, 0)
  })
});
