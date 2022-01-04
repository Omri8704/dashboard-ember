import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';
import { validator, buildValidations } from 'ember-cp-validations';

const { attr, belongsTo, hasMany } = DS

const Validations = buildValidations({
  first_name: validator('presence', true),
  last_name:  validator('presence', true),
  email: [
    validator('presence', true),
    validator('format', {
      regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Please enter a valid email address'
    })
  ]
});

export default DS.Model.extend(Validations, {
  entity:         belongsTo('entity'),
  address:        belongsTo('address'),
  mailing:        belongsTo('mailing'),
  donations:      hasMany('donation'),
  user_campaigns: hasMany('user-campaign', { async: true}),
  invite_leader:  memberAction({
    path: 'invite_leader'
  }),
  external_id:    attr('string'),
  prospect_id:    attr('string'),
  user_id:        attr('string'),
  email:          attr('string'),
  first_name:     attr('string'),
  last_name:      attr('string'),
  image:          attr('string', {
    defaultValue: "//placehold.it/150x150"
  }),
  provider:       attr('string'),
  subscribed_user_segments:  hasMany('user-segment'),

  current_sign_in_at: attr("string")
});
