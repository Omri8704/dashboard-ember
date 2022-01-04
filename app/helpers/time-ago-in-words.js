import Ember from 'ember';
import moment from 'moment';

const timeAgoInWords = function(params) {
  if (params[1]) {
    return moment(params[0]).fromNow(true);
  }
  return moment(params[0]).fromNow();
};

export { timeAgoInWords };
export default Ember.Helper.helper(timeAgoInWords);
