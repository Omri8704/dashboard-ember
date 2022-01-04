import Ember from 'ember';
import request from '../../../utils/ajax-promise'
import config from '../../../config/environment'

const { Controller, computed, inject } = Ember

export default Controller.extend({
  notify: inject.service(),

  beeToken: computed.alias('model.beeToken'),
  emailTemplate: computed.alias('model.emailTemplate'),
  mergeTags: computed.alias('model.mergeTags'),

  entityId: computed(function(){ return localStorage.getItem('entity_id') }),

  actions: {
    beeInitialized(beePluginInstance) {
      this.set("emailTemplate.superadmin_override", false)
      this.set('beePlugin', beePluginInstance);
    },

    // beeFree save callback
    saveEmailTemplate(jsonFile, htmlFile) {
      this.set('emailTemplate.json', jsonFile);
      this.set('emailTemplate.html', htmlFile);

      if (this.get("sendingTest")) {
        this.send('sendTestCallback')
      }else{
        this.send('saveEmailCallback')
      }
    },

    saveTemplate() {
      if (this.get('emailTemplate.userUploaded')) {
        this.send('saveEmailCallback')
      }else {
        // the beeFree save method will send the saveEmailTemplate callback,
        // and that will call the saveEmailCallback method.
        this.get('beePlugin').save()
      }
    },


    saveEmailCallback() {
      this.get("emailTemplate.content")
        .validate()
        .then( ({ validations, model }) => {
          this.set('hasFeedback', true)
          if (validations.get('isValid')) {
            model.save().then( () => {
              this.get("notify").success("Successfully updated Template.")
              this.send('backToList')
            }).catch( (e)=> {
              this.get("notify").alert("Error updating Template.")
            })
          }else {
            this.get('notify').alert('Error updating Template')
          }
        })
    },

    sendTest() {
      this.set("sendingTest", true)

      if (this.get('emailTemplate.userUploaded')) {
        this.send('sendTestCallback')
      }else {
        this.get('beePlugin').save()
      }
    },

    sendTestCallback() {
      const template = this.get("emailTemplate.content")
      let data = { template: template.get('html') };

      request({
        url: `${config.host}/api/mailings/send_stub_email`,
        method: 'post',
        data: JSON.stringify(data)
      }).then( () => {
        this.get("notify").success("Sent Email Test.")
      }).catch( ()=> {
        this.get("notify").warning("Error sending test email.")
      })

      this.set("sendingTest", false)
    },

    previewTemplate() {
      // use litness test here.
    }
  }
});
