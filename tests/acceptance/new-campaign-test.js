import { test } from 'qunit';
import moduleForAcceptance from 'dashboard/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | new campaign | ready', {
});

test('visiting /campaigns/new', function(assert) {
  visit('/campaigns/new');

  andThen(function() {
    assert.equal(currentURL(), '/campaigns/new');
  });
});

test('create new campaign and redirect to edit route', function(assert) {
  visit('/campaigns/new');
  andThen(function() {
    assert.equal(currentURL(), '/campaigns/new');
  });
  fillIn(".campaign-name input", "asdf")

  // andThen(function() {
  //   assert.equal(currentURL(), '/campaigns/new');
  // });
});
