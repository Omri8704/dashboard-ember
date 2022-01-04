import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.query('campaign', {
      limit: 20,
      status: 'active'
    })
  },
  afterModel() {
    let isAdmin = this.modelFor('application').get("entity_admin")
    if (!isAdmin) {
      this.transitionTo('sprout');
    }
  }
});
