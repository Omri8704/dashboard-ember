import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.query('email-template', {default: true })
  },
  resetController(controller) {
    controller.set('file', null)
    controller.set('pastedHtml', null)
  }
});
