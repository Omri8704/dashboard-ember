import DS from 'ember-data';

export default DS.Model.extend({
  mailing: DS.belongsTo('mailing', { async: false }),
  entity: DS.belongsTo('entity'),

  donated:      DS.attr('string'),
  opens:        DS.attr('string'),
  clicks:       DS.attr('string'),

  contribute_button:   DS.attr('string'),
  donate_button:       DS.attr('string'),
  share_button:        DS.attr('string'),
  carousel:     DS.attr('string'),
  facebook:     DS.attr('string'),
  email:        DS.attr('string'),
  twitter:      DS.attr('string'),
  sms:          DS.attr('string'),

  // Event Only Attributes
  registered:   DS.attr('string'),
  ticket_level: DS.attr('string'),


  any_all: DS.attr('string', {
    defaultValue: 'any'
  }),

  scope: DS.attr('string', {
    defaultValue: 'entity'
  }),

  tags: DS.attr(),

  start_date: DS.attr('string'),
  end_date: DS.attr('string'),

  reset: function(){
    const meta_fields = ['id', '_id', 'mailing', 'entity', 'any_all', 'scope']
    const fields = this.toJSON() // This is the best way I found to get an array of the model attributes w/o the other props/funcs/etc

    for( var field in fields ){
      if( !meta_fields.includes( field ) ){
        this.set( field, null )
      }
    }
  },
});
