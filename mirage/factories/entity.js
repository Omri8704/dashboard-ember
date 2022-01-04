/*
  This is an example factory definition.

  Create more files in this directory to define additional factories.
*/
import Mirage, { faker } from 'ember-cli-mirage';

const compname = faker.company.companyName();

export default Mirage.Factory.extend({
  name() {
    return compname;
  },
  host() {return faker.internet.url(); },

  slug() {
    return compname.split(' ').join('-');
  },

  pagename() {return 'campaigns page'; },
  description() {return faker.company.catchPhrase(); },
  quote() {return faker.company.catchPhrase();},
  address1() {return faker.address.streetName();},
  headlogo() {return faker.image.business();},
  footlogo() {return faker.image.business();},
  featuresEnabled() { return ['virtual_terminal', 'email', 'campaign_email', 'donation', 'events'];},
  totalRaised() {return faker.random.number()},
  tags() {
    return {
      alum: 1231,
      currentStudens: 5252,
      faculty: 2322,
      mascots: 12
    }
  }
  // age: 20,                              // numbers
  // tall: true,                           // booleans

  // email: function(i) {                  // and functions
  //   return 'person' + i + '@test.com';
  // },

  // firstName: faker.name.firstName,       // using faker
  // lastName: faker.name.firstName,
  // zipCode: faker.address.zipCode
});
