import Ember from 'ember';

const { Controller, inject } = Ember

export default Controller.extend({
  notify: inject.service(),
  session: inject.service(),
  limit: 10,
  offset: 0,
  segmentFilter: null,
  openFilesPassword: Ember.computed('session', function () {
    return this.get('session.current_user.open_files_password')
  }),
  count: Ember.computed('users', function(){
    return this.get('users.meta.count')
  }),

  reset() {
    this.set('segmentFilter', this.store.createRecord('filter') )
    this.set('uploading', false)
    this.set('drawer', false)
    this.set('addingUser', false)

    let nullVals = [ 'file', 'users', 'searchUsers', 'selectedUser', 'email', 'filterQuery', 'searchQuery' ]

    nullVals.forEach( function(item){
      this.set( item, null )
    }, this )
  },

  listUsersQuery() {
    this.set('searching', true);
    this.set('users', null);
    return this.store.query('user', {
      query: this.get("filterQuery"),
      limit: this.get("limit"),
      offset: this.get("offset"),
      user_segment: this.get("model.id")
    }).then( (value) => {
      this.set('users', value);
      this.set('searching', false);
    })
  },

  getSearchUsersQuery(){
    this.set('searching', true);
    this.set('searchUsers', null);
    let query = this.get("searchQuery")
    if( !query || query.trim().length == 0 ){
      this.set('searchUsers', null)
      this.set('searching', false)
      return null;
    }

    return this.store.query('user', {
      query: query,
      limit: 8
    }).then( (value) => {
      this.set('searchUsers', value)
      this.set('searching', false)
    })
  },

  actions: {
    changeOffset(value){
      this.set("offset", value)
      this.listUsersQuery()
    },

    listUsers: function(filterQuery) {
      this.set('filterQuery', filterQuery);
      return Ember.run.debounce(this, "listUsersQuery", 200);
    },

    searchUsers: function(searchQuery) {
      this.set('searchQuery', searchQuery);
      return Ember.run.debounce(this, "getSearchUsersQuery", 200);
    },

    closeDrawer: function(){
      let attrs = ['addingFile', 'addingFilter', 'addingUser', 'drawer']
      attrs.forEach( function(item){
        this.set( item, null )
      }, this )
    },

    applyFilter: function(){
      this.set("uploading", true)
      this.get("model").bulkAssign( this.get("segmentFilter") ).then( () => {
        this.get("notify").success(`Filter submitted. You will get an email when this filter has been applied`)
        this.reset()
        this.transitionToRoute("emails.email-lists")
      }).catch( () => {
        this.get("notify").warning("There was an error processing your filter.")
        this.set("uploading", false)
      })
    },

    removeUser: function(user){
      if( confirm("Are you sure you want to remove " + user.get("email") +"?")){
        user.get("subscribed_user_segments").removeObject( this.get("model") )
        user.save().then( () => {
          this.listUsersQuery()
          this.get("notify").success("Successfully removed this User")
        }).catch( () => {
          this.get("notify").warning("There was an error removing this user.")
        })
      }
    },

    addUser: function(user){
      user.get("subscribed_user_segments").pushObject( this.get("model") )
      user.save().then( () => {
        this.listUsersQuery()
        this.get("notify").success("Successfully added this User")
      }).catch( () => {
        this.get("notify").warning("There was an error adding this user.")
      })
    },

    updateUserSegment() {
      this.get("model").save().then( () => {
        this.get("notify").success("Updated list name.")
      }).catch( () => {
        this.get("notify").warning("There was an error updating your list.")
      })
    },
    removeFile() {
      this.set("file", null)
    },
    filePicked(file) {
      this.set("file", file)
    },
    uploadUsersS3() {
      this.set("uploading", true)
      this.get('model').bulkUploadS3(this.get("file"), this.get('use_new'))
        .then(() => {
          this.get("notify").success(`Successfully uploaded. You will get an email when this file is finished processing`)
          this.transitionToRoute("emails.email-lists")
          alert('Successfully uploaded. You will get an email when this file is finished processing.\n'
            + 'The password for open the attachment files: ' + this.get('openFilesPassword'))
        })
        .catch(() => {
          this.get("notify").warning("There was an error processing your file.")
        }).finally(() => {
          this.set("file", null)
          this.set("uploading", false)
        });
    }
  }
});
