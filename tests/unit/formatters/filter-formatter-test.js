import { formatFilter } from '../../../formatters/filter-formatters/index';
import { module, test } from 'qunit';

module('Unit | Formatter | Filter Formatter | ready');

// Replace this with your real tests.
test('formats with null and undefined', function(assert) {
  assert.expect(4);

  const nullFormattedYes = formatFilter(null, 'yes');
  const nullFormattedNo = formatFilter(null, 'no');
  const undefinedFormatterYes = formatFilter(undefined, 'yes');
  const undefinedFormatterNo = formatFilter(undefined, 'no');

  assert.equal(nullFormattedYes, 'has done action', 'null formatted with truthy');
  assert.equal(nullFormattedNo, 'has not done action', 'null formamted with falsey');
  assert.equal(undefinedFormatterYes, 'has done action', 'undefined formatted with truthy');
  assert.equal(undefinedFormatterNo, 'has not done action', 'undefined formatted with falsey');
});

test('formats with filter properties', function(assert) {
  assert.expect(4);

  const donatedFormattedYes = formatFilter('donated', 'yes');
  const donatedFormattedNo = formatFilter('donated', 'no');
  const contributeButtonYes = formatFilter('contribute_button', 'yes');
  const contributeButtonNo = formatFilter('contribute_button', 'no');

  assert.equal(donatedFormattedYes, 'has donated', 'donated formmatted with truthy');
  assert.equal(donatedFormattedNo, 'has not donated', 'donated formatted with falsey');
  assert.equal(contributeButtonYes, 'has clicked the contribute button', 'contribute button formatted with truthy');
  assert.equal(contributeButtonNo, 'has not clicked the contribute button', 'contribute button formatted with falsey');
});
