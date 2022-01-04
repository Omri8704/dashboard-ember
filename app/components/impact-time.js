import Ember from 'ember';
import theme from '../mixins/highcharts-theme';
import moment from 'moment';

const {
  Component,
  computed,
  inject,
} = Ember

export default Component.extend({
  settings: inject.service(),
  stats: computed.alias('donationsByHour'),
  campaignStartDate: Ember.computed('campaign', function() {
    const timeZone = this.get('settings.current_entity.timezone')

    return moment(this.get('campaign.start_date')).tz(timeZone).format('MMMM Do YYYY, h:mm:ss a zz')
  }),

  timeZoneDisplay: computed('settings', function() {
    return moment().tz(this.get('settings.current_entity.timezone')).format('zz')
  }),

  chartSettings: computed('stats', 'settings.current_entity', 'campaignStartDate', function() {
    const timeZone = this.get('settings.current_entity.timezone')
    const itemsMapped = this.get('stats').map((item) => {
      return item
    })

    // Sets up a complete time stamp for the gift hour based on campaign start date, which is needed
    // to account for daylight savings of campaign and  time given the entity's time zone
    const campaignStartDay = this.get('campaign.start_date').substring(0,11)

    const itemsSortedByHour = itemsMapped.sort(function(a, b) {
      const time = function(item) {
        const hour =  ('0' + item.hour).slice(-2) // ensures a 0 is added to single digit hours. to make hour is in UTC
        const timeStamp = campaignStartDay + hour +':00:00.000Z'
        return moment(timeStamp).tz(timeZone)
      }
      return time(a) - time(b); // SORT BY EARLIEST HOUR FIRST
    });


    // MAP HOUR ONLY FOR X AXIS CATEGORY
    const itemsHourOnly = itemsSortedByHour.map((item) => {
      const hour =  ('0' + item.hour).slice(-2) // ensures a 0 is added to single digit hours. to make hour is in UTC
      const timeStamp = campaignStartDay + hour +':00:00.000Z'
      console.info(timeStamp)
      return moment(timeStamp).tz(timeZone).format('ha') // ex: 7am
    })

    // MAP TOTAL GIFTS ONLY FOR EACH HOUR FOR DATA POINTS
    const itemsCountOnly = itemsSortedByHour.map((item) => {
      return item.count
    })

    return {
      content: {
        data: [
          {
            data: itemsCountOnly
          }
        ]
      },
      options: {
        chart: {
          type: 'line'
        },
        title: {
          text: 'Gifts Made by Hour'
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          formatter: function () {
              return '<b>Gifts: </b>' + this.y +'<br /><b>Hour: </b> ' + this.x;
          },
        },
        xAxis: {
          categories: itemsHourOnly
        },
        yAxis: {
          title: {
            text: 'Total Gifts Each Hour'
          }
        }
      }

    }
  }),

  theme: theme,


  actions : {}
});
