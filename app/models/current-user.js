import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  first_name: validator('presence', true),
  last_name: validator('presence', true),
  email: [
    validator('presence', true),
    validator('format', {
      regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Please enter a valid email address'
    })
  ]
});

export default DS.Model.extend(Validations, {
  campaigns:                DS.hasMany('campaign'),
  entities:                 DS.hasMany('entity', {
    inverse: 'current_user'
  }),
  report_entities:          DS.hasMany('entity', {
    inverse: 'report_user'
  }),
  contacts:                 DS.hasMany('contact'),
  user_campaigns:           DS.hasMany('user-campaign'),
  report_filter: DS.hasMany('report-filter'),

  can_manage_other_admins_entities: DS.attr('string'),

  email:                    DS.attr('string'),
  scoped_entity_id:         DS.attr('string'),
  first_name:               DS.attr('string'),
  last_name:                DS.attr('string'),
  provider:                 DS.attr('string'),
  primary_phone_number:     DS.attr('string'),
  current_password:         DS.attr('string'),
  password:                 DS.attr('string'),
  password_confirmation:    DS.attr('string'),
  open_files_password:      DS.attr('string'),
  created_at:               DS.attr('string'),
  two_factor_authentication_enabled: DS.attr('boolean'),

  sprout_participant:       DS.attr('boolean'),

  image:                    DS.attr('string', {
                              defaultValue: "//placehold.it/150x150"
                            }),
  campaign_admin:           DS.attr('boolean', {
                              defaultValue: false
                            }),
  entity_admin:             DS.attr('boolean', {
                              defaultValue: false
                            }),
  super_admin:              DS.attr('boolean', {
                              defaultValue: false
                            }),
  save_email:               DS.attr('boolean', {
                              defaultValue: false
                            }),
  campaign_ids:             DS.attr({defaultValue: function() { return [] }}),
  user_campaign_ids:        DS.attr({defaultValue: function() { return [] }}),
  leader_of_campaign_ids:   DS.attr({defaultValue: function() { return [] }}),
  get_saved_report_email:   DS.attr({defaultValue: function() { return [] }})
});
