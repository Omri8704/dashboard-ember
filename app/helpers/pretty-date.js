import Ember from 'ember';
import moment from 'moment';

const prettyDate = function(params) {
  if (params[1]) {
    return moment(params[0]).format(`${params[1]} h:mm A`);
  }
  return moment(params[0]).format("MMMM Do, YYYY h:mm A");
};

export { prettyDate };
export default Ember.Helper.helper(prettyDate);
