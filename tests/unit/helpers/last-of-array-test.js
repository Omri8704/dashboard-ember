import { lastOfArray } from '../../../helpers/last-of-array';
import { module, test } from 'qunit';

module('Unit | Helper | last of array');

// Replace this with your real tests.
test('is not the end of the array and return true', function(assert) {
  let result = lastOfArray([1,1]);
  assert.ok(!result);
});
