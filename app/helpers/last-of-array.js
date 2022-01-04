import Ember from 'ember';

/*
  @params The length of the array
  @params The index of the array loop
*/
export function lastOfArray(params/*, hash*/) {
  if ((params[0] !== undefined) && (params[1] !== undefined)) {
    return (params[0] - 1) === params[1];
  }
  else if (params[0]) {
    Ember.Logger.error('Must pass the index of the iterating for loop as an argument');
  }
  else if (params[1]){
    Ember.Logger.error('Must pass the length of the array as an argument.');
  }
  else {
    Ember.Logger.error('Must pass two paramters, the length of the array and the index of the iteration.')
  }
}

export default Ember.Helper.helper(lastOfArray);
