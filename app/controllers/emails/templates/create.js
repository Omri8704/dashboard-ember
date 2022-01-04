import Ember from 'ember';
const { Controller, computed, inject } = Ember;

export default Controller.extend({
  settings: inject.service(),
  notify: inject.service(),
  defaultEmailTemplates: computed.filterBy("model", "default_template", true),
  actions: {
    cloneTemplate(template) {
      let oldTemplate = template.serialize()
      oldTemplate.entity = this.get("settings.current_entity")
      oldTemplate["default_template"] = false
      oldTemplate.name = null

      const newTemplate = this.store.createRecord("email-template", oldTemplate)
      newTemplate.save().then( (savedTemplate) => {
        this.get("notify").success("Successfully saved Template.")
        this.transitionToRoute("emails.templates.edit", savedTemplate.get("id"))
      }).catch( () => {
        this.get("notify").alert("Error saving Template.")
        newTemplate.deleteRecord()
      })
    },

    filePicked(file) {
      const fileReader = new FileReader()

      fileReader.onload = (e) => {
        const newTemplate = this.store.createRecord("email-template", {
          entity: this.get('settings.current_entity'),
          html: e.target.result,
          userUploaded: true
        })

        newTemplate
          .save().then( (savedTemplate) => {
            this.get("notify").success("Successfully saved Template.")
            this.transitionToRoute("email-templates.edit", savedTemplate.get('id'))
          }).catch( () => {
            this.get("notify").alert("Error saving Template.")
            newTemplate.deleteRecord()
          })
      }
      fileReader.readAsText(file)

    },
    removeFile() {
      this.set('file', null)
    },
    pastedHtml(html) {
      this.set('pastedHtml', html)
    },
    savePastedHtml() {
      const newTemplate = this.store.createRecord("email-template", {
        entity: this.get('settings.current_entity'),
        html: this.get('pastedHtml'),
        userUploaded: true
      })

      newTemplate
        .save()
        .then( (savedTemplate) => {
          this.get("notify").success("Successfully saved Template.")
          this.transitionToRoute('emails.templates.edit', savedTemplate.get('id'))
        })
        .catch( () => {
          this.get("notify").alert("Error saving Template.")
          newTemplate.deleteRecord()
        })
    }
  }
});
