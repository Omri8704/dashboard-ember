import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('amplo-highcharts', 'Integration | Component | amplo highcharts', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{amplo-highcharts}}`);

  assert.equal(this.$().text().trim(), 'Created with Highcharts 4.2.7No data to displayValuesChart titleSeries 1');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#amplo-highcharts}}
    {{/amplo-highcharts}}
  `);

  assert.equal(this.$().text().trim(), 'Created with Highcharts 4.2.7No data to displayValuesChart titleSeries 1');

});
