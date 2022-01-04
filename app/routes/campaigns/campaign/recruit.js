import Ember from 'ember';
export default Ember.Route.extend({
  queryParams: {
    page: {
      replace: true,
      refreshModel: true
    },
    offset: {
      replace: true,
      refreshModel: true
    },
    limit: {
      replace: true,
      refreshModel: true
    },
    status: {
      replace: true,
      refreshModel: true
    },
    query: {
      replace: true,
      refreshModel: true
    }
  },

  model(params) {
    let campaign = this.modelFor('campaigns.campaign')
    params.campaign_id = campaign.id

    return Ember.RSVP.hash({
      campaign: campaign,
      userCampaigns: this.store.query("user_campaign", params)
    });
  }
});
