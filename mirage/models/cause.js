import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  donation: belongsTo(),
  campaigns: hasMany(),
  ticketLevel: hasMany()
});
