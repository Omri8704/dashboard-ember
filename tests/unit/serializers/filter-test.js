import { moduleForModel, test } from 'ember-qunit';

moduleForModel('filter', 'Unit | Serializer | filter', {
  // Specify the other units that are required for this test.
  needs: ['serializer:filter', 'model:mailing', 'model:entity']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
