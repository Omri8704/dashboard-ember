import Ember from 'ember';
import moment from 'moment';

export function formatterConverter(params/*, hash*/) {
  const formatter = params[0];
  const value = params[1];

  switch (formatter) {
    case 'currency':
      return `$${value}`;
    case 'short_date':
      return moment(value).format('M/DD/YYYY');
    case 'short_dash_date':
      return moment(value).format('M-DD-YYYY');
    case 'reverse_short_date':
      return moment(value).format('YYYY/DD/M');
    case 'reverse_dash_date':
      return moment(value).format('YYYY-DD-M');
    case 'short_date_time':
      return moment(value).format('M/DD/YYYY h:mm a');
    case 'short_dash_date_time':
      return moment(value).format('M-DD-YYYY h:mm a')
    case 'boolean':
      return (value) ? `Yes` : `No`;
    default:
      return params[1];
  }
}

export default Ember.Helper.helper(formatterConverter);
