import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  value: DS.attr('string'),
  description: DS.attr('string'),
  example: DS.attr('string')
});
