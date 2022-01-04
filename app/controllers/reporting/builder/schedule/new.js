import Ember from 'ember';
import capitalizeFirstWord from '../../../../utils/capitalize-first-word'

export default Ember.Controller.extend({
  settings: Ember.inject.service(),
  notify: Ember.inject.service(),

  templates: Ember.computed.alias('model.templates'),

  entityTimeZone: Ember.computed.alias('settings.current_entity.timezone'),

  formatErrors(errors) {
    const length = errors.length
    return errors.map( (error, index) => {
      if (index == 0) {
        return `<span'>${capitalizeFirstWord(error)}</span>`
      }
      else if (index === length - 1) {
        return `<span>&nbsp;${error}</span>`
      }
      else {
        return `<span>&nbsp;${error}</span>`
      }
    })
  },

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
          this.get('notify').error('Need one email to send to')
          return
        }
        if (validations.get('isValid')) {
          report.save().then( () => {
            this.transitionToRoute('reporting.builder')
            this.get('notify').success('Saved Report')
          })
        }
        else {
          this.get("notify").error({html: this.formatErrors(validations.get('messages'))})
        }
      })
      .catch( () => {
        this.get('notify').error("Error saving the report")
      })
    }
  }
});
