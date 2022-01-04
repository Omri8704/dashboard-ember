import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  name(i) {return `cause ${i}`; },
  goal: 10000
});
