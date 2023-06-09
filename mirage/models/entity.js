import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  currentUser: belongsTo(),
  campaigns: hasMany()
});
