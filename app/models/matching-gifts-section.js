import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
  campaign_id: validator('presence', true),
  website_id: validator('presence', true),
});

export default DS.Model.extend(Validations, {
  campaign_id: DS.attr('string'),
  campaign_name: DS.attr('string'),
  name: DS.attr('string'),
  match_selection_strategy: DS.attr('string'),
  website_id: DS.attr('string'),
  matchingGiftsSectionMappings: DS.hasMany('matching-gifts-section-mapping'),
});
