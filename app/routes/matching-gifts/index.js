import Ember from 'ember';
import { task } from 'ember-concurrency';

const { set, get } = Ember;

export default Ember.Route.extend({
  queryParams: {
    limit: {
      replace: true,
      refreshModel: true,
    },
    offset: {
      replace: true,
      refreshModel: true,
    },
    search_term: {
      replace: true,
      refreshModel: true,
    },
  },
  model(params) {
    return this.get('modelTask').perform(params);
  },
  modelTask: task(function* (params) {
    const controller = this.get('controller');
    if (controller) {
      controller.set('loading', true);
    }
    const result = yield this.store.query('matching-gift', params);
    return result;
  }).keepLatest(),

  afterModel() {
    const controller = this.get('controller');
    if (controller) { controller.set('loading', false); }
  },

  setupController(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);
    set(controller, 'search_term_debounce', get(controller, 'search_term'));
  },

  resetController(controller) {
    set(controller, 'limit', 10);
    set(controller, 'offset', 0);
    set(controller, 'search_term', '');
    set(controller, 'status', null);
    set(controller, 'search_term_debounce', null);

    const timer = get(controller, 'debounce_timer');
    if (timer) Ember.run.cancel(timer);
    set(controller, 'debounce_timer', null);
  },
});
