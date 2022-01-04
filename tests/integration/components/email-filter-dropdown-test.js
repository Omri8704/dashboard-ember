import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('email-filter-dropdown', 'Integration | Component | email filter dropdown', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{email-filter-dropdown}}`);

  assert.equal(this.$().text().trim(), 'Select Filter');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#email-filter-dropdown}}
      template block text
    {{/email-filter-dropdown}}
  `);

  assert.ok(this.$().text().trim().includes('template block text'));
});
