import Ember from 'ember';
import request from '../../utils/ajax-promise'
import config from '../../config/environment';

const {
  Controller,
  computed,
  inject
} = Ember

export default Controller.extend({
  event: computed.alias('model'),
  settings: inject.service(),
  notify: inject.service(),
  onViewRoute: computed('settings.currentPath', function() {
    return (this.get("settings.currentPath").includes("view"))
  }),
  actions: {
    saveEvent() {
      this.get('event').save().then( () => {
        this.get('notify').success('Successfully Saved Event.')
      }).catch( () => {
        this.get('notify').alert('Error Saving Event.')
      })
    },

    runReport() {
      request({
        url: `${config.host}/api/reports`,
        data: {
          rep_type: 'event',
          beneficiaries: [`gid://amplo/Event/${this.get('event.id')}`]
        }
      }).then( () =>
        this.get('notify').success('Email will be sent shortly!')
      ).catch( (err) => {
        this.get('notify').alert({
          html: `
            <div>Error running report,
            if the problems persits please email
            <a href="support@amploadvance.com">support@amploadvance.com</a>
            </div>`
        })
      })
    }

  }
});
