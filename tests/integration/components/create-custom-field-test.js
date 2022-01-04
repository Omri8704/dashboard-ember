import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('create-custom-field', 'Integration | Component | create custom field', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{create-custom-field}}`);

  assert.ok(this.$().text().trim().includes('Select A Type'));

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#create-custom-field}}
      template block text
    {{/create-custom-field}}
  `);

  assert.ok(this.$().text().trim().includes('template block text'));
});
