import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    if(!window.BeePlugin) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://app-rsrc.getbee.io/plugin/BeePlugin.js'
      $('head').append(script)
    }
  },
  model(params) {
    return this.store.createRecord('bee-free-token')
      .save()
      .then( (beeTokenRecord) => {
        const beeToken = JSON.parse(beeTokenRecord.get('token'));
        const template = this.store.findRecord("email-template", params.id)
        return {
          beeToken: beeToken,
          emailTemplate: template
        }
    })
  },
  resetController(controller) {
    controller.set('hasFeedback', false)
  }
});
