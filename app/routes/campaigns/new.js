import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  settings: Ember.inject.service(),
  model() {
    var entity;
    entity = this.get("settings.current_entity");
    return this.store.createRecord('campaign', {
      entity: entity,
      start_date: moment().format(),
      end_date: moment().format(),
    });
  },
  deactivate() {
    let model = this.modelFor('campaigns.new');
    if ((model.get('isNew') || model.get('hasDirtyAttributes')) && (!model.get('isSaving'))) {
      return model.deleteRecord();
    }
  }
});
