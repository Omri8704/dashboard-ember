import Ember from 'ember';

const {
  Controller,
  inject,
  computed
} = Ember

export default Controller.extend({
  settings: inject.service(),
  queryParams: ['offset','limit', 'search_term'],
  limit: 10,
  offset: 0,
  search_term: null,
  search_term_debounce: null,
  count: computed('model', function(){
    return this.get("model.meta.count")
  }),
  _setSearchTerm: Ember.observer('search_term_debounce', function() {
    let timer = this.get("debounce_timer")
    if( timer ) Ember.run.cancel( timer )
    this.set("debounce_timer", Ember.run.debounce(this, function(){
      this.set('search_term', this.get('search_term_debounce'));
    }, 400 ))
  }),
  actions: {
    changeOffset(offset) {
      this.set("offset", offset)
    }
  }
});
