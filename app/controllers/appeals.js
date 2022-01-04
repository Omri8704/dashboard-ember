import Ember from 'ember';

const {
  Controller,
  inject,
  get,
  set
} = Ember

export default Controller.extend({
  notify: Ember.inject.service('notify'),

  settings: inject.service(),
  queryParams: ['limit', 'offset', 'search'],
  limit: 10,
  offset: 0,
  new_name: null,
  new_external_id: null,
  new_label: null,
  search: null,

  reset() {
    set(this, 'newAppeal', this.store.createRecord('appeal'));
    set(this, 'editAppeal', this.store.createRecord('appeal'));
    set(this, 'new_name', null)
    set(this, 'new_external_id', null);
    set(this, 'new_label', null);
    set(this, 'hasFeedback', false);
    set(this, 'base_href', window.location.host)
  },

  resetList(){
    this.set("model", this.store.findAll("appeal") )
    $('html, body').animate({ scrollTop: 0 }, 1000)
  },

  count: Ember.computed('model', function(){
    return get(this, 'model.meta.count')
  }),

  inputSearch: Ember.computed('model', function() {     
    return this.get('search')
  }),

  filteredAppeals: Ember.computed('model', function() {     
    this.focusSearch();
    return this.get("model").filter( function(row){
      return ( row.get("id") && row.get("id").length > 0 )
    })
  }),

  setSearch() {
    this.set('search', this.get('inputSearch'))
  },

  focusSearch(){ 
    var input = Ember.$("#search_appeals"); 
    if(input) {
      input.focus();
    } 
  },

  actions: {
    updateSearch(searchText){
      this.set('inputSearch', searchText)
      Ember.run.debounce(this, this.setSearch, 800)
    },
    changeOffset(offset){
      this.set("offset", offset)
    },

    editAppeal( appeal ){
      this.set( "editAppeal", appeal )
    },

    cancelEdit(){
      set(this, 'editAppeal', this.store.createRecord('appeal'));
    },

    deleteAppeal( appeal ){
      if( confirm("Delete " + (appeal.get("name") || "this row") + "?") ) {
        appeal.destroyRecord().then( () => {
          this.reset()
          this.resetList()
          this.get('notify').success("Successfully deleted Appeal")
        }).catch( (reason) => {
          if( reason.isAdapterError ){
            this.get('notify').alert( reason.errors[0].title )
          }else{
            appeal.errors.setProperties( reason.errors )
          }
        })
      }
    },

    updateAppeal(){
      let ei = this.get("editAppeal")

      ei.save().then( () => {
        this.reset()
        this.resetList()
        this.get('notify').success("Successfully updated Appeal")
        return false
      }).catch( (reason) => {
        if( reason.isAdapterError ){
          this.get('notify').alert(reason.errors[0].title)
        }else{
          let modelErrors = get(this, 'editAppeal.errors')
          modelErrors.setProperties( reason.errors )
        }

      })
    },

    addAppeal(){
      let ni = this.get("newAppeal")

      ni.set("name", this.get("new_name") )
      ni.set("external_id", this.get("new_external_id") )
      ni.set("label", this.get("new_label") )

      ni.validate().then( ({ model, validations }) => {
        if (validations.get('isValid')) {
          model.save().then( () => {
            this.reset()
            this.resetList()
            this.get('notify').success("Successfully created new Appeal")
          }).catch( (reason) => {
            if( reason.isAdapterError ){
              this.get('notify').alert(reason.errors[0].title)
            }else{
              this.set('hasFeedback', true)
            }
          });
        }else{
          this.set('hasFeedback', true)
        }
      })
    }
  },
});
