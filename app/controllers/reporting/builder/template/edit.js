import Ember from 'ember';
import { inject } from "@ember/service";


export default Ember.Controller.extend({
  notify: inject(),

  reportTemplate: Ember.computed.alias('model.reportTemplate'),
  validFields: Ember.computed.alias('model.validTemplateFields'),

  actions: {
    save() {
      this.get("reportTemplate").save().then( () => {
        this.transitionToRoute('reporting.builder')
        this.get('notify').success('Saved Template')
      })
    },

    delete() {
      this.get('reportTemplate').destroyRecord().then( () => {
        this.transitionToRoute('reporting.builder')
        this.get('notify').success('Deleted Template')
      })
    },
  }
});
