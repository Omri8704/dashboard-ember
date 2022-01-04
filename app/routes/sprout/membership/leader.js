import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let fetchCampaign = this.modelFor('sprout.membership').get('campaign').then( (campaign) => { return campaign;});

    let participantsPromise =  fetchCampaign.then( (campaign) => {
      return this.store.query('user_campaign', {
        campaign_id: campaign.get('id')
      }).then ( (participants) => {
        return participants;
      })
    });

    return Ember.RSVP.hash({
      campaign: this.modelFor('sprout.membership').get('campaign'),
      membership: this.modelFor('sprout.membership'),
      participants: participantsPromise
    });
  }
});
