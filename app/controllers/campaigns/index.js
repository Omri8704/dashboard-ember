import Ember from 'ember';

const {
  Controller,
  computed,
  inject,
  get
} = Ember

export default Controller.extend({
  session: Ember.inject.service(),

  openFilesPassword: Ember.computed('session', function () {
    return this.get('session.current_user.open_files_password')
  }),

  queryParams: ['limit', 'offset', 'search_term', 'status'],
  limit: 10,
  offset: 0,
  search_term: null,
  search_term_debounce: null,
  status: null,
  statuses: [
    'active',
    'pending',
    'staging',
    'closed'
  ],
  campaigns: computed.alias('model'),
  session: inject.service(),
  settings: inject.service(),
  count: computed('model', function(){
    let meta = get(this, "model.meta")
    return meta.count
  }),

  canCreateCampaign: computed('settings.current_entity.id', function() {
    return this.get("settings.current_entity.can_create_campaign")
  }),

  _setSearchTerm: Ember.observer('search_term_debounce', function () {
    let timer = this.get("debounce_timer")
    if( timer ) Ember.run.cancel( timer )
    this.set("debounce_timer", Ember.run.debounce(this, function () {
      if (this.get('search_term_debounce') && this.get('search_term_debounce').length > 0
        && this.get('search_term') != this.get('search_term_debounce')) {
        this.set("offset", 0)
      }
      this.set('search_term', this.get('search_term_debounce'));
    }, 800 ))
  }),

  actions: {
    changeOffset(offset){
      this.set("offset",offset)
    }
  }
});
