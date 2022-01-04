import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      campaignTilesSection: this.get('store').findRecord('campaign-tiles-section', params.id, { reload: true }),
      campaigns: this.get('store').findAll('campaign'),
    })
  }
});
