import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
});

const EntityCustomValue = DS.Model.extend(Validations, {
  name: DS.attr('string'),
  entityCustomField: DS.belongsTo('entity-custom-field', { async: false })
});


export default EntityCustomValue
