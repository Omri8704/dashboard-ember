import {
  create,
  text,
  clickable
} from 'ember-cli-page-object';
import testSelector from 'ember-test-selectors';
import moment from 'moment';

const fromInput = [testSelector('from-container'), testSelector('date-text')].join(' ')
const toInput = [testSelector('to-container'), testSelector('date-text')].join(' ')

export default create({
  fromText: text(fromInput),
  toText: text(toInput),
  clickFromInput: clickable(fromInput),
  clickFromDate: clickable(`${testSelector('from-container')} [data-date="${moment().tz('America/Los_Angeles').add(1, 'day').format('YYYY-MM-DD')}"]`),
  clickToInput: clickable(toInput),
  clickToDate: clickable(`${testSelector('to-container')} [data-date="${moment().tz('America/Los_Angeles').add(8, 'days').format('YYYY-MM-DD')}"]`),
});
