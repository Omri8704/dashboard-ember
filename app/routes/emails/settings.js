import Ember from 'ember';
import config from '../../config/environment';
import request from '../../utils/ajax-promise';

export default Ember.Route.extend({
  model() {
    return request({
      url: `${config.host}/api/email_templates/system_templates.json`,
    }).then((data) => {
      return data;
    });
  },
  
  actions:{
    didTransition() {
      if( this.get("modelHookRun") && typeof this.get('router.router.state.params')["emails.settings.index"] === "object" ){
        request({
          url: `${config.host}/api/email_templates/system_templates.json`,
        }).then((data) => {
          this.controller.set("model", data )
        })
      }
      this.set("modelHookRun", true)
      return true;
    }
  }
});
