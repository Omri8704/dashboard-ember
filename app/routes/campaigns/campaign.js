import Ember from 'ember';
import config from '../../config/environment';
import request from '../../utils/ajax-promise';

export default Ember.Route.extend({
  model(params) {
    // http://emberigniter.com/force-store-reload-data-api-backend/
    return this.store.findRecord('campaign', params.campaign_id, { reload: true });
  },
  serialize(model) {
    return {
      campaign_id: model.get('slug')
    };
  }
});
