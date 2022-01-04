export function formatEventType(eventType) {
  if (eventType === 'total_opens_by_day') {
    return 'Opens';
  }
  if (eventType === 'total_clicks_by_day') {
    return 'Clicks';
  }
  if (eventType === 'total_email_sent_by_day') {
    return 'Emails';
  }
  throw new Error('unexpected event type');
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

export function formatCampaignStats(campaignStat, eventTypes) {
  if (campaignStat) {

    const data = eventTypes.map( (eventType) => {
      const emailData = campaignStat.get(`data.${eventType}`);

      const objectData = Object.keys(emailData).map( (key) => {
        const keyDate = Date.parse(key);
        const keyValue = emailData[key]

        return [keyDate, keyValue];
      })


      return {
        name: formatEventType(eventType),
        data: objectData
      }
    })

    return {
      yAxis: 'Total Interactions',
      data: data
    }
  }
  else {
    return {
      yAxis: 'Total Interactions',
      data: []
    }
  }
}
