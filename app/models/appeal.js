import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
  label: validator('presence', true),
})

export default DS.Model.extend(Validations, {
  name: DS.attr("string"),
  label: DS.attr("string"),
  external_id: DS.attr("string"),

  entity: DS.belongsTo('entity', {
    async: true
  }),
  campaigns: DS.hasMany('campaign', {
    async: true
  }),
  appeals: DS.hasMany('appeal', {
    async: true
  })

});
