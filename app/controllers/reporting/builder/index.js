import Ember from 'ember';

const {
  Controller,
  inject,
  computed,
} = Ember

export default Controller.extend({
  settings: inject.service(),
  templates: Ember.computed.alias('model.templates'),
  reportSchedules: Ember.computed.alias('model.reportSchedules'),
});
