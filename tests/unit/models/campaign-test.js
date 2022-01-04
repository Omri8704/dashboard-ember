import { moduleForModel, test } from 'ember-qunit';

moduleForModel('campaign', 'Unit | Model | campaign', {
  // Specify the other units that are required for this test.
  needs: [
  'model:entity',
  'model:donation',
  'model:user',
  'model:current-user',
  'model:cause',
  'model:initiative',
  'model:appeal',
  'model:invitation',
  'model:campaign_image',
  'model:campaign_video',
  'model:contact',
  'model:user-campaign',
  'model:donation-level',
  'model:mailing',
  'validator:presence',
  'validator:number',
  'validator:format'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
