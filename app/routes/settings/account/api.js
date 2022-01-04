import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  settings: inject(),
  model() {
    return this.get("store").queryRecord("api-setting", {})
  },
  beforeModel() {
    let entity = this.get("settings.current_entity")
    if (!entity.get("api_access")) {
      this.transitionTo('settings.account.entity-switcher')
    }
  }
});
