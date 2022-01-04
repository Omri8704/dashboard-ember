import Ember from 'ember';
import config from '../../../config/environment';
import request from '../../../utils/ajax-promise';

export default Ember.Route.extend({

  model: function(){
    let mailing = this.modelFor('emails.email');
    let getMailingEstimate = request({
      url: `${config.host}/api/mailings/${mailing.id}/user_estimate.json`,
    }).then((data) => {
      return data;
    });

    return Ember.RSVP.hash({
      estimate: getMailingEstimate,
      mailing: mailing
    });
  },

  beforeModel: function() {
    let mailing = this.modelFor('emails.email');
    if( mailing.get("status") === "sent" ){
      return this.transitionTo('emails.email.stats');
    }
  },
});
