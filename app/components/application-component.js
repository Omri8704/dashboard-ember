import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['application-component'],
  didInsertElement() {
    this._super(...arguments);
    $(".initial-loader.loading-screen").fadeOut();
  }
});
