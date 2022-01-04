import DS from 'ember-data';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    users: { serialize: 'id' },
    filter: {embedded: "always"}
  },
  // prepare for the server
  serializeBelongsTo(snapshot, json, relationship) {
    let attr = relationship.key;

    if (attr === "filter") {
      this._super(...arguments);
      this._serializeFilter(snapshot, json, relationship);
    }else{
      this._super(...arguments);
    }

  },

  _serializeFilter(snapshot, json) {
    const embeddedSnapshot = snapshot.belongsTo("filter");
    let data;
    if (embeddedSnapshot) {
      data = embeddedSnapshot.serialize({ includeId: true });
    }
    json['filter_attributes'] = data;
  },

  // // getting back from the server
  // normalize(typeClass, hash, prop) {
  //   hash.filter = hash.filters[0]
  //   delete hash.filters
  //   return this._super(typeClass, hash, prop);
  // }

});
