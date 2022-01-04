import Ember from 'ember';

export function arrayToCommaSeparatedString(params/*, hash*/) {
  if (params[0] && params[1] && Ember.isArray(params[0])) {
    return params[0].reduce( (prev, current, idx) => {
      if (idx > 0) {
        return `${prev}, ${current.get(params[1])}`
      }
      return `${current.get(params[1])}`
    }, '')
  }
  return params[0];
}

export default Ember.Helper.helper(arrayToCommaSeparatedString);
