import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('event-form', 'Integration | Component | event form', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  assert.expect(6);

  this.set('timeZone', 'America/Los_Angeles')

  this.render(hbs`{{event-form entityTimeZone=timeZone}}`);

  ['Name', 'Description', 'Start Date', 'End Date', 'Image', 'Location'].forEach((item)=>{
    assert.ok(this.$().text().trim().includes(item), `must have ${item}`);
  })

});
