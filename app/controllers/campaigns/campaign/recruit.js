import Ember from 'ember';
import {
  get,
  set
} from "@ember/object";

export default Ember.Controller.extend({
  notify: Ember.inject.service(),

  queryParams: ['limit', 'offset'],
  limit: 10,
  offset: 0,

  count: Ember.computed('model.leaders', function(){
    return get(this, 'model.leaders.meta.count')
  }),

  actions: {
    changeOffset(offset){
      set(this, "offset", offset)
    },
    reSendInvite(userCampaign) {
      const user = get(userCampaign, "user")
      user
        .get("content")
        .invite_leader({
          campaign_id: get(this, "model.campaign.id"),
          roles: [get(userCampaign, "role")]
        })
        .then(()=>{
          get(this, 'notify').success("Successfully re-sent invitation.")
        })
    }
  }
});
