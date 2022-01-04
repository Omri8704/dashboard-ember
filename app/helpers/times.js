import Ember from 'ember';

const { isBlank } = Ember

export function times(params = []/*, hash*/) {
  return params.reduce( (prev, current) => {
    if (isBlank(prev)) {
      return parseFloat(current)
    }
    else {
      return prev * parseFloat(current)
    }
  })
}

export default Ember.Helper.helper(times);
