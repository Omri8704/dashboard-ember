// Generated by CoffeeScript 1.10.0
import DS from 'ember-data';
var CampaignVideo;

CampaignVideo = DS.Model.extend({
  campaign: DS.belongsTo('campaign', { async: false }),
  position: DS.attr('number'),
  name: DS.attr('string')
});

export default CampaignVideo;
