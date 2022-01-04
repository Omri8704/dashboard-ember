import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    page: {
      replace: true,
      refreshModel: true
    },
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
  model(params) {
    return this.store.query('user-segment', params)
  }
});
