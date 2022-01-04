import Ember from 'ember';

export default Ember.Controller.extend({
  campaign: Ember.computed.alias("model"),
  notify: Ember.inject.service(),
  session: Ember.inject.service(),
  campaignImages: Ember.computed.filterBy('campaign.campaignImages', 'isNew', false),
  campaignVideos: Ember.computed.filterBy('campaign.campaignVideos', 'isNew', false),
  actions: {
    saveCampaign() {
      this.get("campaign").save()
    },
    updateVideo(video) {
      video.save()
        .then(() => {
          this.get("notify").success('Successfully Saved.')
        })
        .catch(() => {
          this.get("notify").alert('Error Saving.')
        });
    },
    udateImage(image) {
      image.save()
        .then(() => {
          this.get("notify").success('Successfully Saved.')
        })
        .catch(() => {
          this.get("notify").alert('Error Saving.')
        });
    },
    removeImage(image) {
      image.deleteRecord();
      image.save();
    },
    removeVideo(video) {
      video.deleteRecord();
      video.save();
    }
  }
});
