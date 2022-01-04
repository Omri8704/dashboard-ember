import Ember from 'ember';

export default Ember.Route.extend({
  settings: Ember.inject.service(),

  beforeModel: function() {
    let mailing = this.modelFor('emails.email');
    if( mailing.get("status") === "sent" ){
      return this.transitionTo('emails.email.stats');
    }
  },

  model() {
    let mailing = this.modelFor('emails.email');

    if (mailing.get('filter.id')) {
      return Ember.RSVP.hash({
        mailing: mailing,
        mailing_filter: mailing.get('filter')
      });
    }
    else {
      let filter = this.store.createRecord('filter');

      filter.setProperties({
          mailing: mailing,
          entity:  this.get('settings.current_entity')
      });
      return Ember.RSVP.hash({
        mailing: mailing,
        mailing_filter: filter
      });
    }
  },

  resetController(controller) {
    let model = controller.get('mailingFilter');

    if (model.get('hasDirtyAttributes')) {
      model.rollbackAttributes();
    }
  },

  actions: {
    saveFilter(mailing) {
      mailing.save();
    }
  }
});
