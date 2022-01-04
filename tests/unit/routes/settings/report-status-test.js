import { moduleFor, test } from 'ember-qunit';

moduleFor('route:settings/report-status', 'Unit | Route | settings/report status', {
  // Specify the other units that are required for this test.
  integration: true
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
