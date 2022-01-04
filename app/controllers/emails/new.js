import Ember from 'ember';

const { run, RSVP } = Ember

export default Ember.Controller.extend({
  notify: Ember.inject.service(),
  mailing: Ember.computed.alias('model'),
  selectedPromotion: null,

  _searchPromotions(query, resolve, reject) {
    const promise1 = this.store.query("event", { search_term: query })
    const promise2 = this.store.query("campaign", { search_term: query })

    RSVP.Promise.all([promise1, promise2])
      .then((campaigns)=>{
        resolve([{ groupName: "Events", options: campaigns[0].toArray() }, { groupName: "Campaigns", options: campaigns[1].toArray() }])
      })
      .catch(reject);
  },
  actions: {
    searchPromotions(query) {
      return new Ember.RSVP.Promise( (resolve, reject) => {
        run.debounce(this, this._searchPromotions, query, resolve, reject, 100)
      })
    },
    updatePromotion(promotion) {
      this.set('model.promotion', promotion)
      this.set('selectedPromotion', true)
    },

    saveEmail() {
      this.set('selectedPromotion', true)

      this.get('model')
        .validate({on: ['name', 'promotion']})
        .then( ({validations}) => {
          if (validations.get('isValid')) {
            this.get("model").save().then((response)=>{
              this.transitionToRoute("emails.email.audience", response)
              this.get("notify").success("Saved Email.")
            })
          }
        })
    }
  }
});
