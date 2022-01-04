import { moduleForModel, test } from 'ember-qunit';

moduleForModel('campaign-tiles-section', 'Unit | Serializer | campaign tiles section', {
  // Specify the other units that are required for this test.
  needs: ['serializer:campaign-tiles-section']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
