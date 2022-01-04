import DS from 'ember-data';
import { buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
})

export default DS.Model.extend(Validations, {
  user_campaign: DS.belongsTo("user-campaign", { async: true }),
  amount:        DS.attr("number"),
  referer_url:   DS.attr("string"),
  landing_url:   DS.attr("string"),
  donor_name:    DS.attr("string"),
  donor_email:   DS.attr("string"),
});
