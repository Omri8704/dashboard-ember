import Ember from 'ember';
import request from '../utils/ajax-promise'
import CONFIG from '../config/environment';

export default Ember.Component.extend({
  notify: Ember.inject.service(),

  importType: null,
  templateUrl: 'https://gw-advance-prod-us-east-1.s3.amazonaws.com/dashboard/assets/import_templates/',

  actions: {
    handleFileRemove() {
      this.set('file', null)
    },

    handleFileUpload(file) {
      this.set('file', file)
    },
    uploadImportFile() {
      this.set('uploading', true)

      request({
        url: `${CONFIG.host}/api/bulk_imports/presigned_import_url.json`
      })
      .then( ({url, file_name}) => {
        return Ember.$.ajax({
          url: url,
          type: 'PUT',
          processData: false,
          data: this.get('file'),
        })
        .then( () => {
          return request({
            url: `${CONFIG.host}/api/bulk_imports.json`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
              import_type: this.get('importType'),
              file_name
            })
          })
          .then( () => {
            this.get('notify').success('File will be processed shortly')
            this.set("loading", false);
          })
        })
      })
      .catch( () => {
        this.get('notify').error("Error importing")
      })
    }
  }
});
