import Ember from 'ember';
import config from '../../../config/environment';
import request from '../../../utils/ajax-promise';

export default Ember.Route.extend({

  model: function(){
    let mailing = this.modelFor('emails.email')

    let getEmailStats = request({
      url: `${config.host}/api/email_stats/${mailing.get('id')}.json`,
    }).then((data) => {
      return data;
    });

    return Ember.RSVP.hash({
      data: getEmailStats,
      mailing: mailing
    });

  },
})
