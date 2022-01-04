import { moduleFor, test } from 'ember-qunit';

moduleFor('route:campaigns', 'Unit | Route | campaigns', {
  // Specify the other units that are required for this test.
  integration: true
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
