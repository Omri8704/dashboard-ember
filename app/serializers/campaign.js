import DS from 'ember-data';
import ApplicationSerializer from './application';
export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    causes: {
      embedded: "always",
      nestedRails: true
    },
    appeals: {
      embedded: "always"
    },
    initiative: {
      embedded: "always"
    },
    donationLevels: {
      embedded: "always",
      nestedRails: true
    },
    campaignImages: {
      embedded: "always"
    },
    campaignVideos: {
      embedded: "always"
    }
  },

});
