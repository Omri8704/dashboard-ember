import { moduleForModel, test } from 'ember-qunit';

moduleForModel('entity-custom-field', 'Unit | Model | entity custom field', {
  // Specify the other units that are required for this test.
  needs: [
    'model:entity',
    'model:event',
    'model:ticket-level',
    'model:entity-custom-value',
    'validator:presence',
    'validator:ds-error',
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
