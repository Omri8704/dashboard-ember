import Ember from 'ember';
import moment from 'moment';

const prettyGraphDate = function(params) {
  return moment(params[0]).format("MMM D");
};

export { prettyGraphDate };
export default Ember.Helper.helper(prettyGraphDate);
