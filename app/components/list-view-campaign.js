import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['list-view-campaign'],
  shortDescription: (function() {
    if (this.get('campaign.description')) {
      return this.get('campaign.description').slice(0, 50);
    }
  }).property("campaign.description"),
  logo: (function() {
    if (this.get('campaign.logo')) {
      return this.get('campaign.logo');
    } else {
      return 'assets/images/light_gray.png';
    }
  }).property("campaign.logo")
});
