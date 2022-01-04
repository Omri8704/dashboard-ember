
import { displayTimeZone } from 'dashboard/helpers/display-time-zone';
import { module, test } from 'qunit';

module('Unit | Helper | display time zone');

// Replace this with your real tests.
test('it works', function(assert) {
  let losAngeles = displayTimeZone(['America/Los_Angeles'])

  assert.equal(losAngeles, 'Los Angeles')

  let indianapolis = displayTimeZone(['America/Indiana/Indianapolis'])

  assert.equal(indianapolis, 'Indianapolis')
});
