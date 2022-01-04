import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user', 'Unit | Model | user', {
  // Specify the other units that are required for this test.
  needs: ['model:entity', 'model:donation', 'model:user',
    'model:current-user', 'model:cause', 'model:invitation',
    'model:campaign', 'model:campaign_image', 'model:campaign_video',
    'model:address', 'model:mailing', 'model:user-campaign',
    'model:user-segment',
    'validator:presence', 'validator:format']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
