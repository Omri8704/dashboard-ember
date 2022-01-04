import Ember from 'ember';
var ShorthandNumberHelper, shorthandNumber;

shorthandNumber = function(params) {
  var abbrev, decPlaces, i, number, size;
  if( isNaN( params[0] ) ) return 0;
  number = Math.round( params[0] );
  if( isNaN(number) ) return 0;
  decPlaces = 2;
  decPlaces = Math.pow(10, decPlaces);
  abbrev = ['k', 'm', 'b', 't'];
  i = abbrev.length - 1;
  while (i >= 0) {
    size = Math.pow(10, (i + 1) * 3);
    if (size <= number) {
      number = Math.round(number * decPlaces / size) / decPlaces;
      if (number === 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }
      number += abbrev[i];
      break;
    }
    i--;
  }
  return number;
};

ShorthandNumberHelper = Ember.Helper.helper(shorthandNumber);

export { shorthandNumber };

export default ShorthandNumberHelper;
