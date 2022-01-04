import Ember from 'ember';
import ApplicationAdapter from './application';
import request from '../utils/ajax-promise';

export default ApplicationAdapter.extend({
  // deleteRecord now sends up the record with the request
  // this is because campaign videos are embedded in Campaigns
  // in the mongo DB.
  // embbeded records must be quieried by the record they are embedded in.
  deleteRecord(store, type, snapshot) {
    const data = { campaign_video: this.serialize(snapshot, { includeId: true }) };
    const id = snapshot.id;
    const url = this.buildURL(type.modelName, id, snapshot, 'deleteRecord')
    return new Ember.RSVP.Promise(function(resolve, reject) {
      request({
        method: 'DELETE',
        url: url,
        data: JSON.stringify(data)
      }).then( (data) => {
        Ember.run(null, resolve, data);
      }).catch( (jqXHR) => {
        jqXHR.then = null; // tame jQuery's ill mannered promises
        Ember.run(null, reject, jqXHR);
      })
    })
  }
});
