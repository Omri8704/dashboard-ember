import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
  campaign_id: validator('presence', true),
  website_id: validator('presence', true),
  email_failed_charge: [
    validator('presence', true),
    validator('format', {
      regex: /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/,
      message: 'Please enter a valid email address'
    })
  ],
});

export default DS.Model.extend(Validations, {
  campaign_id: DS.attr('string'),
  campaign_name: DS.attr('string'),
  name: DS.attr('string'),
  match_selection_strategy: DS.attr('string'),
  email_failed_charge: DS.attr('string'),
  website_id: DS.attr('string'),
  matchingGiftsSectionMappings: DS.hasMany('matching-gifts-section-mapping'),
});
