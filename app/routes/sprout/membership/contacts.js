import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    limit: {
      replace: true,
      refreshModel: true
    },
    offset: {
      replace: true,
      refreshModel: true
    }
  },

  model(params) {
    return Ember.RSVP.hash({
      contacts: this.modelFor('sprout.membership').query('contacts', params),
      membership: this.modelFor('sprout.membership')
    });
  }
});
