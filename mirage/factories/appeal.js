import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  name(i) {return `initiative ${i}`; },
  label: 'asdf',
  external_id(i) {return `extid${i}`; }
});
