import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ["card-component"],
  classNameBindings: ["isNew"],
  isNew: Ember.computed.alias('ticketLevel.isNew'),
  savedStatus: Ember.computed("ticketLevel.isNew", function(){
    if (this.get("ticketLevel.isNew")) {
      return "not Saved"     
    } else {
      return "Saved"
    }
  }),
  actions: {
    submit() {
      this.sendAction("saveAction", this.get('ticketLevel'))
    },
    deleteAction() {
      this.sendAction("deleteAction", this.get('ticketLevel'))
    }
  }
});
