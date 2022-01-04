import Ember from 'ember';

export default Ember.Controller.extend({
  settings: Ember.inject.service(),
  notify: Ember.inject.service(),
  matchingGift: Ember.computed.alias('model'),
  session: Ember.inject.service(),
  delivery_targets: Ember.computed.alias('model.delivery_targets'),

  typeOptions: ['Dollar for Dollar', '2x Match', 'Participation Based'],

  campaignOptions: Ember.computed('settings.current_entity.campaigns', function () {
    this.store.query('campaign', {});

    if (this.get('settings.current_entity.campaigns')) {
      return this.get('settings.current_entity.campaigns');
    }

    return [];
  }),

  entityTimeZone: Ember.computed('settings.current_entity.timezone', function () {
    return this.get('settings.current_entity.timezone');
  }),

  isMoneyType: (function () {
    return this.get('model.type').type !== 'Participation Based';
  }).property(),

  actions: {
    addDeliveryTarget() {
      if (!this.get('delivery_target')) {
        return;
      }
      this.get('model.delivery_targets').addObject(this.get('delivery_target'))
      this.set('delivery_target', null)
    },
    removeDeliveryTarget(deliveryTarget) {
      this.get('model.delivery_targets').removeObject(deliveryTarget)
    },
    saveMatchingGift() {
      this.get("matchingGift").save()
    },
    updateMatchingGift() {
      this.set('loading', true);
      this.get('model').save().then(() => {
        this.set('loading', false);
        this.get('notify').success('Saved Matching Gift.');
      }, (reason) => {
        let modelErrors = this.get('model.errors');
        modelErrors.setProperties(reason.errors);
        this.get('notify').warning('Something went wrong saving the MatchingGift.');
        this.set('loading', false);
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
  }
});
