import Ember from 'ember';

import EmberUploader from 'ember-uploader';
import config from '../config/environment';
import request from '../utils/ajax-promise'

export default Ember.Component.extend({
  notify: Ember.inject.service(),
  settings: Ember.inject.service(),

  setError(error) {
    this.set('donationError', error);
    setTimeout(()=> {
      this.set('donationError', false);
    }, 10000);
  },
  actions: {
    filePicked(file) {
      this.set('file', file);
    },
    fileTooBig() {
      this.setError("file is too big, must be smaller than 10MB.");
    },
    download() {
      request({
        method: 'get',
        url: `${config.host}/api/donations/donation_template`,
      }).then( () => {
        this.get('notify').success('The template will be emailed to you shortly')
      }).catch( () => {
        this.get('notify').warning('Invalid permissions')
      })
    },

    removeNotice() {
      this.set('donationSuccess', false)
    },

    upload() {
      if (!this.get("file")) {
        this.setError("need to pick a file");
      }

      if (this.get("file")) {
        this.set("loading", true);
        return EmberUploader.Uploader.create({
          type: 'POST',
          url: config.host + '/api/donations/offline_upload',
          paramName: 'file'
        })
        .upload(this.get('file'))
        .then( (data)=> {
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
