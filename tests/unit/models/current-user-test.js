import { moduleForModel, test } from 'ember-qunit';

moduleForModel('current-user', 'Unit | Model | current user', {
  // Specify the other units that are required for this test.
  needs: ['model:entity', 'model:donation', 'model:user',
  'model:current-user', 'model:cause', 'model:invitation',
  'model:campaign', 'model:campaign_image', 'model:campaign_video',
  'model:contact', 'model:user-campaign', 'model:report-filter',
  'validator:presence', 'validator:format']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
