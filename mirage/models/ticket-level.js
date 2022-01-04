import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  entityCustomFields: hasMany(),
  event:              belongsTo(),
  cause:              belongsTo(),
});
