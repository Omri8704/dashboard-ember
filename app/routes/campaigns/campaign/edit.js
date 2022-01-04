import Ember from 'ember';
import EmberUploader from 'ember-uploader';
import CONFIG from '../../../config/environment';

export default Ember.Route.extend({
  init() {
    this._super(...arguments);

    this.uploader = EmberUploader.Uploader.create({
      url: CONFIG.host + '/api/uploader/campaign',
      paramName: 'id'
    });
  },
  actions: {
    uploadImage(uploadInfo) {
      var attrs, file, prop, uploadPromise;
      prop = uploadInfo.propertyName;
      file = uploadInfo.file;
      attrs = {
        crop_x: uploadInfo.cropStats.crop_x,
        crop_y: uploadInfo.cropStats.crop_y,
        crop_w: uploadInfo.cropStats.crop_w,
        crop_h: uploadInfo.cropStats.crop_h
      };
      attrs["" + prop] = file;
      uploadPromise = this.uploader.upload(this.currentModel.id, attrs);


      return uploadPromise.then( ()=> {
        return this.currentModel.reload().then(function() {
          uploadInfo.defer.resolve();
        });
      }, ()=> {
        return this.currentModel.reload().then(function() {
          uploadInfo.defer.reject();
        })
      })
    }
  }
});
