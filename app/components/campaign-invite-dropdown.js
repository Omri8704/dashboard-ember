import Component from "@ember/component";
import {
  get,
  set
} from "@ember/object";
import EmberObject from "@ember/object";
import {
  inject
} from "@ember/service";

export default Component.extend({
  init() {
    this._super(...arguments);
    set(this, "user", get(this, "store").createRecord("user"))
    if (!this.get("session.current_user.entity_admin")) {
      set(this, "roles", 'participant')
    }
  },
  errors: EmberObject.create(),
  store: inject(),
  session: inject(),
  typeOptions: ["leader", "participant"],
  typeOptionsLeader: ["participant"],
  roles: "leader",

  inviteUser(user) {
    user
      .invite_leader({
        campaign_id: get(this, "campaign.id"),
        roles: get(this, "roles")
      })
      .then(() => {
        const name = get(user, "first_name")
        set(this, "user", get(this, "store").createRecord("user"))
        set(this, "success", `Invitation sent to ${name}`)
        setTimeout(() => {
          set(this, 'success', null)
        }, 6000)
      })
  },

  actions: {
    inviteUser() {
      const user = get(this, 'user')
      if (get(user, 'validations.isValid')) {
        // reset the errors if valid
        set(this, 'errors', EmberObject.create())
        get(this, 'store')
          .query('user', {
            email_query: this.get("user.email")
          })
          .then((users) => {
            if (users.get('length') >= 1) {
              this.inviteUser(users.get("firstObject"))
            } else {
              // create user and invite if they dont already exist in the database
              user.save().then(() => {
                this.inviteUser(user);
              })
            }
          })
      } else {
        user.get("validations.errors").forEach((error, i) => {
          this.set('errors.' + error.get("attribute"), [error.get("message")])
        });
      }
    }
  }
});
