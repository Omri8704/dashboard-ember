import DS from 'ember-data';
import Ember from 'ember';
import { memberAction } from 'ember-api-actions';
import HasManyQuery from 'ember-data-has-many-query';

let string = DS.attr("string");
let number = DS.attr("number");
let belongsTo = DS.belongsTo;

export default DS.Model.extend( HasManyQuery.ModelMixin, {
  campaign: belongsTo('campaign', {
    async: true,
    inverse: 'user_campaigns'
  }),

  user: belongsTo('user', {
    async: true
  }),

  current_user: belongsTo('current-user', {
    async: true
  }),

  role:           string,
  effort:         string,
  emails_sent:    number,
  twitter:        number,
  facebook:       number,
  emails_clicked: number,
  emails_opened:  number,
  sms:            number,
  firstName:      string,
  lastName:       string,
  user_donated_to_this_campaign: DS.attr("boolean"),
  conversions:    number,
  referral_count: number,
  referralLink: string,
  donation_conversions: DS.hasMany('donation-conversions',{
    async: true
  }),

  contacts: DS.hasMany('contact', {
    async: true
  }),

  fullName: Ember.computed('firstName', 'lastName', {
    get() {
      return `${this.get('firstName')} ${this.get('lastName')}`;
    }
  }),

  isLeader: Ember.computed('role', {
    get() {
      return this.get('role') === 'leader';
    }
  }),

  isParticipant: Ember.computed.not('isLeader'),

  sendReferralReport: memberAction({
    path: 'send_referral_report',
    type: 'post'
  }),

  sendLeaderEmail: memberAction({
    path: 'send_leader_email',
    type: 'post'
  })
});
