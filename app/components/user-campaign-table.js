import Ember from 'ember';

const {
  inject
} = Ember;

export default Ember.Component.extend({
  participants: null,
  user: null,
  notify: inject.service(),

  goodEffort: Ember.A(),
  averageEffort: Ember.A(),
  poorEffort: Ember.A(),

  init() {
    this._super(...arguments);
    this.clearParticipants();
    this.updateParticipants(this.get('participants'));
  },

  filterByText(participants, searchText) {
    searchText = searchText.toLowerCase() || '';

    return participants.filter( (participant) => {
      let firstName = participant.get('firstName').toLowerCase();
      let lastName = participant.get('lastName').toLowerCase();
      let fullName = firstName + ' ' + lastName;

      let nameOptions = [
        firstName,
        lastName,
        fullName
      ];

      let filteredNames = nameOptions.filter( (name) => {
        return name.indexOf(searchText) > -1;
      })

      return filteredNames.length > 0;
    })
  },

  clearParticipants() {
    this.set('goodEffort', Ember.A());
    this.set('averageEffort', Ember.A());
    this.set('poorEffort', Ember.A());
  },

  updateParticipants(participants) {
    participants.map( (participant) => {
      // dynamically add to the different arrays, check to see if valid effort string in get
      let effortLevel = participant.get('effort') + 'Effort';

      // need to check if participant was already added, weird bug if it isn't there
      if (this.get(effortLevel) && !this.get(effortLevel).includes(participant)) {
        this.get(effortLevel).push(participant);
      }
    })
  },

  actions: {
    searchByText(searchText) {
      let filteredParticipants = this.filterByText(this.get('participants'), searchText);

      this.clearParticipants();
      this.updateParticipants(filteredParticipants);
    },

    toggleEmail() {
      this.toggleProperty("showEmail");
    },

    sendEmail(){
      const self = this
      let participants = this.get('participants')
      let emailBody = this.get('emailBody')
      let user = this.get("user")

      if( participants.get("length") > 0 && emailBody && user && user.membership.get("isLeader") ){
        this.set("sendingEmail", true)
        this.user.membership.sendLeaderEmail({
          emailBody: this.emailBody,
          participant_ids: participants.map( (p) => { return p.id; })
        }).then( () => {
          self.set("showEmail", false)
          self.set("sendingEmail", false)
          self.set("emailBody", null)
          self.get("notify").success("Email successfully sent!")
        }).catch( (reason) => {
          if( reason ) self.set("reason", reason.errors.base);
          self.set("sendingEmail", false)
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
