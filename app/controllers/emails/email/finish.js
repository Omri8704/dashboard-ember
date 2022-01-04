import Ember from 'ember';

export default Ember.Controller.extend({
  settings: Ember.inject.service(),
  notify: Ember.inject.service(),
  mailing: Ember.computed.alias('model.mailing'),
  estimate: Ember.computed.alias('model.estimate.count'),

  statuses: ['created', 'pending', 'approved'],

  _saveAndFinish: function() {
    this.set("confirmEmailSend", false)
    this.set("confirmEmailSending", true)
    this.set("mailing.status", "approved");

    this._onlySave();
  },

  _onlySave: function() {
    this.get("mailing").save().then(() => {
      this.get("notify").success("Mailing successfully scheduled!")
      this.transitionToRoute('emails.index');
      this.set("confirmEmailSending", false)
    }).catch((response) => {
      this.set("confirmEmailSending", false)
      let errormsg = "There was an issue saving this email."
      if (response && response.errors && response.errors[0]) errormsg = response.errors[0].detail
      this.get("notify").alert(errormsg)
    });
  },

  canEditStatus: Ember.computed("mailing.status", function () {
    return this.get('statuses').includes(this.get('mailing.status'));
  }),

  actions: {
    finalize: function(){
      this.set("confirmEmailSend", true)
    },
    updateStatus: function (params) {
      this._onlySave();
    },
    closeEmailSend: function(){
      this.set("confirmEmailSend", false)
    },
    saveAndFinish: function() {
      if( this.get("confirmEmailSend") === true ){
        this._saveAndFinish();
      }
    }
  }
});
