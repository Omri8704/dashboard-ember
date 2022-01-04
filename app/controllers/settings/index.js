import Ember from 'ember';

const {
  Controller,
  inject,
  computed,
  get,
  set
} = Ember;

export default Controller.extend({
  settings: inject.service(),
  entities: computed.alias('model'),
  actions: {
    switchEntity: function(entity) {
      localStorage.setItem("entity_id", entity.get('id'));
      get(this, 'store').unloadAll('campaign');
      get(this, 'store').unloadAll('report-filter');
      get(this, 'store').unloadAll('event');
      get(this, 'store').unloadAll('report-template');
      get(this, 'store').unloadAll('report-schedule');
      entity.reload().then( (reloadedEntity) => {
        set(this, "settings.current_entity", reloadedEntity);
        this.transitionToRoute('index');
      })
      reset_side_nav_react()
    }
  }
});
