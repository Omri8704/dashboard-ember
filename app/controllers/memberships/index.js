import Ember from 'ember';

const {
  Controller,
  inject,
  computed
} = Ember

export default Controller.extend({
  settings: inject.service(),
  queryParams: ['offset','limit'],
  limit: 10,
  offset: 0,
  count: computed('model', function(){
    return this.get("model.meta.count")
  }),
  actions: {
    changeOffset(offset) {
      this.set("offset", offset)
    }
  }
});
