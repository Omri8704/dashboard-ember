import { test, moduleFor } from 'ember-qunit';
moduleFor('route:member-campaign', {
  integration: true
});

test('it exists', function(assert) {
  var route;
  route = this.subject();
  return assert.ok(route);
});
