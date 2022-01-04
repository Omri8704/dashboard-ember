import Ember from 'ember';
import moment from 'moment';
import theme from '../../mixins/highcharts-theme';
import { formatStatSums } from '../../formatters/stats-formatter/email-stats/index';

const { Controller, computed, inject } = Ember;

export default Controller.extend({
  notify: inject.service(),

  queryParams: ['status','query','offset','limit'],
  limit: 10,
  offset: 0,
  status: null,
  query: null,

  statuses: ['All Emails', 'Created', 'Pending', 'Approved', 'Sending', 'Sent'],
  count: computed('model.mailings', function(){
    return this.get("model.mailings.meta.count")
  }),

  totals: Ember.computed.alias('model.data.totals'),

  chartData: computed("model.data,chartDataResolution", function() {
    return formatStatSums( this.get("model.data.stats"), this.get("chartDataResolution") )
  }),

  setQuery() {
    this.set('query', this.get('inputQuery'))
  },

  actions: {
    updateQuery(query) {
      this.set('inputQuery', query)
      Ember.run.debounce(this, this.setQuery, 500)
    },

    changeStatus(status){
      this.set('status', (status === 'All Emails' ? null : status.toLowerCase() ) );
    },
    changeOffset(offset) {
      this.set("offset", offset)
    },
    changeChartResolution(resolution){
      this.set( "chartDataResolution", resolution )
    },
    cloneEmail(email){
      email.clone()
      this.send('reloadModel')
    },
    removeEmail(email) {
      email.destroyRecord().then(() => { this.get("notify").success('Email has been deleted successfully') }).catch( (response) => {
        let errormsg = "There was an issue deleting this email."
        if( response && response.errors && response.errors[0] ) errormsg = response.errors[0]
        this.get("notify").alert( errormsg )
      });
    }
  },

  chartOptions: {
    title: {
      text: null
    },
    chart: {
      spacing: [0, 0, 0, 0],
      height: 200
    },


    legend: {
      backgroundColor: '#fff',
      padding: 12,
      itemMarginBottom: 5,
      floating: true,
      align: 'right'
    },

    tooltip: {
      formatter: function () {
        const date = moment(this.x).format('ddd, MMM D');
        /*
          Highcharts-hack to allow dynamic tooltip sentences based on selected event type.
          amplo-highcharts sets a property onto the chart object so we can access it here
        */
        const interactions = this.series.chart.__yAxis__ || 'interactions';
        const seriesName = `<b><span style="color:${this.series.color}">${this.series.name}</span></b>`;
        const graphSymbol = `<span style="color:${this.series.color}"">\u25CF</span>`;

        return `${seriesName}<br/>${graphSymbol} <span>${date}: ${this.y} ${interactions}</span>`
      }
    },

    xAxis: {
      title: {
        text: null
      },
      type: 'datetime',
      dateTimeLabelFormats: {
        millisecond:'%m/%e',
        second: '%m/%e',
        minute: '%m/%e',
        hour: '%m/%e',
        day: '%m/%e',
        week: '%m/%e',
        month: '%m/%e',
        year: '%m/%e/%y'
      }
    },

    yAxis: {
      type: 'logarithmic',
      min: 1,
      minorTickInterval: 0.1,
      allowDecimals: false,
      title: {
        text: 'Actions'
      },

      gridLineDashStyle: 'shortdash',

      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    }
  },

  chartDataResolution: 365,

  chartDefault: {
    yAxis: 'Interactions',
    data: []
  },

  theme: theme

});
