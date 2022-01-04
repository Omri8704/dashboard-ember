import { moduleForModel, test } from 'ember-qunit';

moduleForModel('event', 'Unit | Model | event', {
  // Specify the other units that are required for this test.
  needs: [
    'model:entity',
    'model:ticket',
    'model:ticket-level',
    'model:cause',
    'model:initiative',
    'model:appeal',
    'model:mailing',
    'validator:presence',
    'validator:has-many',
    'validator:length',
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
