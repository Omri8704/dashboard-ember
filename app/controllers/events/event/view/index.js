import Ember from 'ember';

export default Ember.Controller.extend({
  event: Ember.computed.alias('model'),
  ticketLevels: Ember.computed.alias('event.ticketLevels'),

  settings: Ember.inject.service(),

  eventUrl: Ember.computed('settings', 'event', function() {
    return `https://${this.get('settings.current_entity.host')}/events/${this.get('event.slug')}`
  }),

  fractionSold: Ember.computed('event', function() {
    return parseFloat(this.get('totalSold')) / parseFloat(this.get('event.capacity'))
  }),

  totalAmount: Ember.computed('ticketLevels', function() {
    return this.get('ticketLevels').reduce( (prev, current) => {
      return prev + ( current.get('amount') ) * ( current.get('sold') )
    }, 0)
  }),

  totalSold: Ember.computed('ticketLevels', function() {
    return this.get('ticketLevels').reduce( (prev, current) => {
      return prev + parseInt(current.get('sold'))
    }, 0)
  })
});
