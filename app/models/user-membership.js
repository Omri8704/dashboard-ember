import DS from 'ember-data';

import { memberAction } from 'ember-api-actions';

export default DS.Model.extend({
  user:            DS.belongsTo("user", {async: true}),
  start_date:      DS.attr("string"),
  end_date:        DS.attr("string"),
  external_id:     DS.attr("string"),
  is_renewal:      DS.attr("boolean"),
  dues:            DS.attr("number"),
  amount:          DS.attr("number"),
  status:          DS.attr("string"),
  refundable:      DS.attr("boolean"),

  refund:          memberAction({ path: 'refund' })
});
