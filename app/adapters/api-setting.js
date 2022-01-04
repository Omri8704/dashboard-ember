import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  updateRecord(store, type, snapshot) {

    var data = {};
    var serializer = store.serializerFor(type.modelName);

    serializer.serializeIntoHash(data, type, snapshot);

    var id = snapshot.id;
    var url = this.buildURL(type.modelName, id, snapshot, 'updateRecord');

    if (snapshot.adapterOptions && snapshot.adapterOptions.generateToken) {
      data.generate_token = true
    }
    return this.ajax(url, "PUT", { data: data });
  }

});
