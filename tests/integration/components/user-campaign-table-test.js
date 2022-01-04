import { test, moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
moduleForComponent('user-campaign-table', 'Integration | Component | user campaign table', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);
  this.set('participants', [])
  this.render(hbs`
    {{user-campaign-table participants=participants}}
  `);
  assert.equal(this.$('.user-campaign-table-header').length, 1, 'it renders header');
  assert.equal(this.$('table.user-campaign-table').length, 1, 'it renders table');
});
