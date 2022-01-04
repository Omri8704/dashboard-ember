import Ember from 'ember';
import { debounce } from '@ember/runloop';
import moment from 'moment';
const {
  Controller,
  inject,
  computed,
  observer,
  get,
  set,
  RSVP
} = Ember;

export default Controller.extend({
  notify: Ember.inject.service('notify'),
  settings: Ember.inject.service(),
  runValidation: false,

  onInit: Ember.on("init", function() {
    return this.reset();
  }),

  reset() {
    set(this, 'donation', this.store.createRecord('donation'));
    set(this, 'donation.amount', null);
    set(this, 'donation.type', null);
    set(this, 'donation.campaign', null);
    set(this, 'selectedCampaign', null);
    set(this, 'newUser', this.store.createRecord('user'));
    set(this, 'newAddress', this.store.createRecord('address'));
    set(this, 'useCurrentAddress', false);
    set(this, 'recurring', false);
    set(this, "giftType", 'oneTime');
    set(this, 'users', null);
    set(this, 'searching', false);
    set(this, 'canShowErrors', false);
  },
  store: inject.service(),
  campaigns: computed('entity.campaigns', function() {
    return get(this, "store").peekAll('campaign').map( (campaign) =>
      Ember.Object.create(campaign.serialize({includeId: true}))
    )
  }),

  donationTypes: computed("recurring", function() {
    if (get(this, "recurring")) {
      return [
        {
          id: 'cc',
          name: 'Credit Card'
        }
      ];
    } else {
      return [
        {
          id: 'cc',
          name: 'Credit Card'
        }, {
          id: 'check',
          name: 'Check'
        }, {
          id: 'cash',
          name: 'Cash'
        }
      ];
    }
  }),

  // re runs validations for select dropdowns
  reValidateDonation: observer('donation.don_type', 'donation.campaign.content', function() {
    // catch the error but don't do anything with it
    get(this, 'donation').validate().catch( (e) => { return e });
  }),

  startDate: new Date(moment(new Date()).add(1, 'day').format('YYYY-MM-DD')),

  // computed with entity to make it fire on page load
  enableDatePicker: computed('donation.don_type', 'entity', {
    get() {
      if (get(this, 'donation.don_type') === 'cash' ||
            get(this, 'donation.don_type') === 'check') {
          return true;
        }
      else {
        // clear datepicker if disabled
        if (get(this, 'datepicker')) {
          get(this, 'datepicker').datepicker('update', null);
          set(this, 'donation.created_at', null);
        }
        return false;
      }
    }
  }),

  disableDatePicker: computed.not('enableDatePicker'),

  intervals: ['monthly', 'quarterly', 'annually'],
  affinities: ['students', 'parents', 'staff', 'undergraduate_alumni', 'grad_alumni'],

  causes: computed('donation.campaign.causes.@each.id', function() {
    let causes = get(this, 'donation.campaign.causes');

    let newCauses;
    if (causes) {
      newCauses = causes.map((cause) => {
          return Ember.ObjectProxy.create({
            content: cause,
            isSelected: false,
            amount: null
          });
      });
      return newCauses;
    } else {
      return [];
    }
  }),

  selectedCauses: computed.filterBy('causes', 'isSelected', true),

  causeAmountChange: observer("selectedCauses.@each.amount", function() {
    const selectedCauses = get(this, "selectedCauses");
    let total = 0;
    selectedCauses.forEach( (cause) => {
      if (cause.amount) {
        return total += parseFloat(cause.amount);
      }
    });

    selectedCauses.forEach( (cause) => {
      if (cause.amount) {
        let percent = (( parseFloat(cause.amount) / total ) * 100).toFixed(2);
        return cause.set('percent', percent);
      }
    });

    return this.set('donation.amount', total.toFixed(2));
  }),

  getUsersQuery() {
    let query = get(this, "searchQuery")

    if( query.length > 0 ){
      this.store.query('user', { query: query }).then( (value) => {
        set(this, 'users', value);
        set(this, 'searching', false);
      });
    }else{
      set(this, 'users', []);
      set(this, 'searching', false);
    }
  },

  getCampaignsQuery(resolve, reject) {
    let query = get(this, "campaignsQuery");

    if( query.length >= 3 ){
      return this.store.query('campaign', { search_term: query }).then( (campaigns) => {
        if(campaigns.length) {
          set(this, 'campaigns', campaigns);
          resolve();
        } else {
          set(this, 'campaigns', []);
          reject();
        }
      });
    }
  },

  loading(isLoading) {
    if (isLoading) {
      $("body").append("<div class='savingCover'><i class='fa fa-spinner fa-pulse'></i></div>");
    }
    else {
      $(".savingCover").remove();
    }
  },

  commaAmount: computed('donation.amount', function() {
    if (get(this, 'donation') && get(this, 'donation.amount')) {
      return get(this, 'donation.amount').toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
    }
  }),

  modelValidations() {
    set(this, 'canShowErrors', true);

    if ($('.has-error').length > 0) {
      $('html, body').animate({
        scrollTop: $(".has-error").first().offset().top - 10
      }, 1000);
      return false;
    }

    const promiseMeYoureValid = [
      get(this, 'donation').validate(),
    ];

    if (!get(this, 'donation.user')) {
      promiseMeYoureValid.push(get(this, 'newUser').validate());
    }

    if (!get(this, 'useCurrentAddress')) {
      promiseMeYoureValid.push(get(this, 'newAddress').validate());
    }

    return RSVP.all(promiseMeYoureValid)
    .then( (models) => {
      const hasInvalid = models.find( (model) => model.validations.get('isValid') === false)

      if (!hasInvalid) {
        set(this, 'donationValid', true)
        set(this, 'confirmDonation', true)
      }
    })
  },

  userName: Ember.computed(
    'donation.user.id',
    'donation.user.first_name',
    'donation.user.last_name',
    'newUser.first_name',
    'newUser.last_name',
    function() {
      if (this.get('donation.user.id')) {
        return {
          first_name: this.get('donation.user.first_name'),
          last_name: this.get('donation.user.last_name'),
        }
      }
      else {
        return {
          first_name: this.get('newUser.first_name'),
          last_name: this.get('newUser.last_name'),
        }
      }
  }),

  actions: {
    checkValidation() {

      if( get(this, 'donation.user.id') ) {
        //Required to be here because this and spreedly validation are tied together and we need to pass in the address :(
        if( !get(this, 'useCurrentAddress') ){
          set(this, 'donation.user.address', get(this, "newAddress"));
        }
      }else{
        set(this, 'donation.user', get(this, "newUser"));
        set(this, 'donation.user.address', get(this, "newAddress"));
      }
      this.modelValidations()

      if (this.get('donation.don_type') == 'cc') {
        this.set('runValidation', true)
      }
    },

    toggleConfirmDonation() {
      this.toggleProperty('confirmDonation')
    },

    toggleSavedDonationModal() {
      this.toggleProperty('savedDonation')
      this.loading( this.get("savedDonation") )
    },

    afterFailedSubmit() {
      this.set('runValidation', false)
    },

    afterSpreedlyValidation(token) {
      this.set('donation.spreedly_cc_token', token)
    },

    submitDonation() {
      var hasSetUser;
      this.get('loading')(true);
      set(this, 'closeModal', true);
      set(this, 'reason', null);
      set(this, 'runValidation', false)

      if (this.get('donation.don_type') !== 'cc') {
        this.set('donation.spreedly_cc_token', null)
      }
      let causes = get(this, "causes")
      if( causes ) {
        causes.filterBy("isSelected", true).forEach( (cause) => {
          cause.set('donation', get(this, 'donation') );
        });
      }

      if( get(this, 'donation.user.id') ) {
        hasSetUser = true;
        if( !get(this, 'useCurrentAddress') ){
          set(this, 'donation.user.address', get(this, "newAddress"));
        }
      }else{
        set(this, 'donation.user', get(this, "newUser"));
        set(this, 'donation.user.address', get(this, "newAddress"));
      }


      this.get('donation').save().then( () => {
        this.reset();
        set(this, 'confirmDonation', false)
        set(this, 'savedDonation', true)
        this.loading(false);
        $('html, body').animate({ scrollTop: 0 }, 1000);
        return true;
      }).catch( (reason) => {
        let modelErrors = get(this, 'donation.errors');
        set(this, 'confirmDonation', false)
        set(this, 'savedDonation', true)
        modelErrors.setProperties(reason.errors);

        if (reason.errors.length > 0) {
          set(this, 'reason', Ember.$.map(reason.errors, function(instance, index) {
            return instance.detail
          }));
        }else {
          set(this, 'reason', ["There was an error proccessing your transaction."]);
        }

        if (!hasSetUser) {
          set(this, "donation.user", null);
        }

        this.loading(false);

        this.get('notify').alert("Error Creating Donation.")

        setTimeout(function() {
          if( $(".has-error").length > 0 ) {
            $('html, body').animate({
              scrollTop: $(".has-error").first().offset().top - 15
            }, 1000);
          }
        }, 300);
      });
    },

    createDonation(token) {
      this.send('submitDonation')
    },

    cancelDonation() {
      this.reset(true);
    },

    giftTypeChanged() {
      if (get(this, "giftType") === 'recurring') {
        set(this, 'recurring', true);
        set(this, 'donation.interval', 'monthly');
      } else {
        set(this, 'recurring', false);
        set(this, 'donation.interval', null);
        set(this, 'donation.occurrences', null);
      }
    },

    getUsers(searchQuery) {
      set(this, 'searching', true);
      set(this, 'users', null);
      set(this, 'searchQuery', searchQuery);
      Ember.run.debounce(this, "getUsersQuery", 200);
    },

    toggleUser(user) {
      if (user) {
        this.send("setUser", user)
      }else {
        this.send("unsetUser")
      }
    },

    setUser(user) {
      set(this, "donation.user", user);
      if( user.get("address.id") ){
        set(this, "useCurrentAddress", true);
      }
    },

    unsetUser() {
      set(this, "donation.user", null);
      set(this, "useCurrentAddress", false);
    },

    toggleCause(cause) {
      cause.toggleProperty('isSelected');
    },

    datepicker(picker) {
      set(this, 'datepicker', picker);
    },

    selectCampaign(campaign) {
      const serializedCampaign = get(this, 'store').peekRecord('campaign', campaign.id);

      set(this, 'donation.campaign', serializedCampaign);
      set(this, 'selectedCampaign', campaign);
    },

    searchCampaigns(query) {
      set(this, 'campaignsQuery', query);
      if (!query.length) {
        set(this, 'campaigns', get(this, 'store').peekAll('campaign'));
        return true;
      } else {
        return new RSVP.Promise((resolve, reject) => {
          debounce(this, this.getCampaignsQuery, resolve, reject, 600);
        });
      }
    },

    resetCampaignOptions() {
      if(!get(this, 'selectedCampaign')) {
        set(this, 'campaigns', get(this, 'store').peekAll('campaign'));
      }
    }

  }
});
