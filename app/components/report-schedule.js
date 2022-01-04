import Ember from 'ember';
import EmberObject from "@ember/object";
import moment from 'moment'
import request from '../utils/ajax-promise'
import config from '../config/environment'

export default Ember.Component.extend({
  store: Ember.inject.service(),
  notify: Ember.inject.service(),
  settings: Ember.inject.service(),
  session: Ember.inject.service(),


  donationPeriodOptions: [
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'Past Day',
      value:'past_day',
    },
    {
      label: 'Last 24 hours',
      value:'past_24_hours',
    },
    {
      label: 'Last Month',
      value:'past_month',
    },
    {
      label: 'Last Week',
      value:'past_week',
    },
  ],

  frequencyOptions: [
    {
      label: 'As needed',
      value: 'as_needed'
    },
    {
      label: 'hourly',
      value: 'hourly'
    },
    {
      label: 'daily',
      value: 'daily'
    },
    {
      label: 'weekly',
      value: 'weekly'
    },
    {
      label: 'monthly',
      value: 'monthly'
    },
  ],

  // radio checkbox initializers
  smartRangeSelection: true,
  allCampaignSelected: true,

  campaigns: [],

  deliveryTarget: "",

  _fetchCampaigns() {
    this.toggleProperty('loadCampaigns')

    return this.get('store').findAll('campaign').then( (campaigns) => {
      this.toggleProperty('loadCampaigns')
      this.set('campaigns', campaigns)

      return new Promise( resolve => resolve())
    })
  },

  _getNakedCampaign(id) {
    return this.get('nakedCampaigns').find( (campaign) => campaign.get('id') === id)
  },

  init() {
    this._super(...arguments)

    if (!this.get('report')) {
      const report = this.get('store').createRecord('report-schedule', {
        entity: this.get('settings.current_entity'),
        save_email: this.get('session.current_user.save_email'),
      })

      this.set('report', report)
      this.send('handleDeliveryFrequency', 'as_needed');
    }

    // preselect beneficiaries that were already added
    if (this.get('report.donationBeneficiaryIds') && this.get('report.donationBeneficiaryIds').length > 0) {
      this.set('allCampaignSelected', false)

      this._fetchCampaigns().then( () => {
        this.get('report.donationBeneficiaryIds').forEach( (id) => {
          const campaign = this._getNakedCampaign(id)

          campaign.set('isSelected', true)
        })
      })
    }

    if (this.get('session.current_user.get_saved_report_email').length > 0) {

      this.get('session.current_user.get_saved_report_email').forEach( (email) => {
        this.get('report.deliveryTargets').addObject(email)
      })
    }
  },

  willDestroyElement() {
    const report = this.get('report')
    const isNewAndNotInFlight = report.get('isNew') && !report.get('isSaving')

    if (isNewAndNotInFlight) {
      this.get('report').deleteRecord()
    }
    else if (report.get('hasDirtyAttributes')){
      this.get('report').rollbackAttributes()
    }
  },

  deliveryTargets: Ember.computed.alias('report.deliveryTargets'),
  savedEmails: Ember.computed.alias('session.current_user.get_saved_report_email'),

  // strip the campaign down out from ember data
  nakedCampaigns: Ember.computed('campaigns.[]', function() {
    return this.get('campaigns').map( campaign => {
      // need to add check here if already in report donation_beneficiary_ids
      return Ember.Object.create({
        id: campaign.get("id"),
        name: campaign.get("name"),
        isSelected: false
      })
    })
  }),

  unSelectedCampaigns: Ember.computed.filter('nakedCampaigns.@each.isSelected', function(campaign) {
    return !campaign.get('isSelected')
  }),

  selectedCampaigns: Ember.computed.filter('nakedCampaigns.@each.isSelected', function(campaign) {
    return campaign.get('isSelected')
  }),

  actions: {
    handleDeliveryFrequency(frequency) {
      if (frequency == 'as_needed') {
        this.set('report.donationPeriod', 'timestamp_range')
        this.set('report.donationPeriodTimestampRangeStartsAt', moment().format())
        this.set('report.donationPeriodTimestampRangeEndsAt', moment().format())
        this.set('report.deliveryStartsAt', null)
        this.set('report.deliveryEndsAt', null)
      }
      else {
        this.set('report.donationPeriod', 'all')
        this.set('report.donationPeriodTimestampRangeStartsAt', null)
        this.set('report.donationPeriodTimestampRangeEndsAt', null)
        this.set('report.deliveryStartsAt', moment().format())
        this.set('report.deliveryEndsAt', moment().format())
      }
      this.set('report.deliveryFrequency', frequency)
    },

    changeDonationPeriod(periodObject) {
      this.set('report.donationPeriod', periodObject.value)
    },

    handleSmartDateRangeSelection() {
      this.set('report.donationPeriodTimestampRangeStartsAt', null)
      this.set('report.donationPeriodTimestampRangeEndsAt', null)
      this.set('report.donationPeriod', 'all')
    },

    handleCustomDateRangeSelection() {
      this.set('report.donationPeriod', 'timestamp_range')
    },

    handleAllCampaigns() {
      this.set('report.donationBeneficiaryIds', [])
    },

    fetchCampaigns() {
      this._fetchCampaigns()
    },

    handleCampaignSelect(campaign, bool) {
      campaign.set('isSelected', bool)

      if (bool) {
        this.get('report.donationBeneficiaryIds').addObject(campaign.get('id'))
      }
      else {
        this.get('report.donationBeneficiaryIds').removeObject(campaign.get('id'))
      }
    },

    addDeliveryTarget() {
      if (!this.get('deliveryTarget')) {
        return;
      }
      this.get('report.deliveryTargets').addObject(this.get('deliveryTarget'))
      this.set('deliveryTarget', null)
    },

    removeDeliveryTarget(deliveryTarget) {
      this.get('report.deliveryTargets').removeObject(deliveryTarget)
    },

    run(delivery_method) {
      if (delivery_method != 'download' && this.get('report.deliveryTargets.length') <= 0) {
        this.get('notify').error('Please add an email address to send to...')
        return;
      }
      this.set('requestingReport', true)
      this.get("report")
      .requestReport({report_schedule: this.get('report').serialize(), delivery_method: delivery_method})
      .then((result) => {
         if (delivery_method == 'download') {
          this.get("notify").success("Generating report - this may take a minute or two...", {closeAfter: 10000})
          return this.send('tryDownload', result.id);
        }
        else {
          this.get('notify').success('Your report will be delivered in a few minutes...')
          this.set('requestingReport', false)
        }
      })
      .catch( () => {
        this.set('requestingReport', false)
        this.get('notify').error('Error running report, please try again.')
      })
    },

    tryDownload(id) {
      if (location.href.indexOf('report') == -1) {
        return false;
      }
      return request({
        url: `${config.host}/api/report_generator/${id}/get_presigned_url`,
        method: 'get'
      }).then( (result) => {
        if (result.success) {
          this.set('requestingReport', false)
          window.location = result.url;
        }
        else {
          setTimeout(() => {
            this.send('tryDownload', id);
          }, 1000)
        }
      }).catch( (result)=> {
        this.set('requestingReport', false)
      })
    },




    save() {
      this.send('addDeliveryTarget')
      this.get('onSave')(this.get('report'))
    },

    delete() {
      this.get('onDelete')(this.get('report'))
    },

    showConfirmation() {
      this.toggleProperty('expandConfirmation');
    }
  }
});
