import { moduleForModel, test } from 'ember-qunit';

moduleForModel('entity-custom-value', 'Unit | Model | entity custom value', {
  // Specify the other units that are required for this test.
  needs: [
    'model:entity-custom-field',
    'validator:presence',
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
