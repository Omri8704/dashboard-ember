import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    this._super(...arguments);
    this.set("ajax_call");
  },
  campaign: Ember.computed.alias("model"),
  actions: {
    send_email() {
      this.set("loading", true);
      const url = `api/campaigns/${this.get('campaign.id')}/invitation_campaign`
      const data = {
        email_to: this.get("email_to"),
        name_to: this.get("name_to")
      };

      $.ajax({
        method: "POST",
        url: url,
        data: data
      }).done( () => {
        this.set("loading", false);
      });
    }
  }
});

