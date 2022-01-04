import { prettyDate } from '../../../helpers/pretty-date';
import { module, test } from 'qunit';

module('Unit | Helper | pretty date | ready');

test('format the date to make it readable', function(assert) {
  let date = new Date("December 17, 2015 15:59:00")
  let result = prettyDate([date.toString()]);
  return assert.equal(result , 'December 17th, 2015 3:59 PM', 'pretty up that date');
});

test('format the date with M/D/YY', function(assert) {
  var result;
  result = prettyDate(['2015-12-17T15:59:05.151-07:00', 'M/D/YY']);
  return assert.equal(result , '12/17/15 10:59 PM', 'format that date');
});

test('format the date with D/M/YY', function(assert) {
  var result;
  result = prettyDate(['2015-12-17T15:59:05.151-07:00', 'D/M/YY']);
  return assert.equal(result , '17/12/15 10:59 PM', 'format that date');
});
