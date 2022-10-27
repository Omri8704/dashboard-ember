import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  campaign: validator('presence', true),
  amount: validator('presence', true),
  image: validator('presence', true),
  impact: validator('presence', true)
})

export default DS.Model.extend(Validations, {
  campaign:     DS.belongsTo("campaign"),
  amount:       DS.attr("number"),
  qpq_amount:   DS.attr("number"),
  impact:       DS.attr("string"),
  impact_head:  DS.attr("string",{defaultValue: "Your Donation Impact"}),
  reward:       DS.attr("string"),
  occurrences:  DS.attr("number"),
  image:        DS.attr("string")
});
