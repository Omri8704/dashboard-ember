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
    error: false,
    isConnected: false,

    canReceiveStripePayments: Ember.computed('settings.current_entity.id', function() {
        return this.get("settings.current_entity.can_receive_stripe_payments")
    }),
    
    actionLinkDisconnect: Ember.computed('isConnected', function () {
      return this.get('isConnected') ? "" : "disconnectClick";
    }),

    actions: {
      integrateClick() {
        this.set('isConnected', true);
            request({
                url: `${config.host}/api/stripe`,
                method: 'post',
              }).then( (result) => {
                  if (result && result.stripe_oauth_uri) {
                    window.location.href = result.stripe_oauth_uri;
                  }
              }).catch((currentError) => {
                this.set('isConnected', false);
                this.set('error', true);
              });
        },

      disconnectClick() {
        this.set('isConnected', true);
            request({
                url: `${config.host}/api/stripe/disconnect`,
                method: 'post',
              }).then( (result) => {
                location.reload();
              })
        }
    }
});
