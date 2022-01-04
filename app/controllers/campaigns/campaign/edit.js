import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    this._super(...arguments);
    this.setLogo();
  },
  settings: Ember.inject.service(),
  notify: Ember.inject.service(),
  campaign: Ember.computed.alias("model"),
  session: Ember.inject.service(),
  typeOptions: [
    {
      id: 'dollars',
      name: 'dollars'
    }, {
      id: 'tickets',
      name: 'tickets'
    }, {
      id: 'votes',
      name: 'votes'
    }, {
      id: 'members',
      name: 'members'
    }
  ],
  shortDescription: Ember.computed('description', function() {
    if (this.get('description')) {
      return this.get('description').slice(0, 50);
    }
  }),
  setLogo() {
    if (!this.get('logo')) {
      return this.set('logo', 'assets/images/light_gray.png');
    }
  },
  campaignLink: Ember.computed('model', {
    get() {
      return `https://${this.get('settings.current_entity.host')}/campaigns/${this.model.get("slug")}`
    }
  }),
  actions: {
    updateCampaign() {
      this.set('loading', true);
      this.get('model').save().then( () => {
        this.set('loading', false);
        this.get("notify").success("Saved Campaign.")
      }, (reason)=> {
          let modelErrors = this.get("model.errors");
          modelErrors.setProperties(reason.errors);
          this.get("notify").warning("Something went wrong saving campaign.")
          this.set('loading', false);
      });
    }
  }
});
