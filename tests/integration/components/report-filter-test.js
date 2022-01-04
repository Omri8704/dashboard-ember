import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('report-filter', 'Integration | Component | report filter', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.set('campaigns', [])
  this.set('events', [])
  this.set('reportFilters', [])
  this.set('reportFilter', {})
  this.render(hbs`
    {{report-filter
      campaigns=(readonly campaigns)
      events=(readonly events)
      reportFilters=reportFilters
      newReport=reportFilter
      }}
  `);

  assert.ok(this.$().text().trim().includes('Generate Transaction Reports'), 'includes some text');
});
