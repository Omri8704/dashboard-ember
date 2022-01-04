import { pluralizeWord } from '../../../helpers/pluralize-word';
import { module, test } from 'qunit';

module('Unit | Helper | pluralize word | ready');

test('it can replace person or people depending on input value', function(assert) {
  let personTest = pluralizeWord([1, 'person', 'people']);

  assert.equal(personTest, 'person', 'expect unplural version of people');

  let peopleTest = pluralizeWord([0, 'person', 'people']);

  assert.equal(peopleTest, 'people', 'expect plural version of person');
});
