import { test, moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('summary-card-emails', 'Integration | Component | summary card emails', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{summary-card-emails}}`);
  assert.ok(this.$().text().trim().includes('Emails Sent'));
});
