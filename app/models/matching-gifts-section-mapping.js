import DS from 'ember-data';

export default DS.Model.extend({
  campaignName: DS.attr('string'),
  matchingGiftTitle: DS.attr('string'),
  position: DS.attr('number'),

  matchingGift: DS.belongsTo('matching-gift'),
  matchingGiftsSection: DS.belongsTo('matching-gifts-section'),
});
