import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const { Model, belongsTo, hasMany, attr } = DS

const Validations = buildValidations({
  name: validator('presence', true),
  numTickets: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      integer: true,
      positive: true,
      lt: 100000000
    }),
  ],
  amount: [
    validator('conditional-ticket-amount')
  ]
});

const TicketLevel = Model.extend(Validations, {
  entityCustomFields: hasMany('entityCustomField'),
  event:              belongsTo("event"),
  cause:              belongsTo('cause', { async: true }),
  sold:               attr("number"),
  name:               attr("string"),
  description:        attr("string"),
  amount:             attr("number"),
  numTickets:         attr("number"),
  category:           attr('string'),
  accountingCode:     attr('string'),
  hideDescription:    attr('boolean', { defaultValue: false })
});

export default TicketLevel
