import { moduleForModel, test } from 'ember-qunit';

moduleForModel('report-filter', 'Unit | Model | report filter', {
  // Specify the other units that are required for this test.
  needs: [
    'model:entity',
    'model:current-user',
    'validator:presence',
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
