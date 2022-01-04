import Ember from 'ember';
import DS from 'ember-data';
import Promotion from './promotion';
import { validator, buildValidations } from 'ember-cp-validations';
import moment from 'moment'

const { computed } = Ember
const { hasMany, belongsTo, attr } = DS

const Validations = buildValidations({
  name: validator('presence', true),
  ticketLevels: validator(function(value, options, model, attribute) {
    if (model.get('noRegistration') == true) {
      return true
    }
    else {
      return model.get('ticketLevels') && model.get('ticketLevels.length') > 0
    }
  })
});

const Event = Promotion.extend(Validations, {
  ticketLevels:        hasMany("ticket-level"),
  tickets:             hasMany('ticket'),
  initiative:          belongsTo('initiative'),
  appeals:             hasMany('appeal'),
  name:                attr("string"),
  slug:                attr("string"),
  description:         attr("string"),
  capacity:            attr("string"),
  position:            attr("number"),
  img:                 attr("string"),
  logo:                attr("string"),
  reply_to:            attr("string"),
  categories:          attr(),
  start_date:          attr({defaultValue: new Date().toISOString()}),
  end_date:            attr({defaultValue: new Date().toISOString()}),
  registration_start:  attr({defaultValue: new Date().toISOString()}),
  registration_end:    attr({defaultValue: new Date().toISOString()}),
  location:            attr("string"),
  address:             attr("string"),
  status:              attr('string', { defaultValue: 'draft' }),
  noRegistration:      attr('boolean', { defaultValue: false }),
  enforceCapacity:     attr('boolean', { defaultValue: false }),
  emails_sent:         attr(),

  displayedStartDate: computed('start_date', function() {
    return moment(this.get('start_date')).format('MMM Do YYYY')
  }),

  displayedEndDate: computed('end_date', function() {
    return moment(this.get('end_date')).format('MMM Do YYYY')
  })
});

export default Event
