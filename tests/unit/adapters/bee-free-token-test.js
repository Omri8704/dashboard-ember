import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:bee-free-token', 'Unit | Adapter | bee free token', {
  // Specify the other units that are required for this test.
  needs: ['service:session', 'service:settings', 'service:notify']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});
