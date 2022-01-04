import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('time-picker', 'Unit | Component | time picker', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

const defaultProps = {
  onChange: () => { return null }
}

test('throw assertion error if time is not an integer', function(assert) {
  assert.throws(
    () => this.subject({time: 'str'}),
    Error('Assertion Failed: Time is required to be an integer')
  )
})

test('throw assertion error if min is not an integer', function(assert) {
  assert.throws(
    () => this.subject({min: 'str'}),
    Error('Assertion Failed: Min time is required to be an integer')
  )
})

test('throw assertion error if max is not an integer', function(assert) {
  assert.throws(
    () => this.subject({max: 'str'}),
    Error('Assertion Failed: Max time is required to be an integer')
  )
})

test('throw assertion error if onChange is not passed', function(assert) {
  assert.throws(
    () => this.subject(),
    Error('Assertion Failed: onChange action handler is required')
  )
})

test('_rollingTime rolls over for interval of plus 1', function(assert) {

  // Creates the component instance
  let component = this.subject(defaultProps);

  const delta = {
    time: 59,
    interval: 1,
    min: 0,
    max: 59
  }

  assert.equal(component.get('_rollingTime')(delta), 0)
})

test('_rollingTime rolls over for interval of minus 1', function(assert) {

  // Creates the component instance
  let component = this.subject(defaultProps);

  const delta = {
    time: 0,
    interval: -1,
    min: 0,
    max: 59
  }

  assert.equal(component.get('_rollingTime')(delta), 59)
})
