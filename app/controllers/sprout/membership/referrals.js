import Ember from 'ember';

export default Ember.Controller.extend({
  notify: Ember.inject.service('notify'),
  settings: Ember.inject.service(),
  membership: Ember.computed.alias('model.membership'),
  campaign: Ember.computed.alias('model.campaign'),

  actions: {
    runReport(){
      this.get("membership").sendReferralReport().then( () => {
        this.get("notify").success("Referral report rquested.  Check your email in a few minutes!")
      } , () => {
        this.get("notify").alert("There was an issue running this report.")
      });

    }
  }
});
