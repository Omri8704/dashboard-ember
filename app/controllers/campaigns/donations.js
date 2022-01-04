import Ember from 'ember';

const {
  Controller,
  computed,
  inject,
  get
} = Ember

export default Controller.extend({
  notify: inject.service(),
  settings: inject.service(),
  session: inject.service(),
  queryParams: ['email', 'limit', 'offset'],
  email: null,
  limit: 10,
  offset: 0,
  selectedUser: null,
  users: null,
  searchQuery: null,
  showUploadForm: null,
  sortProperties: ['created_at:desc'],
  sortedDonations: computed.sort('model', 'sortProperties'),
  historicalDonations: computed.filterBy('model', 'don_type', "hist"),
  amploDonations: computed('model', function() {
    return this.get("model").filter(function(donation) {
      return donation.get("don_type") !== 'hist';
    });
  }),
  count: computed('model', function(){
    return get(this, 'model.meta.count')
  }),
  reset() {
    this.set('users', null);
    this.set('selectedUser', null);
    this.set('offset', null);
    this.set('email', null);
    this.set('searchQuery', null);
  },
  getUsersQuery() {
    return this.store.query('user', {
      query: this.get("searchQuery")
    }).then( (value) => {
      this.set('users', value);
      this.set('searching', false);
    })
  },

  isLoading() {
    this.toggleProperty("loading");
    if (this.get("loading")) {
      $("body").append("<div class='savingCover'><i class='fa fa-spinner fa-pulse'></i></div>");
    } else {
      $(".savingCover").remove();
    }
  },
  getUserDonations(email) {
    return this.set('email', email);
  },
  resetOffset() {
    this.set("offset", 0);
  },
  actions: {
    changeOffset(offset){
      this.set("offset", offset)
    },
    getUsers: function(searchQuery) {
      this.set('searching', true);
      this.set('users', null);
      this.set('searchQuery', searchQuery);
      return Ember.run.debounce(this, "getUsersQuery", 200);
    },
    toggleUser(user) {
      this.resetOffset();
      if (user) {
        this.set("selectedUser", user);
        this.getUserDonations(user.get("email"));
      } else {
        this.set('email', null);
        this.set("selectedUser", null);
      }
    },

    confirmRefund(donation) {
      this.toggleProperty("confirmRefundModal");
      this.set("donationToRefund", donation);
    },

    refundDonation: function() {
      this.isLoading();
      this.set("confirmRefundModal", false);

      this.get("donationToRefund").refund().then( () => {
        this.set("refundFailed", false);
        this.set("reason", null);
        const email = this.get("email");
        this.set("email", null);
        this.set("email", email);
        this.isLoading();
        this.get("notify").success("Successfully refunded this donation")
        this.get("donationToRefund").set("refundable", false )
      }).catch( (reason) => {
        this.set("refundFailed", true);

        if (reason.errors.base) {
          this.set("reason", reason.errors.base);
        } else {
          if (Array.isArray(reason.errors)) {
            this.set("reason", reason.errors);
          } else {
            this.set("reason", [reason.errors]);
          }
        }
        this.isLoading();
        this.get("notify").success("There was a problem refunding this donation")
      });
    },

    toggleConfirmRefundModal() {
      this.toggleProperty('confirmRefundModal')
    },

    toggleSavedRefundModal() {
      this.toggleProperty("refundFailed")
      this.toggleProperty('savedRefund')
    },

    toggleShowUploadForm: function() {
      this.toggleProperty('showUploadForm');
    }
  }
});
