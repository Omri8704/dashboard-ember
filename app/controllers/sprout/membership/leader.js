import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  settings: Ember.inject.service(),
  notify: Ember.inject.service(),

  participants: Ember.computed.alias('model.participants'),
  membership: Ember.computed.alias('model.membership'),
  campaign: Ember.computed.alias('model.campaign'),

  emailDeliverability: '98',
  emailsSent: Ember.computed.mapBy('participants', 'emails_sent'),
  totalEmailsSent: Ember.computed.sum('emailsSent'),

  totalInteractions: Ember.computed.alias('model.campaign.total_web_stats'),

  totalRaised: Ember.computed('campaign', {
    get() {
      return this.get('campaign').get('goal_progress');
    }
  }),

  adminViewing: Ember.computed('model.membership', {
    get(){
      return (
        this.get("session.current_user.entity_admin") &&
        ( this.get("model.membership.user.id") != this.get("session.current_user.id") )
      )
    }

  }),

  actions: {
    copyUrl() {
      $("#campaign-url").select();
      document.execCommand('copy');
      this.get('notify').success("Copied URL to Clipboard.");
      return false;
    }
  }

});
