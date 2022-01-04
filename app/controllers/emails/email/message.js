import Ember from 'ember';
import moment from 'moment';

const { set } = Ember

export default Ember.Controller.extend({
  settings: Ember.inject.service(),
  session: Ember.inject.service(),
  notify: Ember.inject.service(),
  mailing: Ember.computed.alias('model'),
  hasFeedback: false,

  entityId: Ember.computed({
    get() {
      return localStorage.getItem('entity_id');
    }
  }),

  entityTimeZone: Ember.computed('settings.current_entity.timezone', function() {
    return this.get('settings.current_entity.timezone');
  }),

  sent_at_date: Ember.computed("mailing.sent_at", {
    get: function() {
      if (this.get('mailing.sent_at')) {
        return moment(this.get('mailing.sent_at'));
      }
    },

    set: function(key, date) {
      this.set("mailing.sent_at", date)
      return date
    }
  }),

  actions: {
    saveDateTime(dateTime) {
      set(this, 'sent_at_date', dateTime)
    },

    setSendToTwoDays(){
      const promo = this.get( 'mailing.promotion' )
      this.set( "mailing.sent_at", moment( promo.start_date ).subtract( 48, 'hours' ) );
    },

    sendTestEmail() {
      const email = this.get('mailing');

      email.validate().then( ({ model, validations }) => {
        model.save().then( () => {
          if (validations.get('isValid')){
            model.send_test().then( () => {
              this.get("notify").success("Test email sent, please check your inbox.")
            }).catch( () => {
              this.get("notify").warning("Something wen't wrong sending the email.")
            })
          }else{
            this.set('hasFeedback', true)
            this.get("notify").warning("Please fill out all required fields first.")
          }
        })
        .catch( () => {
          this.get("notify").warning("Something wen't wrong saving the email.")
        });
      });
    },

    saveEmail() {
      const completed_steps = this.get("mailing.completed_steps");

      if (!completed_steps.includes("message")) {
        completed_steps.push("message");
      }

      this.get('mailing')
        .validate()
        .then( ({ model, validations }) => {
          this.set('hasFeedback', true)

          if (validations.get('isValid')) {
            model.save().then( () => {
              this.get("notify").success("Successfully saved Email.")
              this.transitionToRoute('emails.email.finish')
            }).catch( (response) => {
              let errormsg = "There was an issue saving this email."
              if( response && response.errors && response.errors[0] ) errormsg = response.errors[0].detail
              this.get("notify").alert( errormsg )
            })
          }
        })
    },
  }
});
