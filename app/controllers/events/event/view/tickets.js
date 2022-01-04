import Ember from 'ember';

const { Controller, inject, get, computed, computed: { alias } } = Ember

export default Controller.extend({
  settings: inject.service(),
  notify: inject.service('notify'),
  tickets: alias('model'),
  queryParams: ['limit', 'offset'],
  limit: 10,
  offset: 0,

  count: computed('tickets', function(){
    return get(this, 'tickets.meta.count')
  }),

  actions: {
    changeOffset(offset){
      this.set('offset', offset)
    },

    refundTicket(ticket){
      if( confirm("Refund this Ticket?") ) {
        ticket.refund().then( (resp) => {
          ticket.reload();
          this.get('notify').success('Ticket successfully refunded!')
        }).catch( (err, x) => {
          let msg = (err.errors && err.errors[0]) ? err.errors[0].detail : err.message
          this.get('notify').alert('Error: ' + msg)
        });
      }
    },

    refundTicketGroup(ticket){
      if( confirm(`Refund the Ticket Group #${ticket.get('group')}`) ) {
        ticket.refundGroup().then( (resp) => {
          let group = ticket.get("group")
          this.get("tickets").forEach((t, index) => {
            if( t.get("group") === group ){ t.reload(); }
          })
          self.get('notify').success('Ticket Group successfully refunded!')
        }).catch( (err) => {
          let msg = (err.errors && err.errors[0]) ? err.errors[0].detail : err.message
          this.get('notify').alert('Error: ' + msg )
        })
      }
    }
  }
});
