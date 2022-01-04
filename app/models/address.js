// Generated by CoffeeScript 1.10.0
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

var Address, string;

string = DS.attr("string");

const Validations = buildValidations({
  address1: validator('presence', true),
  city: validator('presence', true),
  region: validator('presence', true),
  zip: validator('presence', true),
  country: validator('presence', true),
})

Address = DS.Model.extend(Validations, {
  address1: string,
  address2: string,
  city: string,
  region: string,
  zip: string,
  country: string,
  cell_phone: string,
  user: DS.belongsTo("user", {
    async: true
  })
});

export default Address;
