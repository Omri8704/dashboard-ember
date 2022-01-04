import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:conditional-don-type', 'Unit | Validator | conditional-don-type', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
