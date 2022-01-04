import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('campaign-gallery-creator', 'Integration | Component | campaign gallery creator', {
  integration: true,

  beforeEach: function () {
    this.inject.service('store', { as: 'store' });
  }
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{campaign-gallery-creator}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#campaign-gallery-creator}}
      template block text
    {{/campaign-gallery-creator}}
  `);

  assert.equal(this.$().text().trim(), '');
});
