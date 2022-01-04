import { moduleForModel, test } from 'ember-qunit';

moduleForModel('email-template', 'Unit | Model | email template', {
  // Specify the other units that are required for this test.
  needs: [
    'model:mailing', 'model:entity',
    'validator:presence',
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
