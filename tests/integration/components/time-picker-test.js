import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('time-picker', 'Integration | Component | time picker', {
  integration: true
});

const componentContent = function() {
  return this.$().text().trim()
}

test('it renders', function(assert) {
  this.set('handleChange', () => null)

  this.render(hbs`
    {{time-picker onChange=handleChange}}
  `);

  assert.equal(componentContent.call(this), '01');
});
