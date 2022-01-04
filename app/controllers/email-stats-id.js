import Ember from 'ember';

export default Ember.Controller.extend({
  graphEvents: ["total_clicks_by_day", "total_opens_by_day"],
  // graph tool kit expects an array
  email: Ember.computed('model', function() {
    return [this.get('model')];
  })
});
