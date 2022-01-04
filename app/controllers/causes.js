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
  queryParams: ['limit', 'offset'],
  limit: 10,
  offset: 0,
  new_name: null,
  new_external_id: null,
  loading: false,

  reset() {
    set(this, 'newCause', this.store.createRecord('cause'));
    set(this, 'editCause', this.store.createRecord('cause'));
    set(this, 'new_name', null)
    set(this, 'new_external_id', null);
    set(this, 'hasFeedback', false);
  },

  resetList(){
    this.set("model", this.store.findAll("cause") )
    $('html, body').animate({ scrollTop: 0 }, 1000)
  },

  count: Ember.computed('model', function(){
    return get(this, 'model.meta.count')
  }),

  filteredCauses: Ember.computed('model', function() {
    return this.get("model").filter( function(row){
      return ( row.get("id") && row.get("id").length > 0 )
    })
  }),

  actions: {
    changeOffset(offset){
      this.set("offset", offset)
    },

    editCause( cause ){
      this.set( "editCause", cause )
    },

    cancelEdit(){
      set(this, 'editCause', null);
    },

    deleteCause( cause ){
      if( confirm("Delete " + (cause.get("name") || "this row") + "?") ) {
        cause.destroyRecord().then( () => {
          this.reset()
          this.resetList()
          this.get('notify').success("Successfully deleted Cause")
        }).catch( (reason) => {
          if( reason.isAdapterError ){
            this.get('notify').alert( reason.errors[0].title )
          }else{
            cause.errors.setProperties( reason.errors )
          }
        })
      }
    },

    updateCause(){
      let ei = this.get("editCause")

      ei.save().then( () => {
        this.reset()
        this.resetList()
        this.get('notify').success("Successfully updated Cause")
        return false
      }).catch( (reason) => {
        if( reason.isAdapterError ){
          this.get('notify').alert(reason.errors[0].title)
        }else{
          let modelErrors = get(this, 'editCause.errors')
          modelErrors.setProperties( reason.errors )
        }

      })
    },

    causeSaved(){
      this.reset()
      this.resetList()
    }
  }
});
