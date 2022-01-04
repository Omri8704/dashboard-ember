import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('email-filter-container', 'Integration | Component | email filter container', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.set("emailFilters", [])
  this.set("emailFilterOptions", [])
  // Template block usage:" + EOL +
  this.render(hbs`
    {{#email-filter-container
          emailFilters=(readonly emailFilters)
          emailFilterOptions=(readonly emailFilterOptions)
          as |
            emailFilterContainer
            emailFilters
            emailFilterOptions
            |
     }}
     Select Filter
    {{/email-filter-container}}
  `);

  assert.equal(this.$().text().trim(), 'Select Filter');
});
