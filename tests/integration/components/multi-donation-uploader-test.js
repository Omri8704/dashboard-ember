import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('multi-donation-uploader', 'Integration | Component | multi donation uploader', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  // Template block usage:
  this.render(hbs`
    {{#multi-donation-uploader}}
      template block text
    {{/multi-donation-uploader}}
  `);
  assert.ok(this.$().text().trim().includes('Download Template'));
});
