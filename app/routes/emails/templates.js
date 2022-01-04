import Ember from 'ember';

const {
  Route,
  set,
  inject
} = Ember

export default Route.extend({
  settings: inject.service(),
  init(){
    this._super(...arguments)
    set(this, "settings.currentSubnav", "emails")
  }
});
