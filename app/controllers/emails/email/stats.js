import Ember from 'ember';
import moment from 'moment';
import theme from '../../../mixins/highcharts-theme';
import { formatStatSums } from '../../../formatters/stats-formatter/email-stats/index';

export default Ember.Controller.extend({
  settings: Ember.inject.service(),
  notify: Ember.inject.service(),
  mailing: Ember.computed.alias('model.mailing'),
  totals: Ember.computed.alias('model.data.totals'),


  actions: {
    changeChartResolution(resolution){
      this.set( "chartDataResolution", resolution )
    }
  },

  chartData: Ember.computed("model.data,chartDataResolution", function() {
    return formatStatSums( this.get("model.data.stats"), this.get("chartDataResolution") )
  }),

  chartDataResolution: 1,

  chartOptions: {
    title: {
      text: null
    },
    chart: {
      spacing: [0, 0, 0, 0],
      height: 300
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
        const date = moment(this.x).format('ddd, MMM D h:mma');
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
        millisecond: '%m/%e %H:%M',
        second: '%m/%e %H:%M',
        minute: '%m/%e %H:%M',
        hour: '%m/%e %H:%M',
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

  chartDefault: {
    yAxis: 'Interactions',
    data: []
  },

  theme: theme

});
