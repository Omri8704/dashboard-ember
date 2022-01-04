import Ember from 'ember';

export default Ember.Controller.extend({
  disableTickets: true,
  disableConfirmation: true,

  event: Ember.computed.alias('model')
});
