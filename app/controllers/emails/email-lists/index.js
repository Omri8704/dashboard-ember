import Ember from 'ember';


export default Ember.Controller.extend({
  queryParams: ['search','offset','limit'],
  limit: 10,
  offset: 0,
  search: null,
  notify: Ember.inject.service(),
  count: Ember.computed('model', function(){
    return this.get("model.meta.count")
  }),

  actions: {
    changeOffset(offset) {
      this.set("offset", offset)
    },
    destroySegment(segment){
      if( confirm(`This list is currently attached to ${segment.get('unsentMailings').get('length')} unsent/pending Mailings.  Deleting this list will not remove it from unsent/pending Mailings.  Are you sure you wish to continue deleting "${(segment.get("name") || "this list")}"?` ) ) {
        segment.destroyRecord().then( () => {
          this.get('notify').success("Successfully deleted Email List")
        }).catch( (reason) => {
          if( reason.isAdapterError ){
            this.get('notify').alert( reason.errors[0].title )
          }else{
            this.get('notify').alert( "An unknown error occurred" )
          }
        })
      }
    }
  }
});
