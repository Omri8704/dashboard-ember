import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true)
});

export default DS.Model.extend(Validations, {
  appeal_ids:        DS.attr('string'),
  beneficiaries:     DS.attr({ defaultValue: [] }),
  select:            DS.attr('string'),
  cause_ids:         DS.attr('string'),
  don_type:          DS.attr('string'),
  end_time:          DS.attr('string'),
  num_days:          DS.attr('number'),
  page:              DS.attr('number'),
  per:               DS.attr('number'),
  recurring:         DS.attr('string'),
  rep_type:          DS.attr('string', { defaultValue: 'Campaign' }),
  start_time:        DS.attr('string'),
  name:              DS.attr('string'),
  disable_overview:  DS.attr('boolean'),
  current_user:      DS.belongsTo('current_user', { async: true }),
  entity:            DS.belongsTo('entity', { async: true }),
});
