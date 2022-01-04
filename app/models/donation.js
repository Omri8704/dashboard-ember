import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import { memberAction } from 'ember-api-actions';

var boolean, number, string;
string  = DS.attr("string");
number  = DS.attr("number");
boolean = DS.attr("boolean");

const Validations = buildValidations({
  campaign: [
    validator('presence', true),
    validator('ds-error')
  ],
  don_type: validator('presence', true),
  amount: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      positive: true
    })
  ],
  check_number: [
    validator('conditional-don-type', {
      donType: 'check'
    }),
    validator('number', {
      allowBlank: true,
      allowString: true,
      gte: 1
    })
  ]
});

export default DS.Model.extend(Validations, {
  amount: number,
  public: DS.attr("boolean", {
    defaultValue: true
  }),
  status: string,
  refundable: boolean,
  don_type: string,
  note: string,
  interval: string,
  occurrences: number,
  check_number: number,
  created_at: string,
  cause_names: string,
  grad_year: number,
  affinities: DS.attr(),
  spreedly_cc_token: string,

  campaign: DS.belongsTo('campaign', {
    async: true
  }),
  user: DS.belongsTo('user', {
    async: true
  }),
  causes: DS.hasMany('cause', {
    async: true
  }),
  refund: memberAction({
    path: 'refund'
  })
});
