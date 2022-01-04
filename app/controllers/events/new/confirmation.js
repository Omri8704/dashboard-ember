import Ember from 'ember';

const {
  Controller,
  inject,
  computed,
  get
} = Ember

export default Controller.extend({
  notify: inject.service('notify'),
  event: computed.alias('model'),
  ticketLevels: computed.alias('event.ticketLevels'),
  totalTickets: computed('ticketLevels', function() {
    return this.get('ticketLevels').reduce( (previous, current) => {
      if (current.get('numTickets')) {
        return previous + parseInt(current.get('numTickets'))
      }
      return 0;
    }, 0)
  }),

  ticketTypeStr: computed('totalTickets', 'event.noRegistration', function() {
    if (this.get('event.noRegistration') == true) {
      return 'N/A'
    }
    else {
      return this.get('totalTickets')
    }
  }),

  eventSaving: false,

  saveEventFn(toggleProp) {
    this.get('event').validate().then( ({ model, validations }) => {
      if (get(validations, 'isValid')) {
        model.save().then( () => {
          const ticketPromise = []
          this.get('ticketLevels').forEach( (ticketLevel) => ticketPromise.push(ticketLevel.save()))

          Ember.RSVP.all(ticketPromise).then( () => {
            this.toggleProperty(toggleProp)
            this.get('notify').success('Event Saved!')
            this.transitionToRoute('events')
          })
          .catch( (err) => {
            this.toggleProperty(toggleProp)
            this.get('notify').alert('Error saving the Event!')
          })
        })
      }
      else {
        this.get('notify').alert('Error saving the Event!')
      }
    })
  },

  actions: {
    editEvent() {
      this.transitionToRoute('events.new.details')
    },
    saveEvent() {
      this.toggleProperty('eventSaving')

      this.set('event.status', 'saved')

      this.saveEventFn('eventSaving')
    },
    liveEvent() {
      this.toggleProperty('liveSaving')

      this.set('event.status', 'active')

      this.saveEventFn('liveSaving')
    }
  }
});
