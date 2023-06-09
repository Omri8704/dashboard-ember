import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  model() {
    return this.get('session.current_user')
  }
});
