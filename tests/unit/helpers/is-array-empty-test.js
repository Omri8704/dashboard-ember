// Generated by CoffeeScript 1.10.0
import { isArrayEmpty } from '../../../helpers/is-array-empty';
import { module, test } from 'qunit';
module('Unit | Helper | is array empty');

test('it works', function(assert) {
  var result;
  result = isArrayEmpty(42);
  return assert.ok(result);
});
