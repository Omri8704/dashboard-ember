import Ember from 'ember';

const {
  Controller,
  computed,
  inject,
  get,
  run,
  RSVP
} = Ember

export default Controller.extend({
  notify: inject.service(),
  settings: inject.service(),
  mailingFilter: computed.alias('model.mailing_filter'),
  mailing: computed.alias("model.mailing"),
  selectedUsers: computed.alias('mailing.users'),
  notSelectedUsers: Ember.A(),
  completed_steps: computed("mailing.completed_steps.length", function() {
    let obj = {};
    this.get("mailing.completed_steps").forEach(function(item) {
      return obj[item] = true;
    });
    return obj;
  }),

  currentWizardStep: computed("mailing.completed_steps.length", function(){
    const completed = get(this, "mailing.completed_steps")
    return completed.indexOf("audience") > -1 ? "4" : "1"
  }),

  getUsersQuery() {
    return this.store.query('user', {
      query: this.get("userSearchQuery")
    }).then((value)=> {
      this.set('notSelectedUsers', value);
      this.set('searching', false);
    });
  },

  _searchPromotions(query, resolve, reject) {
    const promise1 = this.store.query("event", { search_term: query })
    const promise2 = this.store.query("campaign", { search_term: query })

    RSVP.Promise.all([promise1, promise2])
      .then((campaigns)=>{
        resolve([{ groupName: "Events", options: campaigns[0].toArray() }, { groupName: "Campaigns", options: campaigns[1].toArray() }])
      })
      .catch(reject);

  },

  _searchUserSegments(query, resolve, reject) {
    this.store.query("user-segment", { search_term: query })
      .then((userSegments)=>{
        resolve([{groupName: "Email Lists", options: userSegments.toArray() }])
      })
      .catch(reject)
  },

  actions: {
    searchPromotions(query) {
      return new Ember.RSVP.Promise( (resolve, reject) => {
        run.debounce(this, this._searchPromotions, query, resolve, reject, 500)
      })
    },

    searchUserSegments(query) {
      return new Ember.RSVP.Promise( (resolve, reject) => {
        run.debounce(this, this._searchUserSegments, query, resolve, reject, 500)
      })
    },

    updatePromotion( newPromo ){
      newPromo.reload()
      let filter = get(this, "mailing.filter")

      this.set('model.mailing.promotion', newPromo )

      // If the promotion changes types, reset the filter
      if( filter.get('scope') !== newPromo.constructor.modelName ){
        filter.reset()
        filter.set( 'scope', newPromo.constructor.modelName )
      }
    },

    searchUsers() {
      this.set('searching', true);
      this.set('notSelectedUsers', null);
      Ember.run.debounce(this, "getUsersQuery", 200);
    },

    selectUser(user) {
      this.get("notSelectedUsers").removeObject(user);
      this.get("selectedUsers").addObject(user);
    },

    deselectUser(user) {
      this.get("selectedUsers").removeObject(user);
      this.get("notSelectedUsers").addObject(user._internalModel);
    },

    toggleExpandSelected() {
      this.toggleProperty('selectedUsersExpanded');
      return true;
    },

    uncompleteStep() {
      let completed_steps = this.get('mailing.completed_steps');
      if (completed_steps.indexOf("audience") !== -1) {
        return completed_steps.removeObject("audience");
      }
    },
    saveAudience() {
      let completed_steps = this.get('mailing.completed_steps');

      if (completed_steps.indexOf("audience") === -1) {
        completed_steps.pushObject("audience");
      }
      this.get('mailing').save().then( () => {
        this.transitionToRoute('emails.email.template');
      }).catch( (response) => {
        let errormsg = "There was an issue saving this email."
        if( response && response.errors && response.errors[0] ) errormsg = response.errors[0].detail
        this.get("notify").alert( errormsg )
      });
    }
  }
});
