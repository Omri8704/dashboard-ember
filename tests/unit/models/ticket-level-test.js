import { moduleForModel, test } from 'ember-qunit';

moduleForModel('ticket-level', 'Unit | Model | ticket level', {
  // Specify the other units that are required for this test.
  needs: [
    'model:event',
    'model:cause',
    'model:initiative',
    'model:appeal',
    'model:campaign',
    'model:entity-custom-field',
    'validator:presence',
    'validator:number',
    'validator:conditional-ticket-amount',
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
