import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name(i) {return `filter ${i}`; },
  hasDonated: ['yes', 'no', undefined][Math.floor(Math.random(0, 2))],
  opens: 'no',
  clicks: ['yes', 'no', undefined][Math.floor(Math.random(0, 2))]
  // zipCode: faker.address.zipCode
});
