import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  beforeModel() {
    if (!this.get("session.current_user.super_admin")) {
      this.transitionTo('application')
    }
  }
});
