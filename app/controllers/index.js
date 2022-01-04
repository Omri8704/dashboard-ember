import Ember from 'ember';

export default Ember.Controller.extend({
  settings: Ember.inject.service(),
  campaigns: Ember.computed.alias('model'),
  entity: Ember.computed.alias('settings.current_entity'),
  //set in setupcontroller
  isLeader: null
});
