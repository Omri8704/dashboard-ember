import Ember from 'ember';

const { set } = Ember

export default Ember.Route.extend({
  queryParams: {
    limit: {
      replace: true,
      refreshModel: true
    },
    offset: {
      replace: true,
      refreshModel: true
    },
  },
  model(params) {
    return this.store.query('email-template', params).then( (emailTemplates) => {
      if (emailTemplates.get("length") > 0) {
        return emailTemplates
      }
      else {
        params.default = true
        return this.store.query('email-template', params)
      }
    })
  },
  resetController(controller) {
    set(controller, 'limit', 5)
    set(controller, 'offset', 0)
    set(controller, 'search', null)
    set(controller, 'status', null)
  },
  actions: {
    reloadModel() {
      this.refresh()
    }
  }
});
