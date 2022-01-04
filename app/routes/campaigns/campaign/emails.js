import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let campaign_id = this.modelFor("campaigns.campaign").get("id")
    this.set("campaign_id", campaign_id);
    return this.store.query("campaign-email", {
      campaign_ids: [campaign_id]
    });
  },
  actions: {
    createNewEmail(newEmailName) {
      let campaign = this.store.findRecord('campaign', this.get("campaign_id"));
      let emailCampaignScheduledController = this.controllerFor('campaigns.campaign.emails.scheduled');

      emailCampaignScheduledController.set('emailCreateError', '');

      campaign.then( () => {
        return this.store.createRecord("campaign-email", {
          name: newEmailName,
          campaign: campaign,
          status: "created"
        }).save().then( (campaignEmail) => {
          // hack to push onto live record array
          this.modelFor("campaigns.campaign.emails").pushObject(campaignEmail._internalModel);
          this.transitionTo("campaigns.campaign.emails.scheduled.email.audience", campaignEmail.get('id'));

          emailCampaignScheduledController.set('newEmailName', '');
          emailCampaignScheduledController.toggleProperty("newEmailModal");
        }).catch ( (err) => {
          emailCampaignScheduledController.set('emailCreateError', err);
          throw err;
        });
      });
    }
  }
});
