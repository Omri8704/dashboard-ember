import DS from 'ember-data';

export default DS.Model.extend({
  attendee: DS.belongsTo('user'),
  purchaser: DS.belongsTo('user'),
  event: DS.belongsTo('event'),
  createdAt: DS.attr('string'),
  group: DS.attr('number'),
  ticketLevel: DS.attr('string'),
  refunded: DS.attr('boolean'),

  refund() {
    let adapter = this.store.adapterFor('ticket');
    let baseUrl = adapter.buildURL('ticket', this.get('id'), this._createSnapshot(), 'PUT');
    return adapter.ajax( `${baseUrl}/refund`, 'PUT', {}  );
  },

  refundGroup() {
    let adapter = this.store.adapterFor('ticket');
    let baseUrl = adapter.buildURL('ticket', this.get('id'), this._createSnapshot(), 'PUT');
    return adapter.ajax( `${baseUrl}/refund_group`, 'PUT', {}  );
  },
});
