import Ember from 'ember';

const {
  Controller,
  inject
} = Ember;
export default Controller.extend({
  session: inject.service(),
  notify: inject.service(),
  actions: {
    authenticate() {
      const {
        identification,
        password
      } = this.getProperties('identification', 'password');

      this.get('session')
        .authenticate('authenticator:application', identification, password)
        .then( () => {
          this.get("notify").success("succesfully logged in!")
          this.send("reloadModel");
        })
        .catch( (reason) => {
          this.get("notify").alert(reason.error || reason)
          this.set('errorMessage', reason.error || reason);
          setTimeout(() => { this.set("errorMessage", null)}, 1200)
        })
    }
  }
});
