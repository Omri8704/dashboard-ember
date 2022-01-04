import { test, moduleFor } from 'ember-qunit';
moduleFor('controller:campaigns', 'Unit | Controller | campaigns', {
  // Specify the other units that are required for this test.
  integration: true
});
test('it exists', function(assert) {
  var controller;
  controller = this.subject();
  return assert.ok(controller);
});
