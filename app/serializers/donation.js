import DS from 'ember-data';
import ApplicationSerializer from './application';
export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    user: {
      embedded: "always"
    },
    causes: {
      embedded: "always"
    }
  },
  // serializing the causes into a json object that looks like this:
  // causes_allocation_hash: {cause.id: cause.percent}
  // this is so the backend can parse the percentage of the donation to 
  // give to the cause
  serializeHasMany: function(snapshot, json, relationship) {
    const key = relationship.key;
    if (key !== 'causes') {
      this._super(snapshot, json, relationship);
      return;
    } else {
      const hasManyRecords = snapshot.hasMany(key);
      if (hasManyRecords) {
        const causes = hasManyRecords.reduce(function(obj, item) {
          obj[item.id] = item.serialize().percent
          return obj
        }, {});
        json['causes_allocation_hash'] = JSON.stringify(causes);
        return json;
      }
    }
  }
});
