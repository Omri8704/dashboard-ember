import Ember from 'ember';

import request from '../../../utils/ajax-promise'
import config from '../../../config/environment'

const {
  Controller,
  inject,
  computed,
} = Ember

export default Controller.extend({
  init() {
    this.getAvailableReports();
  },
  getAvailableReports() {
    request({
      url: `${config.host}/api/report_generator/available_reports`,
      method: 'get'
    }).then( (result) => {
      this.set('available_reports', result.available_reports);
    })
  },
});
