import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  model() {

    return this.get('session.current_user').get('user_campaigns').then( (userCampaigns) => {
      let camps =  userCampaigns.filter( (userCampaign) => {
        return userCampaign.get('role');
      })
      return camps
    }).catch( (err) => {
      throw new Error(err);
    })

  }
});
