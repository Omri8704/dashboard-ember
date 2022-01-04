import Ember  from 'ember';
import DS     from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  owner:        DS.attr('string'),
  completion:   DS.attr('string'),
  size:         DS.attr('number'),
  filename:     DS.attr('string'),
  counter:      DS.attr('number'),
  timestamp:    DS.attr('string'),
  success:      DS.attr('number'),
  error:        DS.attr('number', {
                  defaultValue: 0
                }),

  formattedTimestamp: Ember.computed( 'timestamp', function() {
    return moment.unix(this.get('timestamp')).format('MMM Do YYYY, h:mm A');
  }),

  completionValue: Ember.computed('completion', function() {
    return this.get('completion').substr(0, this.get('completion').length - 1);
  })
});
