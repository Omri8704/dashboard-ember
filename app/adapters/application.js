import Ember from 'ember';
import { ActiveModelAdapter } from 'active-model-adapter';
import config from '../config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

import { inject } from "@ember/service";


export default ActiveModelAdapter.extend(DataAdapterMixin, {
  notify: inject(),
  settings: inject(),
  corsWithCredentials: true,
  authorizer: 'authorizer:application',
  namespace: 'api',
  host: config.host,

  headers: Ember.computed(function() {
    return { 'current-entity-id': localStorage.entity_id }
  }).volatile(),

  ajax(url, type, hash) {
    return this._super(url + ".json", type, hash);
  },
  handleResponse(status, headers, payload, requestData) {
    if (status == 403) {
      this.get('notify').alert("Your account doesn't have permission to perform this action.")
    }
    return this._super(status, headers, payload, requestData);
  }
});
