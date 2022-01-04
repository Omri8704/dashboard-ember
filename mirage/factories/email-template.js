import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  defaultTemplate: true,
  icon: "http://placehold.it/150x200",
  name: faker.hacker.noun

});
