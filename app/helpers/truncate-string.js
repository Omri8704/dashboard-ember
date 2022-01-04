import Ember from 'ember';
var TruncateStringHelper, truncateString;

truncateString = function(params, hash) {
  if (params[0].length > hash.chars) {
    return params[0].substring(0, hash.chars).concat("...");
  }
  return params;
};

TruncateStringHelper = Ember.Helper.helper(truncateString);

export { truncateString };

export default TruncateStringHelper;
