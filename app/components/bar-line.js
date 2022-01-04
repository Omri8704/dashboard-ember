import Ember from 'ember';

export default Ember.Component.extend({
  fraction: 0,

  classNames: ['bar-line-outer'],

  didInsertElement() {
    const fraction = parseFloat(this.get('fraction'))

    if (!isNaN(fraction)) {
      const percent = fraction > 1 ? 100 : fraction * 100
      $('.bar-line').animate({
        width: `${percent}%`
      }, 3000)
    }
  }
});
