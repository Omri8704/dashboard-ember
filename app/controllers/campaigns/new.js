import Ember from 'ember';
export default Ember.Controller.extend({
  campaign: Ember.computed.alias("model"),
  notify: Ember.inject.service(),
  settings: Ember.inject.service(),

  typeOptions: [
      'dollars',
      'donors',
      'donations'
  ],

  entityTimeZone: Ember.computed('settings.current_entity.timezone', function() {
    return this.get('settings.current_entity.timezone');
  }),

  actions: {
    saveCampaign() {
      const model = this.get('model');
      model.save().then( () => {
        this.get("notify").success("Campaign Saved.")
        this.transitionToRoute('campaigns.campaign.edit', this.get('model.id'));
      }, () => {
        const errors = model.get('errors').map((err)=>{return `${err.attribute}: ${err.message}.`}).join("<br />")
        this.get("notify").alert({html: errors});
      });
    }
  }
});
