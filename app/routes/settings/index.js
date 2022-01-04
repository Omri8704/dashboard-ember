import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.transitionTo('settings.account.index');
  }
});
