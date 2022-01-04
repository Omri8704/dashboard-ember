import Ember from 'ember';
import EmberUploader from 'ember-uploader';
import CONFIG from '../config/environment';

const { get } = Ember

export default Ember.Component.extend({
  settings: Ember.inject.service(),
  init(){
    this._super(...arguments);
    let token = JSON.parse(localStorage.getItem("ember_simple_auth-session")).authenticated.token;
    $.ajaxPrefilter((options, originalOptions, xhr)=> {
      xhr.setRequestHeader('Authorization', "Token " + token);
      xhr.setRequestHeader('current-entity-id', localStorage.getItem("entity_id"));
    });
  },
  setError(error) {
    this.set('donationError', error);
    setTimeout(()=> {
      this.set('donationError', false);
    }, 10000);
  },
  actions: {
    changeSelectedCampaign(campaign) {
      this.set('selectedCampaignId', get(campaign, 'id'))
    },

    filePicked(file) {
      this.set('file', file);
    },
    fileTooBig() {
      this.setError("file is too big, must be smaller than 10MB.");
    },
    upload() {
      if (!this.get("file")) {
        this.setError("need to pick a file");
      }
      if (!this.get("selectedCampaignId")) {
        this.setError("need to pick a campaign");
      }
      if (this.get("file") && this.get("selectedCampaignId")) {
        this.set("loading", true);
        return EmberUploader.Uploader.create({
          type: 'POST',
          url: CONFIG.host + '/api/donations/offline_upload',
          paramName: 'file'
        }).upload(this.get('file'), {
          campaign_slug: this.get("selectedCampaignId")

        }).then( (data)=> {
          this.set('donationSuccess', data.notice);
          this.set("loading", false);
        }, (reason)=> {
          this.setError(reason);
          this.set("loading", false);
        });
      }
    }
  }
});
