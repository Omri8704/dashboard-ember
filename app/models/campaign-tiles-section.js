import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  entityPages: DS.attr(),
  campaignTilesSectionMappings: DS.hasMany('campaign-tiles-section-mapping'),
  campaignSelectionStrategy: DS.attr('string'),
  campaign_tile_metric_1_stat: DS.attr('string'),
  campaign_tile_metric_2_stat: DS.attr('string')
});
