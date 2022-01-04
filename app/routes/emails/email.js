import Ember from "ember"

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord("mailing", params.id)
  },
  actions: {
    saveEmail() {
      let email = this.modelFor('emails.email');
      return email.save().then(function(response) {
        return response;
      });
    }
  }
})
