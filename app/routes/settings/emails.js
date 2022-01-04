import Ember from 'ember';
import config from '../../config/environment';
import request from '../../utils/ajax-promise';

export default Ember.Route.extend({
  model() {
    if( !this.get("defaultTemplates") ){
      let getDefaultTemplates = request({
        url: `${config.host}/api/email_templates/system_templates.json`,
      }).then((data) => {
        return data;
      });
      this.set("defaultTemplates", getDefaultTemplates)
    }
    return this.get("defaultTemplates")
  }
});
