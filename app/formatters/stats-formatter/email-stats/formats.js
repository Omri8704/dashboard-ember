import Ember from 'ember';
import moment from 'moment';

export function formatSelectedEventTypes(eventType) {
  if (eventType === 'total_opens_by_day' || eventType === 'opens') {
    return 'Total Opens';
  }
  if (eventType === 'total_clicks_by_day' || eventType === 'clicks') {
    return 'Total Clicks';
  }
  if (eventType === 'total_email_sent_by_day' || eventType === 'emails_sent' ) {
    return 'Total Emails';
  }
  throw new Error('unexpected event type: ' + eventType);
}


/*
  format from
  {
    total_opens_by_day: {
      2015/01/12: 12
    },
    ...
  }

  to
  data: [{
    name: "Total Opens",
    data: [DATEVALUE, VALUE]
  },
  ...]
  Also restricts to date range from starting_days_ago to now.
*/

export function formatStatSums(emailStats, starting_days_ago) {
  let data = []
  if (emailStats) {
    var now = moment().subtract( starting_days_ago, 'days' ).valueOf()
    for( var prop in emailStats ){
        let eventData = {
          name: formatSelectedEventTypes(prop),
          data: formatTypeData(emailStats[prop], now)

      }
      data.push(eventData)
    }
  }
  return { data: data }
}

function formatTypeData(stats, now) {
  return Object.keys( stats ).reduce( (prev, current) => {
    var date = Date.parse( current + " UTC" )
    if( date > now ){
      prev.push([ date, stats[current] ]);
    }
    return prev
  }, [])
}

/*
  format from
  data: {
    total_opens_by_day: {
      2015/01/12: 12
    }
  }

  to

  data: [DATEVALUE, VALUE]
*/

export function formatEmailStats(emailStats, selectedEventType) {
  if (emailStats) {
    emailStats = Ember.isArray(emailStats) ? emailStats  : [emailStats];

    const data = emailStats.map( (emailStat) => {
      let emailData = null
      if( typeof emailStat.get === "function"){
       emailData = emailStat.get(`data.${selectedEventType}`);
      }else{
        emailData = emailStat.data[selectedEventType];
      }

      const data = Object.keys(emailData).map( (key) => {
        const keyDate = Date.parse(key);
        const keyValue = emailData[key]

        return [keyDate, keyValue];
      })

      return {
        name: emailStat.get('name'),
        data: data
      }
    })

    return {
      yAxis: formatSelectedEventTypes(selectedEventType),
      data: data
    }
  }
  else {
    return {
      yAxis: formatSelectedEventTypes(selectedEventType),
      data: []
    }
  }
}

/*
  format data from
  data: {
    total_opens_by_day: {
      2015/01/12: 12
    }
  }
  to
  {
    name: template_name,
    data: [
      {
        date : date,
        eventType: value
      }
    ]
  }
*/
export function formatForDisplay(emailStats, graphEvents) {
  if (emailStats) {
    emailStats = Ember.isArray(emailStats) ? emailStats  : [emailStats];

    const data = emailStats.map( (emailStat) => {

      let obj = {};
      obj.name = emailStat.get('name');

      const graphData = graphEvents.map( (event) => {
        const emailData = emailStat.get(`data.${event}`);

        /*
          emailData is an object like { date: value, date2: value }
          for each date key we convert to an object with the current event type
          and add the value
          { date: { eventType: value }}
        */
        const copyOfEmailData = Object.assign({}, emailData);
        for (const key in copyOfEmailData) {
          const currentValue = copyOfEmailData[key];
          copyOfEmailData[key] = {}
          copyOfEmailData[key][event] = currentValue
        }

        return copyOfEmailData;
      })

      let mergedGraphData = {};
      /*
        graph data comes in as an array of event type objects
        [
          {
            date: { eventType: value}
          }
        ],
        [
          {
            date: { eventType2: value}
          }
        ]
        gotta merge the arrays and events into one array objects
      */
      graphData.map( (datum) => {
        Object.keys(datum).map( (key) => {
          if (!mergedGraphData.hasOwnProperty(key)) {
            mergedGraphData[key] = {};
            mergedGraphData[key].date = key;
          }

          mergedGraphData[key] = Object.assign(mergedGraphData[key], datum[key]);
        })
      });
      /*
        convert mergedGraphdata from object to an array so we can iterate over it
        in the template file
      */
      const arrayOfGraphData = Object.keys(mergedGraphData).map( (key) => {
        return mergedGraphData[key];
      })

      obj.data = arrayOfGraphData;

      return obj;
    })

    return data;
  }
  else {
    return [];
  }

}
