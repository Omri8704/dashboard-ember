import Ember from 'ember';

const { get, set } = Ember

export default Ember.Controller.extend({
  settings: Ember.inject.service(),
  notify: Ember.inject.service('notify'),
  event: Ember.computed.alias('model'),
  ticketLevels: Ember.computed.alias('event.ticketLevels'),
  canShowErrors: false,


  init(){
    this._super(...arguments);
    set( this, "causes", this.store.findAll("cause") )
    set( this, "existingCustomFields", this.store.findAll("entity-custom-field") )
  },

  filteredCustomFields: Ember.computed('existingCustomFields', function(){
    return this.get("existingCustomFields").filter( function(row){
      return ( row.get("id") && row.get("id").length > 0 )
    })
  }),

  toolTipText: `Ticket levels allow you to specify different tickets and benefits.
    In the Ticket Level description you are able to include what comes with the
    purchase of the ticket. Registrants can add multiple tickets to
    their purchase`,

  customFieldTypes: ['Dropdown', 'Free Text', 'Checkbox'],

  actions: {

    addExistingCustomField(ticketLevel, customField){
      ticketLevel.get('entityCustomFields').addObject(customField)
      get(this, 'notify').success('Custom field added successfully!')
    },

    addCustomField(ticketLevel, customField) {
      customField.set('entity', this.get('settings.current_entity'))
      ticketLevel.get('entityCustomFields').addObject(customField)

      return customField.save().then( () => {
        get(this, 'notify').success('Custom field saved successfully!')
        //TODO temp for embedded records bug where after saving ember data doesn't reconcile
        // the new record with an id and the old record without the id
        // https://github.com/emberjs/data/issues/1829
        get(this, 'store').peekAll('entity-custom-value').forEach( (customValue) => {
          if (!get(customValue, 'id')) {
            customValue.deleteRecord()
          }
        })
      })
    },

    addTicketLevel(category) {
      if (category === 'free') {
        this.get('store').createRecord('ticket-level', {
          event: this.get('event'),
          category: category,
          amount: 0
        });
      }
      else {
        this.get('store').createRecord('ticket-level', {
          event: this.get('event'),
          category: category
        });
      }
    },

    removeTicketLevel(ticket) {
      if (this.get('ticketLevels.length') > 1) {
        if (ticket.get('isNew')) {
          ticket.deleteRecord()
        }
        else {
          ticket.destroyRecord()
        }
      }
      else {
        this.get('notify').warning('You must have at least one ticket level for an event')
      }
    },

    saveTickets() {
      set(this, 'canShowErrors', true)
      set(this, 'savingTickets', true)

      const validateLevels = this.get('ticketLevels').reduce( (array, ticketLevel) => {
        array.push(ticketLevel.validate())
        return array
      }, [])

      Ember.RSVP.all(validateLevels)
        .then( (models) => {
          const hasError = models.find( (model) => !model.validations.get('isValid'))

          if (!hasError) {
            const ticketPromises = this.get('ticketLevels').reduce( (array, ticketLevel) => {
              if (ticketLevel.get('hasDirtyAttributes')) {
                array.push(ticketLevel.save())
              }

              return array
            }, [])

            Ember.RSVP.all(ticketPromises).then( () => {
              set(this, 'savingTickets', false)
              this.transitionToRoute('events.event.confirmation')
            })
            .catch( () => {
              set(this, 'savingTickets', false)
            })
          }
          else {
            this.set('savingTickets', false)
          }
        })
        .catch( () => {
          set(this, 'ticketLevelSaving', false)
        })
    },

    cancelTickets() {
      this.transitionToRoute('events')
    },

    saveCustomFields(ticket) {
      set(this, 'savingTicketLevel', true)

      return ticket.validate().then( ({ model, validations }) => {
        if (validations.get('isValid')) {
          return model.save().then( (ticket) => {
            return ticket.get('entityCustomFields').then( (customFields) => {
              const customFieldSave = customFields.reduce( (array, customField) => {
                customField.get('ticketLevels').addObject(ticket)
                customField.set('entity', this.get('settings.current_entity'))
                array.push(customField.save())

                return array
              }, [])

              return Ember.RSVP.all(customFieldSave).then( () => {
                set(this, 'savingTicketLevel', false)
                get(this, 'notify').success("Ticket level saved successfully!")
              }).catch( () => {
                set(this, 'savingTicketLevel', false)
              })
            })
          })
          .catch( () => {
            set(this, 'savingTicketLevel', false)
          })
        }
      })
      .catch( () => {
        set(this, 'savingTicketLevel', false)
      })
    },

    deleteCustomField(customField, ticket) {
      customField.get('ticketLevels').removeObject(ticket)
      customField.save().then( () => {
        get(this, 'notify').success('Successfully removed custom field!')
      })
    },
    toggleDropdown() {
      this.toggleProperty('toggleDropdown')
    }
  }
});
