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
  matchingGiftsSections: (function () {
    return this.store.findAll('matching-gifts-section');
  }).property(),
  count: computed('model', function () {
    const meta = get(this, 'model.meta');
    return meta.count;
  }),

  _setSearchTerm: Ember.observer('search_term_debounce', function () {
    const timer = this.get('debounce_timer');
    if (timer) Ember.run.cancel(timer);
    this.set('debounce_timer', Ember.run.debounce(this, function () {
      this.set('search_term', this.get('search_term_debounce'));
    }, 400));
  }),

  actions: {
    changeOffset(offset) {
      this.set('offset', offset);
    },
  },
});
