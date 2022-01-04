import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bee-free', 'Integration | Component | bee free', {
  integration: true,
  beforeEach: function () {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://app-rsrc.getbee.io/plugin/BeePlugin.js'
    $('head').append(script)
  }
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{bee-free}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#bee-free}}
      template block text
    {{/bee-free}}
  `);

  assert.equal(this.$().text().trim(), '');
});
