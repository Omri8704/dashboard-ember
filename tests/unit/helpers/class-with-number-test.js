// Generated by CoffeeScript 1.10.0
import { classWithNumber } from '../../../helpers/class-with-number';
import { module, test } from 'qunit';
module('Unit | Helper | class with number');

test('it works', function(assert) {
  var result;
  result = classWithNumber(42);
  return assert.ok(result);
});
