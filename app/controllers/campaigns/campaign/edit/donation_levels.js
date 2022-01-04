import Ember from 'ember';

export default Ember.Controller.extend({
  notify: Ember.inject.service(),
  campaign: Ember.computed.alias('model'),
  donationLevels: Ember.computed.filterBy('campaign.donationLevels', 'isNew', false),

  actions: {
    addDonationLevel(donationLevel){
      const campaign = this.get("campaign")
      donationLevel.set("campaign", campaign)
      donationLevel.save()
        .then( () => {
          this.set("newDonationLevel", campaign.store.createRecord("donation_level"))
          this.get("notify").success("Donation Level saved.")
        }).catch((err)=>{
          donationLevel.set("campaign",false)
        })
    },
    deleteDonationLevel(donationLevel){
      donationLevel.destroyRecord().then( ()=> {
        this.get("notify").success("Donation Level deleted.")
      })
    },
    saveCampaign(donationLevel){
      donationLevel.save()
        .then( () => {
          this.get("notify").success("Donation Level updated.")
        }).catch( (err) => {
        })
    }
  }
})
