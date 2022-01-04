import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mailing-filter-selector', 'Integration | Component | mailing filter selector', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mailing-filter-selector}}`);

  assert.equal(this.$().text().trim(), 'Select Filter');

  // Template block usage:
  this.render(hbs`
    {{#mailing-filter-selector}}
      template block text
    {{/mailing-filter-selector}}
  `);

  assert.equal(this.$().text().trim(), 'Select Filter');
});
