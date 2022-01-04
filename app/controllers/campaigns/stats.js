import Ember from 'ember';
import moment from 'moment';
import request from '../../utils/ajax-promise';
import config from '../../config/environment';
import theme from '../../mixins/highcharts-theme';
import formatCampaignStats from '../../formatters/stats-formatter/campaign/index';
import delimitNumber from '../../utils/delimit-number';

export default Ember.Controller.extend({
  settings: Ember.inject.service(),
  entity: Ember.computed.alias('model.entity'),
  campaigns: Ember.computed.alias('model.campaigns'),

  selectedCampaign: Ember.computed("settings.current_entity.id", function() {
    return this.get("campaigns.firstObject");
  }),

  total_donors_array: Ember.computed.mapBy('campaigns', 'total_donors'),
  total_donors: Ember.computed.sum("total_donors_array"),
  total_gifts_array: Ember.computed.mapBy('campaigns', 'total_gifts'),
  total_gifts: Ember.computed.sum("total_gifts_array"),

  totalSent: Ember.computed('selectedCampaign', {
    get() {
      const delimited = delimitNumber(this.get('selectedCampaign.total_email_sent'));

      // delimit number returns string of null...
      if ( delimited === 'null') {
        return null;
      }
      return delimited || 0;
    }
  }),

  totalDelivered: Ember.computed('selectedCampaign', {
    get() {
      const delimited = delimitNumber(this.get('selectedCampaign.total_delivered'));

      // delimit number returns string of null...
      if ( delimited === 'null') {
        return null;
      }
      return delimited || 0;
    }
  }),

  totalDeliverability: Ember.computed('selectedCampaign', {
    get() {
      const totalDelivered = this.get('selectedCampaign.total_delivered');

      if (typeof totalDelivered === undefined || totalDelivered === null) {
        return false;
      }

      const totalSent = this.get('selectedCampaign.total_email_sent');

      if (typeof totalSent === undefined || totalSent === null) {
        return false;
      }

      const percentage = totalDelivered / totalSent * 100;

      if (Number.isNaN(percentage) || percentage == null) {
        return false;
      }
      return `${percentage.toFixed(2)}%`|| '0';
    }
  }),

  graphEvents: ["total_email_sent_by_day", "total_opens_by_day", "total_clicks_by_day"],

  chartData: null,
  theme: theme,
  chartOptions: {
    title: {
      text: ''
    },

    tooltip: {
      formatter: function () {
        const date = moment(this.x).format('ddd MMM Do');
        const seriesName = `<b><span style="color:${this.series.color}">${this.series.name}</span></b>`;
        const graphSymbol = `<span style="color:${this.series.color}"">\u25CF</span>`;

        return `${seriesName}<br/>${graphSymbol} <span>${date}: ${this.y} ${this.series.name}.</span>`
      }
    },

    xAxis: {
      title: {
        text: 'Date'
      },
      type: 'datetime',
      dateTimeLabelFormats: {
        day: '%m/%e',
        week: '%m/%e',
        month: '%m/%e',
        year: '%m/%e/%y'
      }
    },

    yAxis: {
      title: {
        text: 'Interactions'
      },

      gridLineDashStyle: 'shortdash',

      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    }
  },

  fetchStats(campaign) {
    const start_date = moment(campaign.get("start_date")).format() || null
    const end_date = moment(campaign.get("end_date")).format() || null

    const getEmailStat = request({
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

  actions: {
    selectCampaign: function(campaign) {
      this.set("selectedCampaign", campaign);
      this.set('campaignEmailsLoading', true);

      this.fetchStats(campaign).then( (stats) => {
        const formattedStats = formatCampaignStats(stats, this.get('graphEvents'))

        this.set('chartData', formattedStats);
        this.set('campaignEmailsLoading', false);
      })
    }
  }
});
