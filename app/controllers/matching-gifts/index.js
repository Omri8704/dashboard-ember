import Ember from 'ember';

const {
  Controller,
  computed,
  inject,
  get,
} = Ember;

export default Controller.extend({
  settings: inject.service(),
  queryParams: ['limit', 'offset', 'search_term'],
  limit: 10,
  offset: 0,
  search_term: null,
  search_term_debounce: null,
  matchingGifts: computed.alias('model'),
  count: computed('model', function () {
    const meta = get(this, 'model.meta');
    return meta.count;
  }),

  _setSearchTerm: Ember.observer('search_term_debounce', function () {
    let timer = this.get("debounce_timer")
    if (timer) Ember.run.cancel(timer)
    this.set("debounce_timer", Ember.run.debounce(this, function () {
      if (this.get('search_term_debounce') && this.get('search_term_debounce').length > 0
        && this.get('search_term') != this.get('search_term_debounce')) {
        this.set("offset", 0)
      }
      this.set('search_term', this.get('search_term_debounce'));
    }, 800))
  }),

  actions: {
    changeOffset(offset) {
      this.set('offset', offset);
    },
  },
});
