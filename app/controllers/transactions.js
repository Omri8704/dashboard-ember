import Ember from 'ember';
import request from '../utils/ajax-promise'
import config from '../config/environment'

const {
  Controller,
  inject
} = Ember;

function tryDownload(id) {
  if (location.href.indexOf('transactions') == -1) {
    return false;
  }
  return request({
    url: `${config.host}/api/transaction_records/${id}/get_presigned_url`,
    method: 'get'
  }).then( (result) => {
    if (result.success) {
      window.location = result.url;
    }
    else {
      setTimeout(function() {
        tryDownload(id)
      }, 1000)
    }
  }).catch( (result)=> {
  })
}
export default Controller.extend({
  session: inject.service(),
  notify: inject.service(),
  actions: {
    downloadCSV() {
      request({
        url: `${config.host}/api/transaction_records/request_report`,
        method: 'get'
      }).then( (result) => {

        this.get("notify").success("Generating report - please wait...")
        return tryDownload(result.id);
      }).catch( ()=> {
        this.get("notify").warning("Error downloading report.")
      })
    }
  }
});
