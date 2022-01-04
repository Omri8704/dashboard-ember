import Ember from 'ember';

import { task, timeout }   from 'ember-concurrency'

const { get, assert } = Ember

export default Ember.Component.extend({
  time: 1,
  max: 12,
  min: 1,
  interval: 1,
  negativeInterval: Ember.computed('interval', function() {
    return -get(this, 'interval')
  }),

  init() {
    this._super(...arguments)

    assert('Time is required to be an integer', typeof get(this, 'time') === 'number' )
    assert('Max time is required to be an integer', typeof get(this, 'max') === 'number' )
    assert('Min time is required to be an integer', typeof get(this, 'min') === 'number' )
    assert('onChange action handler is required', typeof get(this, 'onChange') === 'function')
  },

  formattedTime: Ember.computed('time', function() {
    const time = get(this, 'time')

    if (time >= 0 && time < 10) {
      return `0${time}`
    }
    else {
      return `${time}`
    }
  }),

  _rollingTime({ time, interval, min, max }) {
    if (( min <= time + interval ) && (time + interval <= max) ) {
      return time + interval
    }

    else {
      if (interval >= 0) {
        return min
      }
      else {
        return max
      }
    }
  },

  increment: task( function * (interval) {
    let speed = 300

    /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
    while(true) {
      const time = get(this, 'time')

      const rolledTime = this._rollingTime({
        min: get(this, 'min'),
        max: get(this, 'max'),
        interval,
        time,
      })

      get(this, 'onChange')(rolledTime)

      yield timeout(speed)

      speed = Math.max(35, speed * .7)
    }
  }),

  actions: {
    stopUpdating() {
      get(this, 'increment').cancelAll()
    },

    handleClick() {
      // handle the click but don't do anything with it
    },

    updateTime(interval) {
      get(this, 'increment').perform(interval)
    }
  }
});
