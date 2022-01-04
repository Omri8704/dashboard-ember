import { moduleForComponent, test } from 'ember-qunit';
import moment from 'moment'

moduleForComponent('date-time-picker-base', 'Unit | Component | date time picker base', {
  unit: true
});

test('throws error if initial date is not specified', function(assert) {
  assert.throws(
    () => this.subject({ initialDate: 'invalid date'}),
    Error("Component | date-picker | invalid date doesn't format to valid moment object")
  )
});

test('formats to a moment date time and to utc', function(assert) {
  const component = this.subject()

  component.setProperties({
    selectedDate: "03/03/2017",
    selectedHour: 10,
    selectedMinute: 10,
    selectedTimeZone: 'America/Los_Angeles'
  }
)
  assert.equal(
    component.get('formattedDateTime'),
    moment.tz('2017-03-03 10:10:00',  'YYYY-MM-DD HH:mm:ss', 'America/Los_Angeles').format('YYYY-MM-DD HH:mm:ss')
  )

  assert.equal(
    component.get('utcDateTime'),
    '2017-03-03T10:10:00-08:00'
  )
})
