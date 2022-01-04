import Ember from 'ember';

export default Ember.Controller.extend({
  notify: Ember.inject.service(),
  actions: {
    saveProfile() {
      this.get('model').save()
      .then( (user) => {
        this.get('notify').success('Successfully saved your profile.')
      })
      .catch( (err) => {
        this.get('notify').warning('There was an error saving your profile.')
      })

    }
  }
});
