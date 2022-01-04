import Ember from 'ember';

export default Ember.Controller.extend({
  matchingGift: Ember.computed.alias('model'),
  notify: Ember.inject.service(),
  settings: Ember.inject.service(),

  typeOptions: ['Dollar for Dollar', '2x Match', 'Participation Based'],

  campaignOptions: Ember.computed('settings.current_entity.campaigns', function () {
    this.store.query('campaign', {});

    if (this.get('settings.current_entity.campaigns')) {
      return this.get('settings.current_entity.campaigns');
    }

    return [];
  }),

  isMoneyType: (function () {
    return false;
  }).property(),

  actions: {
    saveMatchingGift() {
      const model = this.get('model');

      model.save().then(() => {
        this.get('notify').success('Matching Gift Saved.');
        // fix here
        this.transitionToRoute('matching-gifts.matching-gift.edit', this.get('model.id'));
      }, () => {
        const errors = model.get('errors').map((err) => { return `${err.attribute}: ${err.message}.`; }).join("<br />");
        this.get('notify').alert({ html: errors });
      });
    },
    updateType(data) {
      const model = this.get('model');
      model.set('type', data);
      if (data == 'Participation Based') {
        this.set('isMoneyType', false);
      } else {
        this.set('isMoneyType', true);
      }
    },
  },
});
