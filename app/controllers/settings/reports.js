import Ember from 'ember';
import config from '../../config/environment';
import request from '../../utils/ajax-promise'

export default Ember.Controller.extend({
  settings: Ember.inject.service(),
  session: Ember.inject.service(),
  notify: Ember.inject.service('notify'),
  entity: Ember.computed.alias('model.entity'),
  campaigns: Ember.computed.alias('model.campaigns'),
  events: Ember.computed.alias('model.events'),
  reportFilter: Ember.computed.alias('model.reportFilter'),
  reportFilters: Ember.computed.filter('model.reportFilters.@each.isNew', function(report) {
    return !report.get('isNew');
  }),
  reportsSubscribed: Ember.computed('session.current_user.report_entities', function() {
    let reports = this.get( 'session.current_user.report_entities' );
    return reports && reports.includes( this.get( 'entity') );
  }),

  actions: {
    subscribeReport() {
      return request({
        url: `${config.host}/api/reports/subscribe`,
        data: {
          entity_id: this.get( 'entity.id' ),
          subscribed: this.get( 'reportsSubscribed' )
        }
      }).then( () => {
        this.get("notify").success("Successfully updated Report Subscription.")
      }).catch( () => {
        this.get("notify").alert("An error occurred while subscribing.")
      })

    },

    runReport(report) {
      return request({
        url: `${config.host}/api/reports/`,
        data: report
      })
    },

    searchReports(name, status, type) {
      if (status === 'all') {
        status = null;
      }
      if( type && type === "Event"){
        return this.get('store').query('event', {
          entity: this.get('entity.id'),
          search_term: name,
          status
        }).then( (events) => events)
      }else{
        return this.get('store').query('campaign', {
          entity: this.get('entity.id'),
          search_term: name,
          status
        }).then( (campaigns) => campaigns)
      }
    },

    saveReport(report) {
      return report.validate().then( ({ model }) => {
        if (model.get('isValid')) {
          report.save()
        }
      });
    }
  }
});
