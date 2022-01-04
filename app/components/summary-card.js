import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ["reportSummary"],
  headerText: 'Default Text',
  icon: 'fa-envelope',
  iconClass: Ember.computed(function() {
    return `fa fa-stack-1x ${this.get('icon')}`
  }),
  isMoney: false,
});
