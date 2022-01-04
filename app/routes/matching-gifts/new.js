import Ember from 'ember';

export default Ember.Route.extend({
  settings: Ember.inject.service(),
  model() {
    return this.store.createRecord('matching-gift', {});
  },
});
