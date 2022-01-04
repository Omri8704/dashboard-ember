import Ember from 'ember';

const { set } = Ember

export default Ember.Route.extend({
  queryParams: {
    email: {
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
    }
  },
  model(params) {
    return this.store.query('donation', params);
  },
  reset: (function() {
    return this.get("controller").reset();
  }).on("deactivate"),

  resetController(controller) {
    set(controller, 'email', null)
    set(controller, 'limit', 10)
    set(controller, 'offset', 0)
  }
});
