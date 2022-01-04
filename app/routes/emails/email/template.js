import Ember from 'ember';

const { set } = Ember

export default Ember.Route.extend({
  queryParams: {
    limit: {
      replace: true,
      refreshModel: true
    },
    offset: {
      replace: true,
      refreshModel: true
    },
  },

  beforeModel: function() {
    let mailing = this.modelFor('emails.email');
    if( mailing.get("status") === "sent" ){
      return this.transitionTo('emails.email.stats');
    }
  },

  model(params) {
    params.default = false
    return this.store.query('email-template', params)
  },

  resetController(controller) {
    set(controller, 'limit', 8)
    set(controller, 'offset', 0)
  }
});
