import Ember from 'ember';

export default Ember.Route.extend({
  settings: Ember.inject.service(),

  model() {
    const entity = this.get('settings.current_entity')

    const queryCampaign = this.get('store').findAll('campaign')

    const queryEvent = this.get('store').findAll('event')

    const reportFilters = this.get('store').findAll('report-filter');

    const newReport = this.get('store').createRecord('report-filter', {
      current_user: this.get('settings.current_entity.current_user'),
      entity: this.get('settings.current_entity')
    });

    return Ember.RSVP.hash({
      campaigns: queryCampaign,
      events: queryEvent,
      reportFilter: newReport,
      reportFilters: reportFilters,
      entity
    })
  }
});
