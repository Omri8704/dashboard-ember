import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Controller.extend({
  settings: Ember.inject.service(),
  notify: Ember.inject.service(),
  matchingGiftsSection: Ember.computed.alias('model'),
  session: Ember.inject.service(),
  selectionStrategyOptions: ['campaign', 'manual'],

  isCampaign: (function () {
    return this.get('matchingGiftsSection.match_selection_strategy') == 'campaign';
  }).property(),

  campaignOptions: Ember.computed('settings.current_entity.campaigns', function () {
    this.store.query('campaign', {});
    const campaigns = this.get('settings.current_entity.campaigns');
    return campaigns || [];
  }),

  matchingGifts: (function () {
    return this.store.findAll('matching-gift');
  }).property(),
  selcectedMatchingGifts: [],

  mappableMatches: (function () {
    return DS.PromiseArray.create({
      promise: new Promise((resolve, reject) => {
        this.get('matchingGiftsSection.matchingGiftsSectionMappings').then((mappings) => {
          this.get('matchingGifts').then((matches) => {
            const mappableMatches = [];
            matches.forEach((match) => {
              let mappable = true;
              mappings.forEach((mapping) => {
                if (!mappable) { return; }
                if (match.get('title') == mapping.get('matchingGiftTitle')) { mappable = false; }
              });

              if (mappable) {
                mappableMatches.push(match);
              }
            });
            resolve(mappableMatches);
          }).catch(() => { reject('failed'); });
        }).catch(() => { reject('failed'); });
      }),
    });
  }).property(),

  actions: {
    updateMatchingGiftsSection() {
      this.set('loading', true);
      this.get('model').save().then(() => {
        this.set('loading', false);
        this.get('notify').success('Saved Matching Gift.');
      }, (reason) => {
        const modelErrors = this.get('model.errors');
        modelErrors.setProperties(reason.errors);
        this.get('notify').warning('Something went wrong saving the Matching Gift.');
        this.set('loading', false);
      });
    },
    updateSelectionStrategy(data) {
      this.get('model').set('match_selection_strategy', data);
      this.set('isCampaign', data == 'campaign');
    },
    selectMatchingGift(data) {
      this.set('selcectedMatchingGifts', data);
    },
    addMatchesToMapping(_) {
      const model = this.get('model');
      const matchesLength = this.get('selcectedMatchingGifts').length;
      if (matchesLength == 0) { return; }

      let totalResolved = 0;

      const updateMappableMatches = () => {
        const matchingGiftsSectionMappings = this.get('matchingGiftsSection.matchingGiftsSectionMappings');
        const mappableMatches = [];
        const matches = this.get('matchingGifts');
        matches.forEach((match) => {
          let mappable = true;
          matchingGiftsSectionMappings.forEach((mapping) => {
            if (!mappable) { return; }
            if (match.get('title') == mapping.get('matchingGiftTitle')) { mappable = false; }
          });

          if (mappable) {
            mappableMatches.push(match);
          }
        });
        this.set('mappableMatches', mappableMatches);
        this.set('selcectedMatchingGifts', []);
      };

      const resolveMatchSuccess = (arg) => {
        totalResolved += 1;
        if (totalResolved == matchesLength) {
          this.get('notify').success('Added Matching Gifts to Section');
          updateMappableMatches();
        }
      };

      const resolveMatchError = (arg, resp) => {
        this.get('notify').error('Error adding Matching Gifts to Section.');
      };

      this.get('selcectedMatchingGifts').forEach(match => {
        this.get('store').createRecord('matching-gifts-section-mapping', {
          position: match.get('position') || 0,
          matchingGift: match,
          matchingGiftsSection: model,
        }).save().then(resolveMatchSuccess, resolveMatchError);
      });
    },
    updateMapping(mapping) {
      mapping.save()
        .then(() => {
          this.get('notify').success('Matching Gift updated.');
        })
        .catch(() => {
          this.get('notify').error('Error updating Matching Gift');
        });
    },
    destroyMapping(mappingToDestroy) {
      mappingToDestroy.destroyRecord()
        .then(() => {
          this.get('notify').success('Removed Matching Gift.');
          const matchingGiftsSectionMappings = this.get('matchingGiftsSection.matchingGiftsSectionMappings');
          const mappableMatches = [];
          const matches = this.get('matchingGifts');
          matches.forEach((match) => {
            let mappable = true;
            matchingGiftsSectionMappings.forEach((mapping) => {
              if (!mappable) { return; }
              if (match.get('title') == mapping.get('matchingGiftTitle')) { mappable = false; }
            });

            if (mappable) {
              mappableMatches.push(match);
            }
          });
          this.set('mappableMatches', mappableMatches);
          this.set('selcectedMatchingGifts', []);
        })
        .catch(() => {
          this.get('notify').error('Error removing Matching Gift.');
        });
    },
  },
});
