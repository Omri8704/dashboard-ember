import Ember from 'ember';

const { get, inject } = Ember;

export default Ember.Controller.extend({
  settings: inject.service(),
  campaign: Ember.computed.alias('model'),
  current_user: Ember.computed.alias('model.current_user'),
  session: Ember.inject.service(),
  notify: Ember.inject.service(),

  statuses: [
    'active',
    'pending',
    'staging',
    'closed'
  ],

  auto_remind_options: ['interaction', 'scheduled'],

  campaignLink: Ember.computed("model.hasDirtyAttributes", function() {
    return "/campaigns/" + (this.model.get("slug"));
  }),

  campaignOptions: Ember.computed('settings.current_entity.campaigns', 'campaign.id', function () {
    this.store.query('campaign', {});
    const items = this.get('settings.current_entity.campaigns'),
      list = items.toArray();
    const newCampaignList = [];
    const currentCampaignId = this.get('campaign.id');

    list.forEach(function (item) {
      if (item.id != currentCampaignId) {
        newCampaignList.push(item)
      }
    });

    return newCampaignList || [];
  }),

  parentCampaign: Ember.computed('campaign.parent_campaign', function() {
    return this.get('campaign.parent_campaign');
  }),

  isInteraction: Ember.computed('campaign.auto_remind.[]', function() {
    if (get(this, 'campaign.auto_remind')) {
      return get(this, 'campaign.auto_remind').includes('interaction')
    }
  }),

  entityTimeZone: Ember.computed('settings.current_entity.timezone', function() {
    return this.get('settings.current_entity.timezone');
  }),

  isLeaderOfCurrentCampaign: Ember.computed('current_user', 'campaign', function() {
    const current_campaign_id = this.get('campaign.id');
    const campaign_ids_for_leader = this.get('current_user.leader_of_campaign_ids');

    return campaign_ids_for_leader && campaign_ids_for_leader.includes(current_campaign_id);
  }),

  isCampaignDashboardToolbar: Ember.computed("settings.current_entity.features_enabled", function () {
    const featuresEnabled = this.get("settings.current_entity.features_enabled")
    return featuresEnabled.includes('campaign_dashboard_toolbar');
  }),

  actions: {
    updateCampaign: function(campaign) {
      return campaign.validate({
        on: [
          'name',
          'goal',
          'start_date',
          'end_date',
        ]
      }).then(({ model }) => {
        if (model.get('isValid')) {
          model.save().then(() => {
            this.get('notify').success("Campaign Saved.")
          })
          .catch( () => {
            this.get('notify').alert("Error Saving Campaign.")
          })
        }
      })
    },
    updateParentCampaign: function(parentCampaign) {
      this.set('campaign.parent_campaign', parentCampaign)
      this.set('campaign.parent_campaign_id', parentCampaign.id)
    },
  }
});
