import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    offset: {
      replace: true,
      refreshModel: true
    },
    limit: {
      replace: true,
      refreshModel: true
    },
    search: {
      replace: true,
      refreshModel: true
    }
  },

  model: function(params) {
    return this.store.query('appeal', params);
  },

  setupController(controller) {
    this._super(...arguments);
    controller.reset();
  },

  resetController(controller) {
    controller.reset();
  }

});
