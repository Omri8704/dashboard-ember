import Ember from 'ember';

export default Ember.Controller.extend({
  notify: Ember.inject.service('notify'),
  event: Ember.computed.alias('model'),
  ticketLevels: Ember.computed.alias('event.ticketLevels'),
  totalTickets: Ember.computed('ticketLevels', function() {
    return this.get('ticketLevels').reduce( (previous, current) => {
      if (current.get('numTickets')) {
        return previous + parseInt(current.get('numTickets'))
      }
      return 0;
    }, 0)
  }),

  ticketTypeStr: Ember.computed('totalTickets', 'event.noRegistration', function() {
    if (this.get('event.noRegistration') == true) {
      return 'N/A'
    }
    else {
      return this.get('totalTickets')
    }
  }),

  eventSaving: false,

  actions: {
    editEvent() {
      this.transitionToRoute('events.event.details')
    },
    saveEvent() {
      this.toggleProperty('eventSaving')

      this.set('event.status', 'saved')

      this.get('event')
        .save()
        .then( () => {
          const ticketPromise = []
          this.get('ticketLevels').forEach( (ticketLevel) => ticketPromise.push(ticketLevel.save()))

          Ember.RSVP.all(ticketPromise)
            .then( () => {
              this.toggleProperty('eventSaving')
              this.get('notify').success('Event Saved!')
              this.transitionToRoute('events')
            })
            .catch( (err) => {
              this.toggleProperty('eventSaving')
              this.get('notify').alert('Error saving the Event!')
            })
        })
        .catch( (err) => {
          this.toggleProperty('eventSaving')
          this.get('notify').alert('Error saving the Event!')
        })
    },
    liveEvent() {
      this.toggleProperty('liveSaving')

      this.set('event.status', 'active')

      this.get('event').save().then( () => {
        const ticketPromise = []
        this.get('ticketLevels').forEach( (ticketLevel) => ticketPromise.push(ticketLevel.save()))

        Ember.RSVP.all(ticketPromise).then( () => {
          this.toggleProperty('liveSaving')
          this.get('notify').success('Event Saved!')
          this.transitionToRoute('events')
        })
      })
    }
  }
});
