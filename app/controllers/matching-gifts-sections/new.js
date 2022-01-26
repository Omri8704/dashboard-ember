import Ember from 'ember';

export default Ember.Controller.extend({
  notify: Ember.inject.service(),
  settings: Ember.inject.service(),
  selectionStrategyOptions: ['automatic', 'manual'],

  matchingGifts: (function () {
    return this.store.findAll('matching-gift');
  }).property(),

  matchingGiftsSection: (function () {
    return this.get('store').createRecord('matching-gifts-section', {});
  }).property(),

  isCampaign: (function () {
    return false; // campaign has been deprecated
  }).property(),

  campaignOptions: Ember.computed('settings.current_entity.campaigns', function () {
    this.store.query('campaign', {});
    const campaigns = this.get('settings.current_entity.campaigns');
    return campaigns || [];
  }),

  actions: {
    saveMatchingGiftsSection() {
      const matchingGiftsSection = this.get('matchingGiftsSection');

      matchingGiftsSection.save().then(() => {
        this.get('notify').success('Matching Gifts Section Saved.');
        this.transitionToRoute('matching-gifts-sections.matching-gifts-section.edit', this.get('matchingGiftsSection.id'));
      }, () => {
        const errors = matchingGiftsSection.get('errors').map((err) => { return `${err.attribute}: ${err.message}.`; }).join('<br />');
        this.get('notify').alert({ html: errors });
      });
    },
    updateSelectionStrategy(data) {
      this.get('matchingGiftsSection').set('match_selection_strategy', data);
      this.set('isCampaign', data == 'campaign');
    },
  },
});
