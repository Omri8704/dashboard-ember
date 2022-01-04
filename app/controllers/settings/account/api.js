import Controller from "@ember/controller";
import { inject } from "@ember/service";
import { computed } from '@ember/object';
// import { alias } from "@ember/object/computed"

export default Controller.extend({
  settings: inject(),
  regenButtonText: computed("model.amploApiToken", "loading_regen", function() {
    if (this.get("loading_regen")) {
      return "Loading"
    } else if (this.get("model.amploApiToken")) {
      return "Regenerate Token"
    } else {
      return "Generate Token"
    }
  }),
  updateUrlButtonText: computed("model.amploApiWebhookUrl", "loading_url", function() {
    if (this.get("loading_regen")) {
     return "Loading"
   } else if (this.get("model.amploApiWebhookUrl")) {
     return "update URL"
   } else {
     return "Set new URL"
   }
  }),
  actions: {
    regenerateToken() {
      this.set('loading_regen', true)
      if (!this.get("model.amploApiToken")) {
        this.get('model').save({adapterOptions: { generateToken: true } }).then(e => this.set("loading_regen", false))
      } else if (window.confirm("If you regenerate the token, the old one will stop working imidiately. Are you sure?")) {
        this.get('model').save({adapterOptions: { generateToken: true } }).then(e => this.set("loading_regen", false))
      } else {
        this.set('loading_regen', false)
      }
    },
    updateURL() {
      this.set('loading_url', true)
      if (!this.get("model.amploApiWebhookUrl")) {
        this.get('model').save().then(e => this.set("loading_url", false))
      } else if (window.confirm("If you change the url, the old one will stop working imidiately. Are you sure?")) {
        this.get('model').save().then(e => this.set("loading_url", false))
      } else {
        this.set("loading_url", false)
      }
    }
  }
})
