import { truncateString } from '../../../helpers/truncate-string';
import { module, test } from 'qunit';
module('Unit | Helper | truncate string');

test('it works', function(assert) {
  let longString = `asdf asdf asdf asdf asdf sadf asdf
    asd fsdaf sdf asdf asdf asdfjaksdfj sakfjasdfsdkf
    asd fsdaf sdf asdf asdf asdfjaksdfj sakfjasdfsdkf
    asd fsdaf sdf asdf asdf asdfjaksdfj sakfjasdfsdkf
    asd fsdaf sdf asdf asdf asdfjaksdfj sakfjasdfsdkf
    jasf kajsfk asjfkasjfksadf jalskf jas;f`
  let result = truncateString([longString ], {chars: 10});
  assert.ok(result);
  assert.equal(result, "asdf asdf ...");
});
