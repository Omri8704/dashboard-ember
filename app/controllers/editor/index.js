import Ember from 'ember';

const {
  Controller,
  computed,
  inject
} = Ember

export default Controller.extend({
  tilesSections: computed.alias('model'),
  settings: inject.service(),
  actions: {
    updateSelectionStrategy(tilesSection) {
      if (tilesSection.get('campaignSelectionStrategy') == 'manual') {
        tilesSection.set('campaignSelectionStrategy', 'automatic');
      }
      else {
        tilesSection.set('campaignSelectionStrategy', 'manual');
      }
      tilesSection.save();
    }
  }
});
