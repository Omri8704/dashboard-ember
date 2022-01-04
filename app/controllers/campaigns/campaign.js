import Ember from 'ember';
export default Ember.Controller.extend({
  settings: Ember.inject.service(),
  notify: Ember.inject.service(),
  campaign: Ember.computed.alias('model'),
  session: Ember.inject.service(),
  entity: Ember.computed.alias('model.entity'),

  runReportEnabled: Ember.computed('session', function() {
    return this.get('session.current_user.entity_admin') || this.get('entity.campaign_leader_campaign_reporting');
  }),

  isEditActive: Ember.computed( 'settings.currentPath', function(){
    return this.get('settings.currentPath').includes('.edit')
  }),

  actions: {
    runReport() {
      this.get('campaign').runReport().then( () => {
        this.get('notify').success('The report will be emailed to you shortly')
      })
      .catch( () => {
        this.get('notify').alert('Error running report')
      })
    },

    saveCampaign() {
      this.get('campaign').save()
      .then( () => {
        this.get("notify").success('Successfully Saved Campaign.')
      })
      .catch( () => {
        this.get("notify").alert('Error Saving Campaign.')
      })
    }
  }
})
