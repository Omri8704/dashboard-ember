import Ember from 'ember';
import config from '../../../config/environment';
import request from '../../../utils/ajax-promise';

export default Ember.Route.extend({
  model(params) {
    // http://emberigniter.com/force-store-reload-data-api-backend/
    const campaign =  this.store.findRecord('campaign', params.campaign_id, { reload: true });
    const campaignStats = request({
      url: `${config.host}/api/campaigns/impact_report.json?parent_campaign_id=${params.campaign_id}`
    })

    return Ember.RSVP.hash({
      campaign,
      campaignStats
    });
  },
  serialize(model) {
    return {
      campaign_id: model.get('slug')
    };
  }
});
