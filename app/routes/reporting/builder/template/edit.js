import Ember from 'ember';

export default Ember.Route.extend({
  model({report_template_id}) {
    return Ember.RSVP.hash({
      reportTemplate: this.get('store').findRecord('report-template', report_template_id),
      validTemplateFields: this.get("store").findAll('report-template-value'),
      reportTemplateFormatters: this.get("store").findAll('report-template-formatter')
    })
  }
});
