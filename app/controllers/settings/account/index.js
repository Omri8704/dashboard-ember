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
  filter: null,
  filteredEntities: computed('model', 'filter', function() {
    let filter = this.get("filter");
    if( filter == null || filter == '' || filter.length < 2){
      return this.get("model");
    }else{
      return this.get("model").filter(function(entity) {
        return ( entity.get("name").toLowerCase().indexOf( filter ) >= 0 );
      });
    }

  }),

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
    }
  }
});
