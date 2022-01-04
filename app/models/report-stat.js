import Ember  from 'ember';
import DS     from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  user:         DS.attr('string'),
  completed:    DS.attr('string'),
  beneficiary_names: DS.attr('string'),

  formattedCompleted: Ember.computed( 'completed', function() {
    return moment.unix(this.get('completed')).format('MMM Do YYYY, h:mm A');
  }),

});
