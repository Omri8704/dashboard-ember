import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  filter: belongsTo(),
  campaign: belongsTo(),
  emailTemplate: belongsTo(),
  userSegment: belongsTo()
});
