import DS from 'ember-data';

const HM = DS.hasMany;

export default DS.Model.extend({
  mailings:            HM('mailing'),
});
