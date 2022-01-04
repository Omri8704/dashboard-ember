import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      templates: this.get('store').findAll('report-template'),
      reportSchedules: this.get('store').findAll('report-schedule')
    })
  }
});
