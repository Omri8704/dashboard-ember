import Ember from 'ember';

export default Ember.Controller.extend({
  ticketLevels: Ember.computed.alias('model')
});
