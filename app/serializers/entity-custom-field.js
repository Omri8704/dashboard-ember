import DS from 'ember-data';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    entityCustomValues: {
      embedded: "always"
    },
    ticketLevels: {
      serialize: 'ids'
    }
  }
});
