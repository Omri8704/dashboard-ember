import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
  goal: [
    validator('number', {
      allowBlank: true,
      allowString: true,
      integer: true,
      gte: 10
    })
  ],
  position: [
    validator('number', {
      allowBlank: true,
      allowString: true,
      integer: true
    })
  ]
})

export default DS.Model.extend(Validations, {
  campaigns: DS.hasMany('campaign'),
  donation: DS.belongsTo('donation'),
  ticketLevels: DS.hasMany('ticket-level'),
  name: DS.attr("string"),
  descr: DS.attr("string"),
  img: DS.attr("string"),
  code: DS.attr("string"),
  percent: DS.attr("number"),
  goal: DS.attr("number"),
  status: DS.attr("string"),
  position: DS.attr("number"),

  // This is some bullshit to address the broken HABTM relationship
  // This allows you to set a single new campaign_id when saving
  // TODO: when proper HABTM gets added to ember data, remove this
  parent_campaign_id: DS.attr("string")
});
