/*
  This is an example factory definition.

  Create more files in this directory to define additional factories.
*/
import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  amount() {return faker.random.number();},
  public() {return faker.random.boolean();},
  status() {
    let arr = ['unpaid', 'paid', 'refunded', 'refund', 'declined', 'unknown'];
    return arr[Math.floor(Math.random() * arr.length)];
  },
  donType() {
    let arr = ['cc', 'offline', 'hist', 'check', 'cash'];
    return arr[Math.floor(Math.random() * arr.length)];
  },
  refundable() { return faker.random.boolean();},
  createdAt() { return faker.date.past();}

  // age: 20,                              // numbers
  // tall: true,                           // booleans

  // email: function(i) {                  // and functions
  //   return 'person' + i + '@test.com';
  // },

  // firstName: faker.name.firstName,       // using faker
  // lastName: faker.name.firstName,
  // zipCode: faker.address.zipCode
});
