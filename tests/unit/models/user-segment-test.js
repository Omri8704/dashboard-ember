import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user-segment', 'Unit | Model | user segment', {
  // Specify the other units that are required for this test.
  needs: [
    'model:mailing',
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
