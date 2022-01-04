import Ember from 'ember';

export function displayTimeZone(params/*, hash*/) {
  /*
    time zones are formatted like "America/New_York" and occasionally
    "America/Indiana/Indianapolis" because REASONS
  */
  if (typeof params[0] !== 'undefined' && params[0] != null) {
    const splitTimeZone = params[0].split('/')

    const city = splitTimeZone[splitTimeZone.length - 1]

    return city.replace(/_/g, " ")
  }
}

export default Ember.Helper.helper(displayTimeZone);
