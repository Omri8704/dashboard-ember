import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
      return this.store.queryRecord('entity-bbms-configuration', params);
    },
});