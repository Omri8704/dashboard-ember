import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    let mailing = this.modelFor('emails.email');
    if( mailing.get("status") === "sent" ){
      return this.transitionTo('emails.email.stats');
    }
  },

  model() {
    return this.modelFor('emails.email');
  },
  deactivate() {
    const controller = this.controllerFor('emails.email.message')

    controller.set('openEmailSavedModal', false)
  },
  resetController(controller) {
    controller.set('hasFeedback', false)
  }
});
