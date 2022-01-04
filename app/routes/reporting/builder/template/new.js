import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      validFields: this.get("store").findAll('report-template-value'),
      reportTemplateFormatters: this.get("store").findAll('report-template-formatter')
    })
  }
});
