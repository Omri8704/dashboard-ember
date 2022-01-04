import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  currentPath: 'null',
  current_entity: null
});
