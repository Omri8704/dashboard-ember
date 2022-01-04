import Ember from 'ember';

export function paginatedItemNumber(params/*, hash*/) {
  let offset
  if (parseInt(params[0])) {
    offset = parseInt(params[0]) * 10
  } else {
    offset = 0
  }
  const index = params[1] + 1 
  return offset + index;
}

export default Ember.Helper.helper(paginatedItemNumber);
