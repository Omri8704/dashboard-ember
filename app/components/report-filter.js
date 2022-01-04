import Ember from 'ember';
import Notify from 'ember-notify';
import _ from 'lodash';

export default Ember.Component.extend({
  notifyRunReport: Notify.property(),
  notifySaveReport: Notify.property(),

  beneficiaryTypes:  ['Campaign', 'Event'],
  transactionTypes: ['All', 'Check', 'Cash', 'Credit', 'Offline'],
  giftTypes: ['Yes', 'No'],

  events: null,
  campaigns: null,
  reportFilter: null,
  activeReport: null,
  selectedType: 'Campaign',
  selectedCampaign: null,
  selectedTransactionType: 'All',
  selectSource: null,
  selectedItems: [],
  selectedGift: null,
  includeDonation: null,
  excludeDonation: null,
  dateTo: null,
  dateFrom: null,
  pickedFilter: null,
  numberDays: null,
  resetSavedFilterText: null,
  beneficiaryFilter: 'all',
  selectIndividualCampaigns: false,
  disable_overview: true,

  toolTipText: `Start by Searching`,

  didInsertElement() {
    this._super(...arguments);

    this.set('activeReport', this.get('newReport'));
    this.set('activeReport.rep_type', this.get('selectedType'));
    this.set('displayedItems', this.get('campaigns'));
  },

  savedFilterText: Ember.computed('pickedReportFilter.name', function() {
    if (this.get('reportFilters').length > 0) {
      return 'Saved Reports';
    }
    else {
      return 'No Saved Reports';
    }
  }),

  beneficiaryFilters: Ember.computed('activeReport.rep_type', function() {
    const baseText = ['All', 'Active', 'Closed'];

    return baseText.map( (str) => `${str} ${this.get('activeReport.rep_type')}s`);
  }),

  filterText: Ember.computed('activeReport.rep_type', function() {
    return `All ${this.get('activeReport.rep_type')}s`;
  }),

  enableButton: Ember.computed('selectedItems', 'activeReport.select', function() {
    return (
      ['all', 'active', 'closed'].includes( this.get('activeReport.select') ) ||
      ( this.get('selectedItems') && this.get('selectedItems').length > 0 )
    );
  }),


  displayedItems: Ember.computed(
    'activeReport.rep_type',
    'beneficiaryFilter',
    'campaigns',
    'events', {
      get() {
        if (this.get('activeReport.rep_type')) {
          const type = this.get('activeReport.rep_type').toLowerCase();
          const beneficiaries = this.get(`${type}s`);

          if (this.get('beneficiaryFilter') === 'all') {
            return beneficiaries;
          }
          else {
            return beneficiaries.filter( (beneficiary) => {
              return beneficiary.get('status') === this.get('beneficiaryFilter');
            })
          }
        }
      },
      set(key, value) {
        return value;
      }
    }
  ),

  disableButton: Ember.computed.not('enableButton'),

  displayedDonType: Ember.computed('activeReport.don_type', function() {
    return this.deserializeFormatType(this.get('activeReport.don_type'));
  }),

  formatBeneficiary(type, id) {
    return `gid://amplo/${ _.upperFirst(type)}/${id}`;
  },

  formatBeneficiaries(beneficiaries, type) {
    return beneficiaries.map( (beneficiary) => {
      return this.formatBeneficiary(type, beneficiary.get('id'));
    });
  },

  formatGiftTypes(type) {
    return type === 'Yes' ? 'yes' : 'no'
  },

  deserializeFormatType(type) {
    if ( type === null) { return 'All' ;}
    if ( type === 'cc') { return 'Credit'; }

    return type;
  },

  deserializeBeneficiary(beneficiary) {
    const split = beneficiary.split('/')
    const type = split[3].toLowerCase();
    const id = split[4];

    let formattedType;

    if (type === 'event') { formattedType = 'events' }
    if (type === 'campaign') { formattedType = 'campaigns' }

    return {
      type: formattedType,
      id,
    }
  },

  findAllBeneficiaries(beneficiaries) {
    return beneficiaries.map( (beneficiary) => {
      const obj = this.deserializeBeneficiary(beneficiary);

      return this.get(obj.type).findBy('id', obj.id);
    });
  },

  formatDonationType(type) {
    type = type || '';

    if (type === 'All') {
      return null;
    }

    return type === 'Credit' ? 'cc' : type.toLowerCase();
  },

  formatReport(report, selectedItems) {
    const formattedDonationType = this.formatDonationType(report.get('don_type'));

    const formattedBeneficiaries = this.formatBeneficiaries(selectedItems,
      report.get('rep_type'))

    report.set('don_type', formattedDonationType);
    report.set('beneficiaries', formattedBeneficiaries);

    return report;
  },

  debouncedSearch(name, resolve, reject) {
    return this.get('searchReports')(name, this.get('beneficiaryFilter'), this.get("activeReport.rep_type")).then( (items) => {
      this.set('displayedItems', items);
      resolve(items);
    })
    .catch( (err) => reject(err))
  },

  actions: {
    dateTo(date) {
      this.set('activeReport.end_time', date);
      this.set('lastWeek', false);
    },

    dateFrom(date) {
      this.set('activeReport.start_time', date);
      this.set('lastWeek', false);
    },

    setDateInterval(dateInterval) {
      this.set('dateInterval', dateInterval);

      if (dateInterval !== 'custom') {
        this.set('activeReport.num_days', dateInterval);
      }
    },

    setIncludeDonation() {
      this.set('includeDonation', true);
      this.set('excludeDonation', false);
    },

    setExcludeDonation() {
      this.set('includeDonation', false);
      this.set('excludeDonation', true);
    },

    setDeclined(type) {
      this.set('activeReport.declined', type);
    },

    selectedTransactionType(type) {
      this.set('activeReport.don_type', type);
    },

    selectRepType(type) {
      this.set('selectedItems', []);
      this.set('activeReport.rep_type', type);
    },

    setSelectSource(type){
      this.set('activeReport.select', type);
      this.set('selectIndividualCampaigns', (type === 'custom') )
    },

    selectGiftType(type) {
      this.set('activeReport.recurring', type.toLowerCase());
    },

    setDisableOverview(type) {
      this.set('activeReport.disable_overview', type)
    },
    pickedReportFilter(reportFilter) {
      this.set('savedReportActive', true);
      this.set('dateInterval', null);
      this.set('pickedReportFilter', reportFilter);
      this.set('activeReport', reportFilter);

      // populate the array for the multi select component
      const beneficiaries = this.findAllBeneficiaries(reportFilter.get('beneficiaries'));
      this.set('selectedItems', beneficiaries);
    },

    newReport() {
      this.set('activeReport', this.get('newReport'));
      this.set('savedReportActive', false);
      this.set('pickedReportFilter', null);
      this.set('selectedItems', []);
      this.set('dateInterval', null);
      this.toggleProperty('resetSavedFilterText');
    },

    filterBeneficiaries(filter) {
      const filterType = filter.split(' ')[0]
      this.set('beneficiaryFilter', filterType.toLowerCase());
    },

    _runReport() {
      const formattedReport = this.formatReport(
        this.get('activeReport'),
        this.get('selectedItems')
      ).serialize({includeId: true});

      this.set('runReportLoading', true);
      this.get('runReport')(formattedReport).then( () => {
        this.set('runReportLoading', false);
        this.get('notifyRunReport').success('Your Report is being emailed to you shortly!', {
          closeAfter: 5000
        });
      })
    },

    searchItems(name) {
      return new Ember.RSVP.Promise( (resolve, reject) => {
        Ember.run.debounce(this, this.get('debouncedSearch'),
          name,
          resolve,
          reject,
          300
        )
      })
    },

    saveReportFilter() {
      const formattedReport = this.formatReport(
        this.get('activeReport'),
        this.get('selectedItems')
      );

      this.set('saveReportLoading', true);
      this.get('saveReport')(formattedReport)
        .then( () => {
          this.set('saveReportLoading', false);
          this.get('notifySaveReport').success('Report Filter Saved!');
        })
    }
  }
});
