import Ember from 'ember';

/* globals BeePlugin */

export default Ember.Component.extend({
  saveEmail:      null,
  saveAsTemplate: null,
  model:          null,
  entityId:       null,
  notify:         Ember.inject.service(),

  didInsertElement() {
    this._super(...arguments);

    const self = this;

    const beeConfig = {
      uid: self.get('entityId'),
      container: 'bee-plugin-container',
      autosave: 15,
      language: 'en-US',
      onSave: function(jsonFile, htmlFile) {
        if(!jsonFile || !htmlFile) {
          this.get('notify').error("Error saving email template. Please try again");
        } else {
          if (self.get('saveEmail')) {
            self.get('saveEmail')(jsonFile, htmlFile);
          }
          else {
            Ember.Logger.warn('You need to pass an action to handle saveEmail')
          }
        }
      },
      onSaveAsTemplate: function(jsonFile) {
        if (self.get('saveAsTemplate')) {
          self.get('saveAsTemplate')(jsonFile);
        }
        else {
          Ember.Logger.warn('You need to pass an action to handle saveAsTemplate')
        }
      },
      onAutoSave: function(jsonFile) {
        jsonFile
      },
      onSend: function(htmlFile) {
        htmlFile
        //write your send test function here
      },
      onError: function(err) {
        Ember.Logger.warn('error bee-free component', err);
      }
    };

    BeePlugin.create(this.get('token'), beeConfig, (beePluginInstance) => {
      beePluginInstance.start(this.get('model'));
      this.get('beeInitialized')(beePluginInstance);
    })
  }
});
