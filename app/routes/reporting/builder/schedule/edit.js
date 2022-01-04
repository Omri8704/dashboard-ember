import Ember from 'ember';

export default Ember.Route.extend({
  model({report_schedule_id}) {
    return Ember.RSVP.hash({
      report: this.get('store').findRecord('report-schedule', report_schedule_id, { reload: true }),
      templates: this.get('store').findAll('report-template')
    })
  }
});
