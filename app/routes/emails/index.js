import Ember from "ember";
import config from '../../config/environment';
import request from '../../utils/ajax-promise';

const { set } = Ember

export default Ember.Route.extend({
  queryParams: {
    page: {
      replace: true,
      refreshModel: true
    },
    offset: {
      replace: true,
      refreshModel: true
    },
    limit: {
      replace: true,
      refreshModel: true
    },
    status: {
      replace: true,
      refreshModel: true
    },
    query: {
      replace: true,
      refreshModel: true
    }
  },

  model(params) {
    let getEmailStats = request({
      url: `${config.host}/api/email_stats.json`,
    }).then((data) => {
      return data;
    });


    return Ember.RSVP.hash({
      data: getEmailStats,
      mailings: this.store.query("mailing", params)
    });
  },

  resetController(controller) {
    set(controller, 'limit', 10)
    set(controller, 'offset', 0)
    set(controller, 'status', null)
    set(controller, 'query', null)
  }
})
