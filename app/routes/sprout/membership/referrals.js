import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      campaign: this.modelFor('sprout.membership').get('campaign'),
      membership: this.modelFor('sprout.membership'),
    });
  }
});
