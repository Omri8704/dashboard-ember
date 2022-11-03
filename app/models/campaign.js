import DS from 'ember-data';
import Promotion from './promotion';
import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';
import { memberAction } from 'ember-api-actions'

const BT = DS.belongsTo;
const HM = DS.hasMany;
const number = DS.attr("number");
const hash = DS.attr('by-day-hash');

function string(options) {
  return DS.attr("string", options);
}

const Validations = buildValidations({
  name:       validator('presence', true),
  start_date: validator('presence', true),
  end_date:   validator('presence', true),
  type:       validator('presence', true),
  goal: [
    validator('presence', true),
    validator('number', { allowString: true })
  ],

  interactionRemindFrom: validator('format', {
    regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Please enter a valid email address'
  })
})

export default Promotion.extend(Validations, {
  allow_subscriptions:        string(),
  allow_subscription_options: [
    { id: 'regular', label: 'Regular'},
    { id: 'split', label: 'Split'},
    { id: 'split_campaign_end', label: 'Split Campaign End'}
  ],
  appeals:                    HM('appeal'),
  auto_remind:                DS.attr(),
  banner:                     string({
                                defaultValue: "//placehold.it/1440x425"
                              }),
  banner_alt_text: string(),
  campaignImages:             HM('campaign-image', { async: false }),
  campaignVideos:             HM('campaign-video', { async: false }),

  campaign_receipt_text:                 string(),
  campaign_receipt_text_head:            string({ defaultValue: "Campaign Receipt Text" }),

  can_update_campaign:        DS.attr("boolean"),
  category:                   string(),
  causes:                     HM('cause'),
  causes_required:            DS.attr("boolean"),
  current_user:               BT('current_user'),
  custom_sms_text:            string(),
  custom_twitter_text:        string(),
  days_left:                  Ember.computed('end_date', function() {
                                const today = new Date();
                                const end_date = new Date(this.get('end_date'));
                                if (end_date < today) { return 0; }

                                const timeDiff = Math.abs(
                                  end_date.getTime() - today.getTime()
                                );
                                const diffDays = Math.ceil(
                                  timeDiff / (1000 * 3600 * 24)
                                );

                                return diffDays;
                              }),
  descr_head:                 string({ defaultValue: "Description" }),
  description:                string(),
  disable_stretch_goal:       DS.attr("boolean", { defaultValue: true }),
  dollar_proxy_ratio:         DS.attr("number", { defaultValue: 1 }),
  donationLevels:             HM('donation_level'),
  donations:                  HM('donation'),
  dont_send_receipt:          DS.attr("boolean"),
  email_logo_body:            string(),
  email_logo_head:            string(),
  end_date:                   string(),
  entity:                     BT('entity'),
  external_donation_url:      string(),
  external_id:                string(),
  goal:                       number,
  goal_progress:              number,
  hide_average_donation:      DS.attr("boolean"),
  has_max_additional_gifts:   DS.attr("boolean"),
  hide_goal_bar:              DS.attr("boolean"),
  hide_title:                 DS.attr("boolean"),
  how_donations_used:         string(),
  how_donations_used_head:    string({
                                defaultValue: "Donations are applied to..."
                              }),
  initiative:                 BT('initiative'),
  interactionRemindFrom:      string(),
  interactionRemindText:      string(),
  invitations:                HM('invitation'),
  isSelected:                 DS.attr('boolean', { defaultValue: true }),
  join_code:                  string(),
  leader_invite_text:         string(),
  logo:                       string({
                                defaultValue: "//placehold.it/150x150"
                              }),
  logo_alt_text: string(),
  member_page_opt_out:        DS.attr("boolean"),
  searchable_keywords:        string(),
  name:                       string(),
  parent_campaign:            DS.attr(),
  parent_campaign_id:         string(),
  person_msg:                 string(),
  person_msg_head:            string({ defaultValue: "Personal Message" }),
  participant_invite_text:    string(),
  quote:                      string(),
  reply_to:                   string(),
  runReport:                  memberAction({
                                path: 'run_report',
                                type: 'get',
                              }),
  shell_campaign:             DS.attr("boolean"),
  show_logo:                  DS.attr("boolean"),
  auto_media_carousel:        DS.attr("boolean"),
  slug:                       string(),
  spreedly_key:               string(),
  start_date:                 string(),
  status:                     string({ defaultValue: 'pending' }),
  team_size:                  number,
  title_color:                string(),
  total_clicks:               number,
  total_clicks_by_day:        hash,
  total_delivered:            number,
  total_donors:               number,
  total_email_sent:           number,
  total_email_sent_by_day:    hash,
  total_gifts:                number,
  total_opens:                number,
  total_opens_by_day:         hash,
  total_raised:               number,
  total_referrals:            number,
  total_web_stats:            number,
  total_ws_carousel:          number,
  total_ws_carousel_by_day:   hash,
  total_ws_contribute:        number,
  total_ws_contribute_by_day: hash,
  total_ws_donate:            number,
  total_ws_donate_by_day:     hash,
  total_ws_email:             number,
  total_ws_email_by_day:      hash,
  total_ws_facebook:          number,
  total_ws_facebook_by_day:   hash,
  total_ws_share:             number,
  total_ws_share_by_day:      hash,
  total_ws_sms:               number,
  total_ws_sms_by_day:        hash,
  total_ws_twitter:           number,
  total_ws_twitter_by_day:    hash,
  type:                       string({defaultValue: "dollars"}),
  use_giving_form:            DS.attr("boolean"),
  is_part_additional_gift:    DS.attr("boolean"),
  is_send_abandon_notification: DS.attr("boolean"),
  user_campaigns:             HM('user-campaign'),
  why_donations:              string(),
  why_donations_head:         string({
                                defaultValue: "Why are donations necessary?"
                              }),
  accounting_code:            string(),
});
