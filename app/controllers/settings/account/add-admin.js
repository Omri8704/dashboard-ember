import Ember from 'ember'
import config from '../../../config/environment'

const { Controller, computed, inject, get, set } = Ember

export default Ember.Controller.extend({
  settings: inject.service(),
  session: Ember.inject.service(),

  srcIframe: computed('', function() {
    return `${
      config.host
    }admin_management/?entity_id=${get(this, 'settings.current_entity.id').toString()}&user_id=${this.get('session.current_user.id')}`
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
