import Ember from 'ember';
import { task } from 'ember-concurrency';

const { set, get } = Ember

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
    status: {
      replace: true,
      refreshModel: true
    },
    search_term: {
      replace: true,
      refreshModel: true
    },
    only_parent_campaigns: {
      replace: true,
      refreshModel: true
    }
  },
  model(params){
    return this.get('modelTask').perform(params)
  },
  modelTask: task( function * (params) {
    const controller = this.get('controller')
    if (controller) {
      controller.set('loading', true)
    }
    const result = yield this.store.query('campaign', params)
    return result
  }).keepLatest(),

  afterModel() {
    const controller = this.get('controller')
    if (controller) {
      controller.set('loading', false)
      setTimeout( function(){ $(".autofocus").focus() }, 50); // hackey af. but it works.
    }
  },

  setupController: function(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);
    set(controller, 'search_term_debounce', get(controller, 'search_term') )
  },

  resetController(controller) {
    set(controller, 'limit', 10)
    set(controller, 'offset', 0)
    set(controller, 'search_term', null)
    set(controller, 'status', null)
    set(controller, 'search_term_debounce', null)

    let timer = get( controller, "debounce_timer")
    if( timer ) Ember.run.cancel( timer )
    set(controller, 'debounce_timer', null)
  }

});
