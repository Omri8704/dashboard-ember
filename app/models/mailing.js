import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import { memberAction } from 'ember-api-actions';

const string = DS.attr('string');

const Validations = buildValidations({
  name: validator('presence', true),
  promotion: validator('presence', true),
  subject: validator('presence', true),
  sent_at: validator('presence', true),
  reply_to: validator('format', {
    allowBlank: true,
    type: 'email',
    allowNonTld: true
  })
});

export default DS.Model.extend(Validations, {
  send_test: memberAction({
    path: 'send_test'
  }),
  clone: memberAction({
    path: 'clone',
    type: 'post'
  }),
  name:         string,
  sender_name:  string,
  subject:      string,
  header:       string,
  body:         string,
  sent_at:      string,
  reply_to:     string,
  image:        string,
  status:       string,
  total_sends:  string,
  total_value:  string,
  completed_steps: DS.attr('by-day-hash', {
    defaultValue: function() {
      return []
    }}
  ),
  template:        DS.attr('string', { defaultValue: 'template1' }),
  promotion_type:  DS.attr('string'),
  promotion:       DS.belongsTo('promotion', { async: true,
                                               polymorphic: true}),
  filter:          DS.belongsTo('filter', { async: false }),
  users:           DS.hasMany('user', { async: true }),
  emailTemplate:   DS.belongsTo('email-template', { async: true }),
  userSegment:     DS.belongsTo('user-segment', { async: true })
});
