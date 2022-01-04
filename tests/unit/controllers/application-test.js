import { test, moduleFor } from 'ember-qunit';
moduleFor('controller:application', 'Unit | Controller | application', {
  // Specify the other units that are required for this test.
  integration: true
});

test('it exists', function(assert) {
  var controller;
  controller = this.subject();
  return assert.ok(controller);
});
