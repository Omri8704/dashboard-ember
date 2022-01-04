import { moduleForModel, test } from 'ember-qunit';

moduleForModel('address', 'Unit | Model | address', {
  // Specify the other units that are required for this test.
  needs: ['model:user', 'model:entity', 'model:donation',
  'validator:presence' ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
