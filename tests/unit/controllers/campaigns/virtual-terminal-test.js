import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:campaigns/virtual-terminal', 'Unit | Controller | virtual terminal', {
  integration: true
});

// Replace this with your real tests.
test('it exists', function(assert) {
  Ember.run(()=>{
    let controller = this.subject();
    assert.ok(controller);
  })
});
