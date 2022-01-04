import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['limit', 'offset'],
  limit: 10,
  offset: 0,

  settings: Ember.inject.service(),
  contacts: Ember.computed.alias('model.contacts'),
  membership: Ember.computed.alias('model.membership'),

  count: Ember.computed('model.contacts', function(){
    let meta = this.get("model.contacts.meta")
    return meta.count
  }),

  actions: {
    changeOffset(offset){
      this.set("offset", offset)
    }
  }
});
