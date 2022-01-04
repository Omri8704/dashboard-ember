import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('user_campaign', params.membership_id);
  },

  redirect(model) {
    let role = model.get('role')

    if( role && role.indexOf('leader') >= 0 ) {
      this.transitionTo('sprout.membership.leader');
    }else if( role.indexOf('participant') >= 0 ){
      this.transitionTo('sprout.membership.contacts');
    }else {
      this.transitionTo('sprout');
    }
  }
});
