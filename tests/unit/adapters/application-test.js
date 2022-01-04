import { moduleFor, test } from 'ember-qunit';
moduleFor('adapter:application', 'Unit | Adapter | ApplicationAdapter', {
  needs: ['service:session', 'service:notify', 'service:settings']
});

test('it exists', function(assert) {
  var adapter;
  adapter = this.subject();
  return assert.ok(adapter);
});
