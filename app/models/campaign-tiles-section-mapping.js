import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  position: DS.attr('number'),

  campaignName: DS.attr('string'),
  campaignStatus: DS.attr('string'),

  campaign: DS.belongsTo('campaign'),
  campaignTilesSection: DS.belongsTo('campaign-tiles-section'),
  positionInitial: Ember.computed('campaignName', function() {
    return this.get('position');
  })
});
