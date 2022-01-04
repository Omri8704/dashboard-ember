import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('summary-card', 'Integration | Component | summary card', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{summary-card}}`);
  ['Default Text', 'Details'].forEach((term)=>{
    assert.ok(this.$().text().trim().includes(term, `should include ${term}`));
  })

});
