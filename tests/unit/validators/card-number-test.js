import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:card-number', 'Unit | Validator | card-number', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
