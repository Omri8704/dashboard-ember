import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:conditional-ticket-amount', 'Unit | Validator | conditional-ticket-amount', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
