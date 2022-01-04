import Ember from 'ember';
export default Ember.Controller.extend({
  settings: Ember.inject.service(),
  session: Ember.inject.service(),
  upcomingCampaigns: (function(){
    return Ember.computed.filterBy('model', 'status', 'pending').concat(Ember.computed.filterBy('model', 'status', 'staging'))
  }),
  pastCampaigns: Ember.computed.filterBy('model', 'status', 'closed'),
  currentCampaigns: Ember.computed.filterBy('model', 'status', 'active'),
  filteredModel: (function() {
    if (this.get("model.firstObject.status") === 'active') {
      this.setFilter('current');
      return this.get("currentCampaigns");
    } else if (this.get("model.firstObject.status") === 'pending' || this.get("model.firstObject.status") === 'staging') {
      this.setFilter('upcoming');
      return this.get("upcomingCampaigns");
    } else {
      this.setFilter('past');
      return this.get("pastCampaigns");
    }
  }).property(),
  onNew: Ember.computed('settings.currentPath',function() {
    return this.get("settings.currentPath").indexOf("new") > -1
  }),
  setFilter: function(filter) {
    this.setProperties({
      upcoming: false,
      current: false,
      past: false,
      filterName: filter
    });
    return this.set(filter, true);
  },
  actions: {
    changeFilter: function(filter) {
      if (filter === 'upcoming') {
        this.set('filteredModel', this.get('upcomingCampaigns'));
      } else if (filter === 'current') {
        this.set('filteredModel', this.get("currentCampaigns"));
      } else {
        this.set('filteredModel', this.get("pastCampaigns"));
      }
      return this.setFilter(filter);
    }
  }
});
