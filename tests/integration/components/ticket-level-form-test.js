import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ticket-level-form', 'Integration | Component | ticket level form', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{ticket-level-form}}`);

  let a = this;
  ['Name', 'amount', 'description', 'Number of Tickets'].forEach( (item)=>{
    assert.notEqual(a.$().text().indexOf(item), -1, `must have ${item}`);
  })

});
