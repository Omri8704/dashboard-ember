import Ember from 'ember';

const { get, set } = Ember

export default Ember.Route.extend({
  queryParams: {
    limit: {
      replace: true,
      refreshModel: true
    },
    offset: {
      replace: true,
      refreshModel: true
    },
  },

  model(params) {
    const allParams = Object.assign(
      {},
      { event: this.modelFor('events.event').get('id') },
      params
    )

    return get(this, 'store').query('ticket', allParams)
  },

  resetController(controller) {
    set(controller, 'limit', 10)
    set(controller, 'offset', 0)
  }
});
