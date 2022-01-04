import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
  external_id: validator('presence', true)
})

export default DS.Model.extend(Validations, {
  name: DS.attr("string"),
  external_id: DS.attr("string"),
});
