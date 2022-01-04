import { test, moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
moduleForComponent('summary-card-percentage', 'Integration | Component | summary card percentage', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{summary-card-percentage}}`);
  assert.ok(this.$().text().trim().includes('Email Deliverability'));
});
