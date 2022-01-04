import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  classNames: ['double-date'],
  startLabel: 'From',
  endLabel: 'To',
  defaultDateFrom: moment().format(),
  defaultDateTo: moment().format(),
  format: null,
  didInsertElement() {
    this.get('dateFromAction')(moment().format())
    this.get('dateToAction')(moment().format())
  }
});
