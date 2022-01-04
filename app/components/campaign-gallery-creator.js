import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['campaign-resource-uploader'],
  pickingResource: false,
  store: Ember.inject.service("store"),
  actions: {
    triggerImage() {
      this.set("pickingResource", true)
      this.set("pickingImage", true)
      const store = this.get("store")
      this.set("campaignResource", store.createRecord("campaignImage", {campaign: this.get("campaign")}))
    },

    triggerVideo() {
      this.set("pickingResource", true)
      this.set("pickingVideo", true)
      const store = this.get("store")
      this.set("campaignResource", store.createRecord("campaignVideo", {campaign: this.get("campaign")}))
    },

    saveResource() {
      this.get("campaignResource").save().then( () => {
        this.set("pickingResource", false)
        this.set("pickingImage", false)
        this.set("pickingVideo", false)
      }).catch( () => {
        this.get("campaignResource").deleteRecord()
        this.set("pickingResource", false)
        this.set("pickingImage", false)
        this.set("pickingVideo", false)
      })
    },

    destroyResource() {
      this.set("pickingResource", false)
      this.set("pickingImage", false)
      this.set("pickingVideo", false)
      this.get("campaignResource").deleteRecord()
    }
  }
});
