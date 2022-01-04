import DS from 'ember-data';
import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const { attr, belongsTo, hasMany, Model } = DS

const Validations = buildValidations({
  label: [
    validator('presence', true),
    validator('ds-error')
  ],
});

const EntityCustomField = Model.extend(Validations, {
  name: attr('string'),
  label: attr('string'),
  htmlControl: attr('string'),
  storedWith: attr('string'),

  entity: belongsTo('entity'),
  events: hasMany('event'),
  // memberships: hasMany('membership', { async: true}),
  ticketLevels: hasMany('ticket-level'),
  entityCustomValues: hasMany('entity-custom-value'),
  name_for_dropdown: Ember.computed('label', function() {
    return this.get("label") + " [" + this.get("htmlControl") + "]"
  })
});

export default EntityCustomField
