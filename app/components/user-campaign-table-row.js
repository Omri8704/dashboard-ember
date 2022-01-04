import Ember from 'ember';

const {
  inject
} = Ember;

export default Ember.Component.extend({
  tagName:'',
  participant: null,
  showEmail: false,
  canEmail: false,
  rowClass: '',
  user: null,
  emailBody: '',
  notify: inject.service(),

  actions: {
    toggleEmail() {
      this.toggleProperty("showEmail");
    },

    sendEmail(){
      const self = this;
      if( this.participant && this.emailBody && this.user && this.user.membership.get("isLeader") ){
        this.set("sendingEmail", true)
        this.user.membership.sendLeaderEmail({ emailBody: this.emailBody, participant_ids: [ this.participant.id ] }).then( () => {
          this.set("showEmail", false)
          this.set("sendingEmail", false)
          self.set("emailBody", null)
          self.get("notify").success("Email successfully sent!")
        }).catch( (reason) => {
          if( reason ) this.set("reason", reason.errors.base);
          this.set("sendingEmail", false)
          self.get("notify").alert("Email not sent.")
        });
      }else{
        this.get("notify").alert(
          this.user.membership.get("isLeader") ? "Email body and Participants are required" : "You must be a leader to do this"
        )
      }
    }
  }
});
