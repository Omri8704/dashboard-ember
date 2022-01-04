import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  settings: Ember.inject.service(),
  model() {
    const timezone = this.get('settings.current_entity.timezone');
    const timezoneDate = moment.tz(moment(), timezone);

    return this.store.createRecord('mailing', {
      sent_at: timezoneDate
    });
  },

  deactivate() {
    let model = this.modelFor('emails.new');
    if ((model.get('isNew') || model.get('hasDirtyAttributes')) && (!model.get('isSaving'))) {
      return model.deleteRecord();
    }
  },

  resetController(controller) {
    controller.set('selectedPromotion', false)
  }
});
