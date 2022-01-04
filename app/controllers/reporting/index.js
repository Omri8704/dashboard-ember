import Ember from 'ember';

import request from '../../utils/ajax-promise'
import config from '../../config/environment'

const {
  Controller,
  inject,
  computed,
} = Ember

export default Controller.extend({
  settings: inject.service(),
});
