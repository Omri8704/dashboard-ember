import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('multistep-widget', 'Integration | Component | multistep widget cw', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  //this.render(hbs`{{multistep-widget}}`);

  //assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#multistep-widget currentStep="a" stepCount=1 as |w|}}
      {{#w.step name="a"}}
        template block text
      {{/w.step}}
    {{/multistep-widget}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
