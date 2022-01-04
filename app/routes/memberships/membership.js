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
    }
  },

  model( params ) {
    return this.store.query("user_membership", params)
  },

  resetController(controller) {
    set(controller, 'limit', 10)
    set(controller, 'offset', 0)
  }
});
