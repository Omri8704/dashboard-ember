import Ember from 'ember'
export default {
  name: 'show-layout-route-modifier',
  initialize(/* application */) {
    Ember.Route.reopen({
      hasLayout: true,
      setupController() {
        this._super(...arguments)
        this.controllerFor('application').set('showLayout', this.get('hasLayout'))
      }
    })
  }
};
