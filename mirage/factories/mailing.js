import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name(i) {return `mailing ${i}`; },
  header: faker.lorem.sentence,
  body: faker.lorem.paragraph,
  sentAt: faker.date.past,
  status: 'created',
  completed_steps: ['audience']
});
