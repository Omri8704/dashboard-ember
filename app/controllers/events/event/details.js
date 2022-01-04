import Ember from 'ember';

const {
  Controller,
  computed,
  inject,
  set
} = Ember

export default Controller.extend({
  settings: inject.service(),
  event: computed.alias('model'),

  init(){
    this._super(...arguments);
    if( this.get("settings.current_entity.raisers_edge_integration") ){
      set( this, "initiatives", this.store.findAll("initiative") )
      set( this, "appeals", this.store.findAll("appeal") )
    }
  },

  toolTipText: `On this step you can add the key event details. Don't have every
    detail right now? No problem, you can save and update the event later.
    Keep in mind that the event registration dates are different than the actual
    event date, they dictate when registrations are accepted.`,

  entityTimeZone: Ember.computed('settings.current_entity.timezone', function() {
    return this.get('settings.current_entity.timezone');
  }),

  actions: {
    saveEvent() {
      this.set('canShowErrors', true);
      this.get('event').validate().then( ({ validations }) => {
        if (validations.get('isValid')) {
          this.get('event').save().then( () => {
            if (this.get('event.noRegistration') == true) {
              this.transitionToRoute('events.event.confirmation')
            }
            else {
              this.transitionToRoute('events.event.tickets')
            }
          })
        }
      })
    },
    startDate(date) {
      this.set('event.start_date', date)
    },
    endDate(date) {
      this.set('event.end_date', new Date(date).toISOString())
    },
    registrationStart(date) {
      this.set('event.registration_start', new Date(date).toISOString())
    },
    registrationEnd(date) {
      this.set('event.registration_end', new Date(date).toISOString())
    },
    fileUpload(file, base64) {
      this.set('event.img', base64)
    }
  }
});
