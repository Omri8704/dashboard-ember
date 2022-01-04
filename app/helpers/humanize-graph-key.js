import Ember from 'ember';
// this takes a string removes the word 'total' from it.
// swaps out underscores for spaces
// and capitalizes each word.
// ie: 'total_email_sent_by_day' => 'Email Send By Day'
// this is used in the key area of the graph.
export function humanizeGraphKey(params/*, hash*/) {
  let str = params[0] || '';
  return str.replace(/total/g, '').replace(/_/g, ' ').replace(/(\w+)/g, function(match) {
    return match.charAt(0).toUpperCase() + match.slice(1);
  });
}

export default Ember.Helper.helper(humanizeGraphKey);
