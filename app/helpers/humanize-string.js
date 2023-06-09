// Generated by CoffeeScript 1.10.0
import Ember from 'ember';
var HumanizeStringHelper, humanizeString;

humanizeString = function(params) {
  let str = params[0] || '';

  return str.replace(/_/g, ' ').replace(/(\w+)/g, function(match) {
    return match.charAt(0).toUpperCase() + match.slice(1);
  });
};

HumanizeStringHelper = Ember.Helper.helper(humanizeString);

export { humanizeString };

export default HumanizeStringHelper;
