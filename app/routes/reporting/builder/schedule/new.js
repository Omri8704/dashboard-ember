import Ember from 'ember';
const {
  Route,
  inject,
  get,
  set
} = Ember;

export default Ember.Route.extend({
  settings: Ember.inject.service(),
  session: Ember.inject.service('session'),

  model(){
    return Ember.RSVP.hash({
      templates: this.get('store').findAll('report-template'),
      currentUser: this.store.findAll("current_user").then( (value) => {
        set(this, 'session.current_user', get(value, 'firstObject'));
      })
    })
  },

  actions: {
    reloadModel() {
      this.refresh();
    }
  }
});
