import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  entity: belongsTo(),
  mailings: hasMany()
});
