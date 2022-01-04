import { moduleForModel, test } from 'ember-qunit';

moduleForModel('campaign-tiles-section', 'Unit | Model | campaign tiles section', {
  // Specify the other units that are required for this test.
  needs: ['model:campaign-tiles-section-mapping']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
