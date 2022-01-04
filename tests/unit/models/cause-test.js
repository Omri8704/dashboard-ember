import { moduleForModel, test } from 'ember-qunit';

moduleForModel('cause', 'Unit | Model | cause', {
  // Specify the other units that are required for this test.
  needs: [
  'model:entity',
  'model:donation',
  'model:user',
  'model:current-user',
  'model:cause',
  'model:initiative',
  'model:appeal',
  'model:ticket-level',
  'model:invitation',
  'model:campaign',
  'model:campaign_image',
  'model:campaign_video',
  'model:contact',
  'validator:number',
  'validator:presence']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
