import Ember from 'ember';

export default Ember.Controller.extend({
  settings: Ember.inject.service(),
  notify: Ember.inject.service(),

  report: Ember.computed.alias('model.report'),
  templates: Ember.computed.alias('model.templates'),
  entityTimeZone: Ember.computed.alias('settings.current_entity.timezone'),

  actions: {
    handleRunReport({ url }) {
      window.location = url;
      this.get('notify').success('Report Downloaded')
    },

    handleSave(report) {
      report
      .validate()
      .then( ({validations}) => {
        if (!report.get('reportTemplate.id')) {
          this.get('notify').error('Please select a template')
          return
        }

        if (report.get('deliveryTargets.length') <= 0) {
          this.get('notify').error('One email minimum required to save')
          return
        }
        if (validations.get('isValid')) {
          report.save().then( () => {
            this.transitionToRoute('reporting.builder')
            this.get('notify').success('Saved Report!')
          })
        }
        else {
          this.get("notify").error({html: this.formatErrors(validations.get('messages'))})
        }
      })
      .catch( () => {
        this.get('notify').error("Error saving the report")
      })
    },

    handleDelete(report) {
      report.destroyRecord().then( () => {
        this.transitionToRoute('reporting.builder')
        this.get('notify').success('Deleted Report')
      })
    },
  }
});
