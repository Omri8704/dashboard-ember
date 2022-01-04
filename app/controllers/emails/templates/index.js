import Ember from 'ember';

const {
  Controller,
  computed,
  inject,
  set,
  get
} = Ember;

export default Controller.extend({
  queryParams: ['limit', 'offset', 'search', 'status'],
  limit: 5,
  offset: 0,
  search: null,
  status: null,
  statuses: [
    'active',
    'pending',
    'closed'
  ],
  templateCount: Ember.computed('model', function(){
    let meta = get(this, "model.meta")
    return meta.count
  }),

  settings: inject.service(),
  notify: inject.service(),
  defaultEmailTemplates: computed.filterBy("model", "default_template", true),
  entityEmailTemplates: computed.filterBy("model", "default_template", false),

  actions: {
    changeOffset(offset){
      set(this, "offset", offset)
    },

    deleteTemplate(template) {
      template.destroyRecord().then( () => {
        this.get("notify").success("Successfully deleted the Template.")

        // reload route to get in default templates through the model hook
        if (this.get('entityEmailTemplates.length') == 0 && this.get('defaultEmailTemplates.length') == 0) {
          this.send('reloadModel')
        }
      })
    },

    cloneTemplate(template) {
      let oldTemplate = template.serialize()
      oldTemplate.entity = this.get("settings.current_entity")
      oldTemplate["default_template"] = false
      const newTemplate = this.store.createRecord("email-template", oldTemplate)
      newTemplate.save().then( (savedTemplate) => {
        this.get("notify").success("Successfully saved the Template")
        this.transitionToRoute("emails.templates.edit", savedTemplate.get("id"))
      }).catch( () => {
        newTemplate.deleteRecord()
        this.get("notify").warning("Error saving the Template")
      })
    }
  }
});
