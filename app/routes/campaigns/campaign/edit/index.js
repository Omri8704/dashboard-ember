import Ember from 'ember';

export default Ember.Route.extend({
  redirect: function() {
    return this.transitionTo("campaigns.campaign.edit.details");
  }
});
