import Ember from 'ember';
export default Ember.Route.extend({
  beforeModel: function() {
    let mailing = this.modelFor('emails.email');
    if( mailing.get("status") === "sent" ){
      return this.transitionTo('emails.email.stats');
    }else{
      return this.transitionTo('emails.email.audience');
    }
  },


})
