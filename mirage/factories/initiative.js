import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  name(i) {return `initiative ${i}`; },
  external_id(i) {return `extid${i}`; }
});
