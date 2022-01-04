import Ember from 'ember';
import mapData from '../map-data/us-all';

const {
  Component,
  computed,
  inject,
} = Ember

export default Component.extend({

  chartOptions: {
    chart: {
      width: 600,
    },
    title: {
      text: null
    },
    colorAxis: {
      min: 1,
      type: 'logarithmic',
      minColor: '#EEEEFF',
      maxColor: '#6E4DD6',
      stops: [
        [0, '#EEEEFF'],
        [0.67, '#8460EA'],
        [1, '#6E4DD6']
      ]
    },
  },
  chartData: computed('statsByState', function() {
    const name = this.get('tooltipName')
    const states = this.get('statsByState')
    const statesFormatted = Object.keys(states).map(function (key) {
      return {
        state: key,
        value: states[key]
      };
    });

    return [{
      data: statesFormatted,
      joinBy: ['woe-name', 'state'], // first is us-map.js and second is the object from the data
      dataLabels: {
        enabled: false,
        color: '#FFFFFF',
        format: '{point.code}'
      },
      mapData,
      name,
      tooltip: {
        pointFormat: '{point.name}: <b>{point.value}</b>',
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255,.9)',

      },
      states: {
        hover: {
          color: '#457FE5',
        }
      },
    }]
  }),
});
