import Ember from 'ember';
import DS from 'ember-data';
const { attr } = DS;

export default DS.Model.extend({
  mailings: DS.hasMany('mailing', {aync: true}),
  name: attr('string'),
  subscribedUserCount: attr('number'),
  unsubscribedUserCount: attr('number'),

  unsentMailings: Ember.computed('mailings', function() {
    return this.get('mailings').map( (mailing, index, e) => {
      return ( "sent" !== mailing.get("status") )
    })
  }),



  //this is for file uploading
  //this uses form data.
  bulkAssign( filter, user ) {
    let adapter = this.store.adapterFor('user-segment');
    let baseUrl = adapter.buildURL('user-segment',
                                   this.get('id'),
                                   this._createSnapshot(),
                                   'PUT')

    return adapter.ajax(
      `${baseUrl}/bulk_assign`,
      'PUT',
      {  data: { filter: filter.serialize() } }
    );
  },

  //this is for file uploading
  //this uses form data.
  bulkUpload(file) {
    let adapter = this.store.adapterFor('user-segment');
    let baseUrl = adapter.buildURL('user-segment',
                                   this.get('id'),
                                   this._createSnapshot(),
                                   'PUT')
    const formData = new FormData()
    formData.append('name', 'user_data')
    formData.append('file', file)

    return adapter.ajax(
      `${baseUrl}/bulk_upload`,
      'PUT',
      { formData: true, data: formData }
    );
  },

  bulkUploadS3(file, use_new) {
    let adapter = this.store.adapterFor('user-segment');
    let baseUrl = adapter.buildURL('user-segment',
                                   this.get('id'),
                                   this._createSnapshot(),
                                   'PUT')
    return adapter.ajax(`${baseUrl}/presigned_upload_url`, 'POST', { data: {filename: file.name }})
                  .then(function(response) {
                    return Ember.$.ajax({
                      url: response.upload_url,
                      type: "PUT",
                      processData: false,
                      data:  file
                    }).then(function() {
                      return adapter.ajax(`${baseUrl}/confirm_upload`, 'PUT', {data: {uploaded_file_id: response.id, use_new: use_new}});
                    });
                  });
  }

});
