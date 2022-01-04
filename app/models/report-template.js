
import Ember from 'ember';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import moment from 'moment'

const Validations = buildValidations({
  name: [
    validator('presence', {
      presence: true,
      message: 'name is required'
    }),
  ]
});

export default DS.Model.extend(Validations, {
  name: DS.attr('string'),
  createdAt: DS.attr('string'),

  headers: DS.attr({defaultValue: function() { return [] }}),

  entity: DS.belongsTo('entity'),
  valueIds: DS.attr({defaultValue: function() { return [] }}),
  formatterNames: DS.attr(),
  formatterIdsByValue: DS.attr({defaultValue: function() { return {} }}),

  formattedCreatedAt: Ember.computed('createdAt', function() {
    return moment(this.get('createdAt'))
  })
});
