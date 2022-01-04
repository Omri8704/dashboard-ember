import Ember from 'ember';

const {
  Controller,
  computed,
  inject,
  get
} = Ember

export default Controller.extend({
  queryParams: ['limit', 'offset', 'search_term', 'status', 'only_parent_campaigns'],
  limit: 10,
  offset: 0,
  search_term: null,
  search_term_debounce: null,
  status: null,
  only_parent_campaigns: true,
  statuses: [
    'active',
    'pending',
    'staging',
    'closed'
  ],
  campaigns: computed.alias('model'),
  session: inject.service(),
  settings: inject.service(),
  count: computed('model', function(){
    let meta = get(this, "model.meta")
    return meta.count
  }),

  _setSearchTerm: Ember.observer('search_term_debounce', function() {
    let timer = this.get("debounce_timer")
    if( timer ) Ember.run.cancel( timer )
    this.set("debounce_timer", Ember.run.debounce(this, function(){
      this.set('search_term', this.get('search_term_debounce'));
    }, 400 ))
  }),

  actions: {
    changeOffset(offset){
      this.set("offset",offset)
    }
  }
});
