import Ember from 'ember'
import config from '../config/environment'

const { Controller, computed, inject, get, set } = Ember

export default Ember.Controller.extend({
  settings: inject.service(),

  srcIframe: computed('', function() {
    return `${
      config.host
    }/react_dashboard/${get(this, 'settings.current_entity.id').toString()}/embedded_forms`
  }),

  reset() {
    set(this, 'loading', true)
  },

  actions: {
    onLoadingIframe() {
      this.set('loading', false)
    }
  }
})
