import Ember from 'ember';

export default Ember.Component.extend({
  showing: null,
  actions: {
    toggleShowing() {
      this.toggleProperty("showing")
    },
  }
});
