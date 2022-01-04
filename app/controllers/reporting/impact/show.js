import Ember from 'ember';
import delimitNumbers from '../../../utils/delimit-number';
import moment from 'moment';

export default Ember.Controller.extend({
  settings: Ember.inject.service(),
  campaign: Ember.computed.alias('model.campaign'),
  stats: Ember.computed.alias('model.campaignStats'),

  childCampaignNames:Ember.computed('stats', function() {
    return this.get('stats.campaign_names')
  }),

  campaignIsPending: Ember.computed('campaign', function() {
    return this.get('campaign.status') === 'pending' ? true : false
  }),

  campaignStartDate: Ember.computed('campaign', function() {
    const timeZone = this.get('settings.current_entity.timezone')

    return moment(this.get('campaign.start_date')).tz(timeZone).format('MMMM Do YYYY, h:mm:ss a zz')
  }),

  isFamilyCalculation: Ember.computed('stats', function() {
    return this.get('stats.is_family_calculation');
  }),

  campaignNames: Ember.computed('stats', function() {
    return this.get('stats.campaign_names')[0]
  }),

  lastRanFormatted: Ember.computed('stats', function() {
    let lastRan = this.get('stats.calculated_at')
    return moment(lastRan).format('MMMM Do YYYY, h:mm:ss a')
  }),

  totalDollarsFormatted: Ember.computed('stats', function() {
    return '$' + delimitNumbers(this.get('stats.campaigns_donations_amount_sum').toFixed(2))
  }),

  campaignsDonationsCountFormatted: Ember.computed('stats', function() {
    const donationsCount = this.get('stats.campaigns_donations_count')
    const total = ( donationsCount == null ? 0 : delimitNumbers(donationsCount))
    return total
  }),

  uniqueDonorsFormatted: Ember.computed('stats', function() {
    return delimitNumbers(this.get('stats.campaigns_unique_donors_count'))
  }),

  totalCampaignsFormatted: Ember.computed('stats', function() {
    return delimitNumbers(this.get('stats.campaigns_with_donations_count'))
  }),

  averageDonation: Ember.computed('stats', function() {
    const amount = delimitNumbers(this.get('stats.campaigns_donations_amount_average').toFixed(2))
    return amount ? '$' + amount : 0;
  }),

  largestDonation: Ember.computed('stats', function() {
    const amount = delimitNumbers(this.get('stats.campaigns_donations_amount_max').toFixed(2))
    return amount ? '$' + amount : 0;
  }),

  totalDonationsByState: Ember.computed('stats', function() {
      return this.get('stats.campaigns_donations_addresses_count_by_region')
  }),

  totalDonationsByStateSorted: Ember.computed('stats', function() {
      const countByRegion = this.get('stats.campaigns_donations_addresses_count_by_region');
      const statesSortedByCount = Object.keys(countByRegion).sort((a, b) => {
        return countByRegion[b] - countByRegion[a];
      });
      return statesSortedByCount.map((a) => {
        return {
          value:  countByRegion[a],
          region: a
        };
      });
  }),


  totalCountriesWithDonations: Ember.computed('stats', function() {
      const totalCountries = this.get('stats.campaigns_donations_addresses_count_by_country')
      return Object.keys(totalCountries).length
  }),

  donationsByHour: Ember.computed('stats', function() { // passed to impact-time component
    return this.get('stats.campaigns_donations_count_by_hour')
  }),

  mostDonationsByHour: Ember.computed('stats', 'settings.current_entity', 'campaign', function() {
    const itemsSortedByCount = this.get('stats.campaigns_donations_count_by_hour').sort(function(a, b) {
      return  b.count - a.count;
    })

    const timeZone = this.get('settings.current_entity.timezone')
    const campaignStartDay = this.get('campaign.start_date').substring(0,11)

    const itemsFormatted = itemsSortedByCount.map((item) => {
      const hourFormatted = function(item) {
        const hour =  ('0' + item.hour).slice(-2) // ensures a 0 is added to single digit hours. to make hour is in UTC
        const timeStamp = campaignStartDay + hour +':00:00.000Z'
        return moment(timeStamp).tz(timeZone).format('ha')
      }
      return {
        hour: hourFormatted(item),
        count: item.count,
      };
    })
    return itemsFormatted;
  }),

  donationsByRecentGraduates: Ember.computed('stats', function() {
    return delimitNumbers(this.get('stats.campaigns_donations_grad_year_recent_count'))
  }),


  mostDonationsByGradYear: Ember.computed('stats', function() {
    const highestGivingYear = this.get('stats.campaigns_donations_grad_year_count')
    return highestGivingYear
  }),

  actions: {
  }
})
