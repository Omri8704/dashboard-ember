import { arrayToCommaSeparatedString } from '../../../helpers/array-to-comma-separated-string';
import { module, test } from 'qunit';

module('Unit | Helper | array to comma separated string');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = arrayToCommaSeparatedString(["asdf", "qwer"]);
  assert.ok(result);
});
