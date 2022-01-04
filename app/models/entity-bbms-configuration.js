import DS from 'ember-data';
import Ember from 'ember';

const { attr, belongsTo, Model } = DS

const EntityBbmsConfiguration = Model.extend({
  bbms_account_name: attr('string'),
  can_receive_bbms_payments: attr('boolean'),

  entity: belongsTo('entity')
});

export default EntityBbmsConfiguration