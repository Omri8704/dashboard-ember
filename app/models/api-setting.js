import DS from 'ember-data';

export default DS.Model.extend({
  amploApiToken: DS.attr("string"),
  amploApiWebhookUrl: DS.attr("string"),
  amploApiVersion: DS.attr("string")
});
