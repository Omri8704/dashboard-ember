import { test, moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
moduleForComponent('summary-card-interaction', 'Integration | Component | summary card interaction', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{summary-card-interaction}}`);
  assert.ok(this.$().text().trim().includes('Page Interactions'));
});
