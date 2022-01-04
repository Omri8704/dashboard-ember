import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: Ember.computed.alias('model'),
  session: Ember.inject.service(),
  settings: Ember.inject.service(),
  actions: {
    forgetAuthToken() {
      this.get('session').invalidate();
    }
  }
});
