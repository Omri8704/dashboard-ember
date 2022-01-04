import { test, moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
moduleForComponent('campaigns-table', 'Integration | Component | campaigns table', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(4);
  this.render(hbs("{{campaigns-table}}"));
  const text = this.$().text().trim();
  assert.ok(text.includes('Campaign Name'));
  assert.ok(text.includes('Campaign Type'));
  assert.ok(text.includes('Days Left'));
  assert.ok(text.includes('Actions'));
});
