import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createUserSegment() {
      this.get("model").save()
        .then( ()=> {
          this.transitionToRoute("emails.email-lists.email-list", this.get("model.id"))
        })
    }
  }
});
