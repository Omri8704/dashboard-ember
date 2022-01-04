import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  defaultTemplates: null,
  templates: Ember.computed.alias('model'),

});
