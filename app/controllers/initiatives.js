import Ember from 'ember';

const {
  Controller,
  inject,
  get,
  set
} = Ember

export default Controller.extend({
  notify: Ember.inject.service('notify'),
  init(){
    this._super(...arguments);
    return this.reset();
  },

  settings: inject.service(),
  queryParams: ['limit', 'offset'],
  limit: 10,
  offset: 0,
  new_name: null,
  new_external_id: null,

  reset() {
    set(this, 'newInitiative', this.store.createRecord('initiative'));
    set(this, 'editInitiative', this.store.createRecord('initiative'));
    set(this, 'new_name', null)
    set(this, 'new_external_id', null);
    set(this, 'hasFeedback', false);
  },

  resetList(){
    this.set("model", this.store.findAll("initiative") )
    $('html, body').animate({ scrollTop: 0 }, 1000)
  },

  count: Ember.computed('model', function(){
    return get(this, 'model.meta.count')
  }),

  filteredInitiatives: Ember.computed('model', function() {
    return this.get("model").filter( function(row){
      return ( row.get("id") && row.get("id").length > 0 )
    })
  }),

  actions: {
    changeOffset(offset){
      this.set("offset", offset)
    },

    editInitiative( initiative ){
      this.set( "editInitiative", initiative )
    },

    cancelEdit( ){
      set(this, 'editInitiative', this.store.createRecord('initiative'));
    },

    deleteInitiative( initiative ){
      if( confirm("Delete " + (initiative.get("name") || "this row") + "?") ) {
        initiative.destroyRecord().then( () => {
          this.reset()
          this.resetList()
          this.get('notify').success("Successfully deleted Initiative")
        }).catch( (reason) => {
          if( reason.isAdapterError ){
            this.get('notify').alert( reason.errors[0].title )
          }else{
            initiative.errors.setProperties( reason.errors )
          }
        })
      }
    },

    updateInitiative(){
      let ei = this.get("editInitiative")

      ei.save().then( () => {
        this.reset()
        this.resetList()
        this.get('notify').success("Successfully updated Initiative")
        return false
      }).catch( (reason) => {
        if( reason.isAdapterError ){
          this.get('notify').alert(reason.errors[0].title)
        }else{
          let modelErrors = get(this, 'editInitiative.errors')
          modelErrors.setProperties( reason.errors )
        }

      })
    },

    addInitiative(){
      let ni = this.get("newInitiative")
      ni.set("name", this.get("new_name") )
      ni.set("external_id", this.get("new_external_id") )

      ni.validate().then( ({ model, validations }) => {
        if (validations.get('isValid')) {
          model.save().then( () => {
            this.reset()
            this.resetList()
            this.get('notify').success("Successfully created new Initiative")
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
  }
});
