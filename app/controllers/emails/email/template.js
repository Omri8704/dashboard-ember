import Ember from 'ember';

const {
  Controller,
  get,
  set,
  inject,
  computed
} = Ember;

export default Controller.extend({
  queryParams: ['limit','offset'],
  limit: 8,
  offset: 0,
  count: computed("model", function(){
    return get(this, "model.meta.count")
  }),
  notify: inject.service(),
  emailController: inject.controller('emails.email'),
  mailing: computed.reads('emailController.model'),
  emailTemplates: computed.filterBy('model', "default_template", false ),
  actions: {
    setOffset(offset) {
      set(this, "offset", offset)
    },
    unsetTemplate() {
      set(this, 'mailing.emailTemplate', null);
    },
    selectTemplate(template) {
      set(this, 'mailing.emailTemplate', template);
    },

    saveTemplate() {
      let completed_steps = get(this, 'mailing.completed_steps');

      if (completed_steps.indexOf("template") === -1) {
        completed_steps.push("template");
      }

      get(this, "mailing").save()
        .then( () => {
          get(this, "notify").success("Successfully added template.")
          this.transitionToRoute('emails.email.message');
        })
        .catch( ()=> {
          get(this, "notify").warning("Failed to add template.")
        })
    }
  }
});
