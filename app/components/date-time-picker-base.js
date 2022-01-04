import Ember      from 'ember';
import moment     from 'moment'

import timeZones  from '../utils/time-zones'

const { get, set } = Ember

export default Ember.Component.extend({
  currentStep: 1,
  editing:     false,

  initialDate: null,
  _defaultTimeZone: 'America/Los_Angeles',
  defaultTimeZone: 'America/Los_Angeles',

  timeZones,

  selectedDate:     null,
  selectedHour:     null,
  selectedMinute:   null,
  selectedTimeZone: null,

  hours: ( () => {
    const hours = Ember.A()

    for (let i = 1; i <= 12; i++) {
      hours.push(i)
    }

    return hours
  })(),

  minutes: ( () => {
    const minutes = Ember.A()

    for (let i = 1; i <= 59; i++) {
      if (i % 5 == 0) {
        minutes.push(i)
      }
    }

    return minutes
  })(),

  init() {
    this._super(...arguments)

    let initialDate

    const defaultTimeZone = get(this, 'defaultTimeZone') || get(this, '_defaultTimeZone')

    if (get(this, 'initialDate')) {
      const momentDate = moment(get(this, 'initialDate')).tz(defaultTimeZone)

      if (momentDate.isValid()) {
        initialDate = momentDate
      }
      else {
        throw new Error(`Component | date-picker | ${get(this, 'initialDate')} doesn't format to valid moment object`)
      }
    }
    else {
      initialDate = moment().tz(defaultTimeZone)
    }

    set(this, 'selectedDate', initialDate)
    set(this, 'selectedHour', parseInt(initialDate.format('H')))
    set(this, 'selectedMinute', parseInt(initialDate.format('m')))
    set(this, 'selectedTimeZone', defaultTimeZone)
  },

  _resetState() {
    const initialDate = moment(get(this, 'initialDate'))

    set(this, 'calenderCenter', undefined)
    set(this, 'editing', false)
    set(this, 'selectedDate', get(this, 'initialDate'))
    set(this, 'selectedHour', parseInt(initialDate.format('H')) )
    set(this, 'selectedMinute', parseInt(initialDate.format('m')) )
    set(this, 'selectedTimeZone', get(this, 'defaultTimeZone'))

    if (get(this, 'currentStep') > 1) {
      this._resetStepCount()
    }
  },

  _resetStepCount() {
    // let liquid fire run the animation for editing so the step animation is not fired
    Ember.run.later(this, () => set(this, 'currentStep', 1), 500)
  },

  _formatWithZero(attr) {
    if (0 <= attr && attr < 10) {
      return `0${attr}`
    }
    else {
      return attr
    }
  },

  formattedHour: Ember.computed('selectedHour', function() {
    return this._formatWithZero(get(this, 'selectedHour'))
  }),

  formattedMinute: Ember.computed('selectedMinute', function() {
    return this._formatWithZero(get(this, 'selectedMinute'))
  }),

  formattedDate: Ember.computed('selectedDate', function() {
    return moment(get(this, 'selectedDate')).format('YYYY-MM-DD')
  }),

  formattedDateTime: Ember.computed(
    'formattedDate',
    'formattedHour',
    'formattedMinute',
    function() {
      return `${get(this, 'formattedDate')} ${get(this, 'formattedHour')}:${get(this, 'formattedMinute')}:00`
  }),

  utcDateTime: Ember.computed(
    'formattedDateTime',
    'selectedTimeZone',
    function() {
      return moment.tz(get(this, 'formattedDateTime'), 'YYYY-MM-DD HH:mm:ss', get(this, 'selectedTimeZone')).format()
  }),

  displayedDateTime: Ember.computed(
    'formattedDateTime',
    'selectedTimeZone',
    function() {
      const entityDateFormat = get(this, 'entityDateFormat');
      
      return moment.tz(get(this, 'formattedDateTime'), get(this, 'selectedTimeZone')).format(`${entityDateFormat ? entityDateFormat : 'M/D/YY'} H:mm z`)
  }),

  actions: {
    setCalenderCenter(center) {
      this.set('calenderCenter', center)
    },

    toggleEditing() {
      if (get(this, 'editing')) {
        this._resetState()
      }
      else {
        set(this, 'editing', true)
      }
    },

    resetState() {
      this._resetState()
    },

    selectDate(date) {
      this.set('selectedDate', date)
      this.set('currentStep', 2)
    },

    saveDateTime() {
      this.toggleProperty('editing')
      get(this, 'onSaveDateTime')(get(this, 'utcDateTime'))

      this._resetStepCount()
    }
  }
});
