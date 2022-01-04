import Ember from 'ember';
import { inject } from "@ember/service";

export default Ember.Controller.extend({
  notify: inject(),

  validFields: Ember.computed.alias('model.validFields'),
  templateFormatters: Ember.computed.alias('model.reportTemplateFormatters'),

  massageErrors(arrayOfStrings) {
    const upperCase = (element) => {
      return `${element[0].toUpperCase()}${element.slice(1)}`
    }

    return [upperCase(arrayOfStrings[0]), arrayOfStrings.slice(1)].join("")
  },

  actions: {
    save(reportTemplate) {
      const { m, validations } = reportTemplate.validateSync()

      if (validations.get('isValid')) {
        reportTemplate.save().then( () => {
          this.transitionToRoute('reporting.builder')
          this.get("notify").success('Created template')
        })
      }
      else {
        this.get('notify').error(
          this.massageErrors(
            reportTemplate.get('validations.messages').toArray()
          )
        )
      }
    },
  }
});
