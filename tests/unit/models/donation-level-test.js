import { moduleForModel, test } from 'ember-qunit';

moduleForModel('donation-level', 'Unit | Model | donation level', {
  // Specify the other units that are required for this test.
  needs: [
    'model:campaign', 'model:donation', 'validator:presence'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
