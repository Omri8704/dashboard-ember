import Ember from 'ember';

const {
  Controller,
  computed,
  inject
} = Ember

export default Controller.extend({
  notify: inject.service('notify'),
  tilesSection: computed.alias('model.campaignTilesSection'),
  campaignMappings: computed.alias('tilesSection.campaignTilesSectionMappings'),

  loadingSearchCampaigns: false,

  _allCampaigns: computed.alias('model.campaigns'),

  selectedCampaigns: Ember.A(),
  selectedCampaignTileMetric1: computed.alias('model.campaignTilesSection.campaignTileMetric1'),
  selectedCampaignTileMetric2: computed.alias('model.campaignTilesSection.campaignTileMetric2'),
  displayMappableCampaigns: computed.sort('mappableCampaigns', function(a, b) {
    if (a.get('name') > b.get('name')) { return 1 }
    if (a.get('name') < b.get("name")) { return -1 }
    return 0
  }),
  displayStatOptions: computed(function() {
    return [
      {
        label: 'Automatic',
        value: 'automatic'
      },
      {
        label: '# of donors',
        value: 'unique_donors_count',
      },
      {
        label: '# of donations',
        value: 'donations_count',
      },
      {
        label: '# of donations labeled as gifts',
        value: 'donations_as_gifts_count',
      },
      {
        label: 'Based on the campaign type',
        value: 'goal_progress',
      },
      {
        label: '$ Raised',
        value: 'total_raised',
      },
      {
        label: '# of Votes',
        value: 'votes_count',
      },
      {
        label: '$ Raised Family',
        value: 'total_raised_family'
      }
    ]
  }),
  mappableCampaigns: computed('campaignMappings', '_allCampaigns', 'selectedCampaigns', function() {
    const selectedIds = this.get('selectedCampaigns').map( campaign => campaign.get('id'))
    const mapIds = this.get('campaignMappings').map( mapping => mapping.get('campaign.id'))

    const uniqueCampaigns = this.get('_allCampaigns').filter( campaign => {
      const isAlreadySelected = selectedIds.includes(campaign.get('id'))
      const alreadyHasMapping = mapIds.includes(campaign.get('id'))
      return !(isAlreadySelected || alreadyHasMapping)
    })

    return uniqueCampaigns
  }),
  sortedCampaignMappings: Ember.computed('campaignMappings', function() {
    if (this.get('campaignMappings')) {
      return this.get('campaignMappings').sortBy('position').reverse();
    }
    else {
      return [];
    }
  }),
  actions: {
    addCampaignsToMapping() {
      const campaignPromises = this.get('selectedCampaigns').map( campaign => {
        return this.get('store').createRecord('campaign-tiles-section-mapping', {
          position: campaign.get('position') || 0,
          campaign: campaign,
          campaignTilesSection: this.get('tilesSection')
        }).save()
      })

      Ember.RSVP.all(campaignPromises).then( () => {
        const campaignsWithoutMappings = this.get('mappableCampaigns').filter( campaign => !campaign.get('checked'))
        this.set('mappableCampaigns', campaignsWithoutMappings)
        this.set('selectedCampaigns', Ember.A())
        this.get("notify").success('Added campaigns to campaign tiles')
        this.set('sortedCampaignMappings', this.get('campaignMappings').sortBy('position').reverse());
      })
      .catch( () => {
        this.get("notify").error('Error adding campaigns to campaign tiles')
      })
    },

    updateMapping(campaignMapping) {
      const mapping = this.get('store').peekRecord('campaign-tiles-section-mapping', campaignMapping.get('id'))

      mapping.save()
      .then( () => {
        this.get("notify").success('Campaign updated')
        this.set('sortedCampaignMappings', this.get('campaignMappings').sortBy('position').reverse());
      })
      .catch( () => {
        this.get("notify").error('Error updating campaign')
      })
    },
    selectTileMetric1(stat) {
      this.send('saveTileMetric', 'campaign_tile_metric_1_stat', stat.value);
    },
    selectTileMetric2(stat) {
      this.send('saveTileMetric', 'campaign_tile_metric_2_stat', stat.value);
    },
    saveTileMetric(field, value) {
      let tilesSection = this.get('store').peekRecord('campaign-tiles-section', this.get('tilesSection').get('id'))
      tilesSection.set(field, value)
      tilesSection.save()
      .then( () => {
        this.get("notify").success('Campaign Tiles Section metric updated!')
      })
      .catch( () => {
        this.get("notify").error('There was an error updating the stat.')
      })
    },
    selectCampaign(campaign) {
      this.set('selectedCampaigns', campaign)
    },
    destroyMapping(campaignMapping) {
      const mapping = this.get('store').peekRecord('campaign-tiles-section-mapping', campaignMapping.get('id'))

      mapping.destroyRecord()
      .then( () => {
        this.get("notify").success('Removed Campaign')
        this.set('sortedCampaignMappings', this.get('campaignMappings').sortBy('position').reverse());
      })
      .catch( () => {
        this.get("notify").error('Error removing campaign')
      })
    }
  }
});
