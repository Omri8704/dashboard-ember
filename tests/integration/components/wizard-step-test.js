import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('wizard-step', 'Integration | Component | wizard step', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set("stepFunction", function(){ return true })
  this.render(hbs`{{wizard-step register-step=stepFunction name="a"}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#wizard-step name="a" isActive=true register-step=stepFunction }}
      template block text
    {{/wizard-step}}
  `);

  // assert.async()
  assert.equal(this.$().text().trim(), 'template block text');
});
