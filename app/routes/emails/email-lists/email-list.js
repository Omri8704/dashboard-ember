import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    limit: {
      replace: true,
    },
    offset: {
      replace: true,
    }
  },
  setupController(controller) {
    this._super(...arguments)
    controller.reset()
    controller.listUsersQuery()
  },
  model(params) {
    return this.store.findRecord("user-segment", params.id)
  }
});
