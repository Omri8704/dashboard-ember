import Ember from 'ember';
import moment from 'moment';

const timeAgo = function(params) {
  if( params[0] ){
    return moment(params[0]).fromNow();
  }else{
    return ''
  }
};

export { timeAgo };
export default Ember.Helper.helper(timeAgo);
