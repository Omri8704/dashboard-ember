import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('amplo-pagination', 'Integration | Component | amplo pagination', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{amplo-pagination}}`);

  const text = this.$().text().trim()
  assert.ok(text.includes('Previous'));
  assert.ok(text.includes('Next'));

});
