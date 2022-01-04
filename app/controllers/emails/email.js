import Ember from 'ember';

export default Ember.Controller.extend({
  notify: Ember.inject.service(),

  actions: {
    cloneEmail(){
      let email = this.get("model")
      email.clone().then( (result) => {
        this.transitionToRoute('emails.email', result.mailing.id)
        this.get("notify").success("Successfully Cloned Email.")
        this.get("notify").success(`Now editing '${result.mailing.name}'`)
      })
    }
  }
});
