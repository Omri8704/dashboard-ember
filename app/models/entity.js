import DS from 'ember-data';
let {
  attr,
  Model,
  hasMany,
  belongsTo
} = DS


const string = attr("string");
const number = attr("number");
const bool = attr("boolean");
const hash = attr('by-day-hash');

export default Model.extend({
  allow_subscriptions: bool,
  campaigns: hasMany('campaign', {
    async: true
  }),

  reportFilters: hasMany('report-filter', {
    async: true
  }),

  current_user: belongsTo('current_user', {
    inverse: 'entities'
  }),

  report_user: belongsTo('current_user', {
    inverse: 'report_entities'
  }),

  name: string,
  slug: string,
  pagename: string,
  host: string,
  description: string,
  quote: string,
  address1: string,
  address2: string,
  city: string,
  region: string,
  country: string,
  zip: string,
  phone: string,
  fax: string,
  headlogo: string,
  footlogo: string,
  banner: string,
  leader_image: string,
  footerimg: string,
  bgimage: string,
  primarycolor: string,
  secondarycolor: string,
  primarytextcolor: string,
  secondarytextcolor: string,
  credit_card_processor: string,
  cc_proc_login: string,
  cc_proc_key: string,
  open_files_password: string,
  send_email_from_host: string,
  can_update_entity: bool,
  can_create_campaign: bool,
  tags: attr(),
  timezone: string,
  total_raised: number,
  total_donors: number,
  total_donations_count: number,
  email_deliverability: number,
  emails_sent: number,
  page_interactions: number,
  features_enabled: hash,
  can_receive_stripe_payments: bool,
  date_format: string,
  didLoad() {
    this.get("features_enabled")
      .forEach( (item) => {
        this.set(item, true);
      });
  }
});
