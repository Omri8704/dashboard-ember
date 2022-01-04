import { moduleForModel, test } from 'ember-qunit';

moduleForModel('filter', 'Unit | Model | filter', {
  // Specify the other units that are required for this test.
  needs: [
    'model:entity',
    'model:mailing',
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
