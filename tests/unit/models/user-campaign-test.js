import { moduleForModel, test } from 'ember-qunit';
moduleForModel('user-campaign', 'Unit | Model | user campaign', {
  needs: [
    'model:entity',
    'model:campaign',
    "model:donation-conversion",
    'model:user',
    'model:contact',
    'model:current-user',
    'model:contact',
    'validator:presence',
  ]
});

test('it exists', function(assert) {
  var model;
  model = this.subject();
  return assert.ok(!!model);
});
