import Ember from 'ember';
import request from '../utils/ajax-promise'
import config from '../config/environment';

const {
    Controller,
    inject,
    get,
    set
} = Ember

export default Ember.Controller.extend({
    settings: inject.service(),
    merchant_service_name: null,
    queryParams: ['accountNameAlert'],

    disableButton: Ember.computed('merchant_service_name', function() {
      return get(this, 'merchant_service_name') ? false : true;
    }),

    dispalyAlert: Ember.computed('accountNameAlert', function() {
      return this.accountNameAlert === 'true';
    }),

    canReceiveBbmsPayments: Ember.computed('entity-bbms-configuration', function() {
      return this.get("model.can_receive_bbms_payments")
    }),

    bbmsAccountName: Ember.computed('entity-bbms-configuration', function () {
      return this.get('model.bbms_account_name');
    }),

    actionLinkDisconnect: Ember.computed('isConnected', function () {
      return this.get('isConnected') ? "" : "disconnectClick";
    }),

    actions: {
      integrateClick() {
        const data = { accountName: this.get('merchant_service_name') };
        request({
          url: `${config.host}/api/entity_bbms_configurations/authorize`,
          method: 'post',
          data: JSON.stringify(data),
        }).then( (result) => {
          if (result && result.bbms_oauth_uri) {
            window.location.href = result.bbms_oauth_uri;
          }
        }).catch((currentError) => {
        });
      },

      disconnectClick() {
        request({
          url: `${config.host}/api/entity_bbms_configurations/disconnect`,
          method: 'post',
        }).then( (result) => {
          location.reload();
        });
      }
    }
});
