import Ember from 'ember';
import request from '../utils/ajax-promise'
import config from '../config/environment'

const {
  Component,
  observer,
  computed,
  inject
} = Ember

export default Ember.Component.extend({
  session: inject.service(),
  notify: inject.service(),
  loading: false,
  actions: {
    requestReport(type, range, delivery_method) {
      this.set('loading', true);
      request({
        url: `${config.host}/api/report_generator/request_report`,
        method: 'post',
        data: JSON.stringify({
          requested_report_type: type,
          delivery_method: delivery_method,
          range: range
        })
      }).then( (result) => {
        if (delivery_method == 'download') {
          this.get("notify").success("Generating report - this may take a minute or two...", {closeAfter: 10000})
          return this.send('tryDownload', result.id);
        }
        else {
          this.get("notify").success("We'll email you the report (this may take several minutes).", {closeAfter: 10000})
          this.set('loading', false);
        }
      }).catch( ()=> {
        this.get("notify").warning("Error downloading report.")
        this.set('loading', false);
      })
    },
    tryDownload(id) {
      if (location.href.indexOf('report') == -1) {
        return false;
      }
      return request({
        url: `${config.host}/api/report_generator/${id}/get_presigned_url`,
        method: 'get'
      }).then( (result) => {
        if (result.success) {
          this.set('loading', false);
          window.location = result.url;
        }
        else {
          setTimeout(() => {
            this.send('tryDownload', id);
          }, 1000)
        }
      }).catch( (result)=> {
        this.set('loading', false);
      })
    }
  }
});
