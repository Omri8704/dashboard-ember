import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const {
  Route,
  inject,
  get,
  set
} = Ember;

export default Route.extend(ApplicationRouteMixin, {
  settings: inject.service(),
  session: inject.service('session'),

  model() {
    if (!get(this, "session.isAuthenticated")) {
      return false;
    } else {
      return this.store.findAll("current_user").then( (value) => {
        set(this, 'session.current_user', get(value, 'firstObject'));

        return get(value, "firstObject");
      });
    }
  },

  afterModel(model) {
    if (!get(this, "session.isAuthenticated")) {
      return false;
    } else {
      return this.setCurrentEntity(model);
    }
  },

  activate() {
    var cssClass;
    cssClass = this.toCssClass();
    if (cssClass !== 'application') {
      $('body').addClass(cssClass);
    }
  },

  deactivate() {
    this.clearCurrentEntity()
    $('body').removeClass(this.toCssClass());
  },

  setCurrentEntity(current_user) {
    const entityIds = get(current_user, 'entities').map( (entity) => get(entity, 'id'))
    let entity;
    // if current user has the entity_id in the localStorage
    if (entityIds.includes(localStorage.getItem("entity_id")) ) {
      entity = this.store.findRecord('entity', localStorage.getItem("entity_id"));
    // else get the first entity_id from the current_user
    } else {
      if (entityIds[0]) {
        entity = this.store.findRecord('entity', entityIds[0]);
      } else {
        entity = this.store.findRecord('entity', get(current_user, "scoped_entity_id"));
      }
    }
    // fetch all attributes on an entity
    return entity.then( (resolvedEntity) => {
      localStorage.setItem("entity_id", get(entity, 'id'));
      set(this, 'settings.current_entity_id', get(entity, 'id') );
      set(this, 'settings.current_entity', entity);
      // reload the entity so it's reflected in ember data
      return resolvedEntity.reload()
    })
  },

  clearCurrentEntity() {
    localStorage.setItem("entity_id", null)
    set(this, 'settings.current_entity_id', null)
    set(this, 'settings.current_entity', null)
  },

  toCssClass() {
    return this.routeName.replace(/\./g, '-').dasherize();
  },

  actions: {

    reloadModel() {
      this.refresh();
    },

    logout() {
      get(this, 'session').invalidate();
    }

  }
});
