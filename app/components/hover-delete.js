import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['btn', 'btn-default-flat', 'm-sm-t'],
  defaultIcon: 'fa-square-o',
  hoverIcon: 'fa-times',
  showDefault: true,

  mouseEnter() {
    this.toggleProperty('showDefault');
  },
  mouseLeave() {
    this.toggleProperty('showDefault');
  }
});
