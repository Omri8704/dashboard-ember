import Ember from 'ember';

const {
  Controller,
  computed,
  inject,
  get,
  set
} = Ember;

export default Controller.extend({
  session: inject.service(),
  settings: inject.service(),
  currentUser: computed.alias("model"),
  updateCurrentPath: (function() {
    return set(this, 'settings.currentPath', this.get("currentPath"));
  }).observes("currentPath"),
  side_nav_logo: computed('settings', {
    get() {
      if (get(this, 'settings.current_entity.headlogo')) {
        return get(this, 'settings.current_entity.headlogo');
      } else {
        return "assets/images/snap-advance-icon-100.png";
      }
    },
    set(key, value) {
      return value
    }
  })
});
