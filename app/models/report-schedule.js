import DS from 'ember-data';
import moment from 'moment'
import Ember from 'ember';

import { collectionAction, memberAction } from 'ember-api-actions'
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', {
    presence: true,
    message: "name can't be blank"
  }),

  deliveryFrequency: validator('presence', {
    presence: true,
    message: "must select a frequency"
  })
})

export default DS.Model.extend(Validations, {
  name: DS.attr('string'),
  save_email: DS.attr('boolean', { defaultValue: false }),

  deliveryFrequency: DS.attr('string'),
  deliveryStartsAt: DS.attr('string'),
  deliveryEndsAt: DS.attr('string'),
  deliveryStrategy: DS.attr('string', { defaultValue: 'email' }),
  deliveryTargets: DS.attr({ defaultValue: function() { return [] } }),

  firstDispatchTime: DS.attr('string'),

  donationPeriod: DS.attr('string'),
  donationPeriodTimestampRangeStartsAt: DS.attr('string'),
  donationPeriodTimestampRangeEndsAt: DS.attr('string'),
  donationBeneficiaryIds: DS.attr({ defaultValue: function() { return [] } }),

  lastRunAt: DS.attr('string'),

  entity: DS.belongsTo('entity'),
  reportTemplate: DS.belongsTo('report-template'),

  requestReport: collectionAction({
    type: 'post',
    path: 'request_report'
  }),

  presignedUrl: collectionAction({
    type: 'post',
    path: 'presigned_url'
  }),
  formattedDeliveryTargets: DS.attr('string'),
  formattedLastRunAt: Ember.computed('lastRunAt', function() {
    if (this.get('lastRunAt')) {
      return moment(this.get('lastRunAt')).format('MM/D/YYYY h:mm A')
    }
    else {
      return 'N/A'
    }
  }),
  formattedDeliveryFrequency: Ember.computed('frequency', function() {
    if (this.get('deliveryFrequency')) {
      return this.get('deliveryFrequency').replace('_', ' ');
    }
  }),
  formattedDeliveryStartsAt: Ember.computed('deliveryStartsAt', function() {
    if (this.get('deliveryStartsAt')) {
      return moment(this.get('deliveryStartsAt')).format('MM/D/YYYY h:mm A')
    }
    else {
      return ''
    }
  }),
  formattedDeliveryEndsAt: Ember.computed('deliveryStartsAt', function() {
    if (this.get('deliveryEndsAt')) {
      return moment(this.get('deliveryEndsAt')).format('MM/D/YYYY h:mm A')
    }
    else {
      return ''
    }
  })
});
