import Ember from 'ember';
import { debounce } from '@ember/runloop';
import config from '../../config/environment'

import moment from 'moment';
const {
  Controller,
  inject,
  computed,
  observer,
  get,
  set,
} = Ember;

export default Controller.extend({

  settings: inject.service(),

  srcIframe: computed('', function() {
    return `${
      config.host
    }/react_dashboard/campaigns/${get(this, 'settings.current_entity.id').toString()}/bulk-upload`
  }),

  reset() {
    set(this, 'loading', true)
  },

  actions: {
    onLoadingIframe() {
      this.set('loading', false)
    }
  }

});
