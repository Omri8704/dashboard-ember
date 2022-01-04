import { moduleForModel, test } from 'ember-qunit';

moduleForModel('entity-custom-field', 'Unit | Serializer | entity custom field', {
  // Specify the other units that are required for this test.
  needs: [
    'serializer:entity-custom-field',
    'model:entity',
    'model:event',
    'model:ticket-level',
    'model:entity-custom-value',
    'validator:presence',
    'validator:ds-error',
  ]
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
