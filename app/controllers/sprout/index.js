import Ember from 'ember';

export default Ember.Controller.extend({
  settings: Ember.inject.service(),
  sortOrder: ['campaign.total_referrals:desc'], // I don't know why this is a thing
  memberships: Ember.computed.sort('model', function(a, b){
    if (a.get("campaign.total_referrals") > b.get("campaign.total_referrals")) {
      return -1;
    } else if (a.get("campaign.total_referrals") < b.get("campaign.total_referrals")) {
      return 1;
    } else {
      return 0;
    }
  }),
});
