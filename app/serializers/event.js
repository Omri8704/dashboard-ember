import DS from 'ember-data';
import Application from './application'

const { EmbeddedRecordsMixin} = DS

export default Application.extend(EmbeddedRecordsMixin, {
  attrs: {
    ticketLevels: {
      deserialize: "records"
    },
    initiative: {
      embedded: "always"
    },
    appeals: {
      serialize: 'ids',
      embedded: "always"
    }
  }

});
