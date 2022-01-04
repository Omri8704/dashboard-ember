// Generated by CoffeeScript 1.10.0
import Ember from 'ember';

export function pluralizeWord([number, single, plural]) {
  if (number === 1) {
    return single;
  } else {
    return plural;
  }
}

export default Ember.Helper.helper(pluralizeWord)
