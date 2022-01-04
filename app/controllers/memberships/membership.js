import Ember from 'ember';

const {
  Controller,
  inject,
  computed
} = Ember

export default Controller.extend({
  notify: inject.service('notify'),
  settings: inject.service(),
  queryParams: ['offset','limit'],
  limit: 10,
  offset: 0,
  count: computed('model', function(){
    return this.get("model.meta.count")
  }),
  
  userMemberships: computed.alias('model'),

  refunding: false,
  refunding_membership: null,
  refundable_amount: null,
  refunding_membership_cancel: false,
  refunding_membership_amount: null,
  
  sortedUserMemberships: computed.sort('userMemberships', function(a) {
    if (a.status == "active") {
      return 1
    }
    else if (a.status == "refunded") {
      return -1
    } 
    else {
      return 0
    }
  }),

  actions: {

    changeOffset(offset) {
      this.set("offset", offset)
    },

    refundMembership( user_membership ){
      let refundable_amount = user_membership.get("dues")
      if( user_membership.get("amount") && user_membership.get("amount") < refundable_amount ){
        refundable_amount = user_membership.get("amount")
      }

      this.set("refunding_membership_cancel", false)
      this.set("refunding_membership_amount", refundable_amount )
      this.set("refundable_amount", refundable_amount )
      this.set("refunding_membership", user_membership)
    },

    submitRefund(){
      let membership = this.get("refunding_membership")

      if( membership.get("dues") < this.get("refunding_membership_amount") || this.get("refundable_amount") < this.get("refunding_membership_amount") ){
        this.get('notify').alert('Error: You can not refund more than the remaining membership cost')
        return
      }else if( this.get("refunding_membership_amount") < 0 ){
        this.get('notify').alert('Error: You can not refund a negative amount')
        return
      }else if( this.get("refunding_membership_amount") == 0 && !this.get("refunding_membership_cancel") ){
        this.get('notify').alert('Error: You must be refunding and/or cancelling to move forward')
        return
      }

      this.set("refunding", true)

      membership.refund({
        "amount": this.get("refunding_membership_amount"),
        "cancel": this.get("refunding_membership_cancel")
      }).then( () => {
        membership.reload()
        this.get('notify').success('Membership Refunded/Cancelled!')
        this.send("closeDialog")
      }).catch( (err) => {
        let msg = (err.errors && err.errors[0]) ? err.errors[0].detail : err.message
        this.get('notify').alert('Error: ' + msg)
      })
    },

    closeDialog(){
      this.set("refunding", false)
      this.set("refundable_amount", null )
      this.set("refunding_membership", null)
      this.set("refunding_membership_amount", null)
      this.set("refunding_membership_cancel", null)
    }
  }
});
