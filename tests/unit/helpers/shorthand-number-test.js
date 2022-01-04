import { shorthandNumber } from '../../../helpers/shorthand-number';
import { module, test } from 'qunit';
module('Unit | Helper | shorthand number');

test('it turns 4200 into 4.2k and 42000 into 42k', function(assert) {
  let fourthousand = shorthandNumber([4200]);
  assert.equal(fourthousand, '4.2k');
  let fortytwothousand = shorthandNumber([42000]);
  assert.equal(fortytwothousand, '42k');
});
