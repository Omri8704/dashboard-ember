import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['progress-circle'],

  width: 50,
  height: 50,
  value: 0,

  pixelWidth: Ember.computed('width', function() {
    return `${this.get('width')}px`;
  }),

  pixelHeight: Ember.computed('height', function() {
    return `${this.get('height')}px`;
  }),

  circleX: Ember.computed('width', function() {
    return this.get('width') * 0.5;
  }),

  circleY: Ember.computed('height', function() {
    return this.get('height') * 0.5;
  }),

  radius: Ember.computed('width', function() {
    return this.get('width') * 0.44;
  }),

  dashOffset: Ember.computed('radius', function() {
    return Math.PI * this.get('radius') * 2;
  }),

  didInsertElement() {
    const $circle = $('.fill-circle');

    const radius = $circle.attr('r');
    const circumference = Math.PI * (radius * 2);

    const percentLength = ((100 - parseInt(this.get('value'))) / 100) * circumference || circumference;

    $circle.css({
      strokeDasharray: circumference
    });

    $('.progress-outline').attr('data-pct', this.get('value'))

    setTimeout( () => {
      if (this.get('value') == 100) {
        $circle.css({
          strokeDashoffset: 0
        });
      }
      else if (this.get('value') != 0) {
        $circle.css({
          strokeDashoffset: percentLength,
        });
      }
      else {
        $circle.css({
          strokeDashoffset: circumference
        });
      }
    }, 10)
  }
});
