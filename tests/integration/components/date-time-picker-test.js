import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('date-time-picker', 'Integration | Component | date time picker', {
  integration: true
});

test('renders with a time zone', function(assert) {

  this.set('timeZone', 'America/Los_Angeles')
  this.set('initialDate', '2017-03-04T10:10:00-08:00')

  this.render(hbs`
    {{date-time-picker defaultTimeZone=timeZone initialDate=initialDate}}
  `);

  assert.equal(this.$().text().trim(), '3/4/17 10:10 PST');
});

test('renders with the D/M/YY date format', function(assert) {

  this.set('initialDate', '2017-03-04T10:10:00-08:00')
  this.set('dateFormat', 'D/M/YY')

  this.render(hbs`
    {{date-time-picker initialDate=initialDate entityDateFormat=dateFormat}}
  `);

  assert.equal(this.$().text().trim(), '4/3/17 10:10 PST');
});

test('initial date and time zone have different offsets', function(assert) {

    this.set('timeZone', 'America/Los_Angeles')
    this.set('initialDate', '2017-03-03T10:10:00-04:00')
    this.set('dateFormat', 'M/D/YY')

    this.render(hbs`
      {{date-time-picker defaultTimeZone=timeZone initialDate=initialDate entityDateFormat=dateFormat}}
    `);

    assert.equal(this.$().text().trim(), '3/3/17 6:10 PST');
})
