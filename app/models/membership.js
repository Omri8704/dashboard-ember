import DS from 'ember-data';

import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name:     validator('presence', true),
  dues:     validator('presence', true),
})

const Membership = DS.Model.extend(Validations, {
  user_memberships:   DS.hasMany("user-membership"),
  name:               DS.attr("string"),
  external_id:        DS.attr("string"),
  dues:               DS.attr("number"),
  lifetime:           DS.attr("boolean"),
  num_months:         DS.attr("number"),
  status:             DS.attr("string"),
  reply_to:           DS.attr("string")
});

export default Membership;
