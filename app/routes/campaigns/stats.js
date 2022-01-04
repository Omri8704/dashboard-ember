import Ember from 'ember';
import moment from 'moment';
import request from '../../utils/ajax-promise';
import config from '../../config/environment';
import formatCampaignStats from '../../formatters/stats-formatter/campaign/index';

const {
  Route,
  inject,
  get,
  set
} = Ember

export default Route.extend({
  settings: inject.service(),
  init(){
    this._super(...arguments)
    const settings = get(this, "settings")
    set(settings, "currentSubnav", "campaigns")
  },
  graphEvents: ["total_email_sent_by_day", "total_opens_by_day", "total_clicks_by_day"],
  fetchStats(campaign) {
    const start_date = moment(campaign.get("start_date")).format() || null
    const end_date = moment(campaign.get("end_date")).format() || null
    let getEmailStat = request({
      url: `${config.host}/api/stats/${campaign.id}.json`,
      data: {
        type: 'Campaign',
        events: this.get('graphEvents'),
        start_date: start_date,
        end_date: end_date
      }
    });

    return getEmailStat.then((data) => {
      return Ember.Object.create({
        id: campaign.get('id'),
        name: campaign.get('name'),
        data: data,
      });
    });
  },

  model() {
    const campaigns = this.get('store').findAll('campaign')
      .then( (campaigns) => {
        return campaigns.toArray().sort( (a, b) => {
          return moment(get(a, 'start_date')).isBefore(get(b, 'start_date'))
        })
      });

    return Ember.RSVP.hash({
      entity: this.get('settings.current_entity'),
      campaigns: campaigns
    });
  },

  afterModel(model) {
    const firstCampaign = get(model.campaigns, 'firstObject');

    // prepopulate graph with the first
    if (firstCampaign) {
      return this.fetchStats(firstCampaign).then( (emailStats) => {
        this.set('selectedCampaign', firstCampaign);
        this.set('campaignStats', formatCampaignStats(emailStats, this.get('graphEvents')))
      })
    }
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('selectedCampaign', this.get('selectedCampaign'));
    controller.set('chartData', this.get('campaignStats'));
  },

  resetController(controller) {
    controller.set('selectedCampaign', null)
  }
});
