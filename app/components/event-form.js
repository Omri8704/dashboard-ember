import Ember from 'ember';

const {
  Component,
  inject
} = Ember

export default Component.extend({
  settings: inject.service(),
  categories: ['career', 'lectures', 'member', 'social', 'sport'],

  toolTipText: 'If checked, prevent people from being able to purchase more tickets' +
               ' than the event capacity',
  actions: {
    startDate(date) {
      this.get('startDateAction')(date)
    },
    endDate(date) {
      this.get('endDateAction')(date)
    },
    registrationStart(date) {
      this.get('registrationStart')(date)
    },
    registrationEnd(date) {
      this.get('registrationEnd')(date)
    },
    submit() {
      this.get('submitAction')()
    },
    handleFileUpload(file, base64) {
      this.get('fileUpload')(file, base64)
    }
  }
});
