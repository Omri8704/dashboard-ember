import { moduleForModel, test } from 'ember-qunit';

moduleForModel('campaign-video', 'Unit | Model | campaign video', {
  // Specify the other units that are required for this test.
  needs: ['model:entity', 'model:donation', 'model:user', 'model:current-user', 'model:cause', 'model:invitation', 'model:campaign', 'model:campaign_image', 'model:contact']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
