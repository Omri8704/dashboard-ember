import Ember from 'ember';

export default Ember.Component.extend({
  itemClicked: false,

  actions: {
    triggerClick() {
      this.toggleProperty('itemClicked');
    }
  }
});
