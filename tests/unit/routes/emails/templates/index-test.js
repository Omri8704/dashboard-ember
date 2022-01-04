import { moduleFor, test } from 'ember-qunit';

moduleFor('route:emails/templates/index', 'Unit | Route | emails/templates/index', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  integration: true
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
