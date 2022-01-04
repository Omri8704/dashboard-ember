import Ember from 'ember';

const { 
  Component,
  inject,
  get,
  set
} = Ember

export default Component.extend({
  store: inject.service(),
  ticketLevel: null,
  customFieldTypes: null,

  resetErrors: false,

  customField: Ember.computed(function() {
    return this.get('store').createRecord('entity-custom-field', {
      storedWith: 'ticket'
    })
  }),

  customValue: Ember.computed(function() {
    return this.get('store').createRecord('entity-custom-value')
  }),

  customValues: Ember.A(),

  willDestroyElement() {
    if (this.get('customField.isNew')) {
      get(this, 'customField').deleteRecord()
    }
    if (this.get('customValue.isNew')) {
      get(this, 'customField.entityCustomValues').removeObject(get(this, 'customValue'))
      get(this, 'customValue').deleteRecord()
    }
  },

  resetState() {
    const customField = get(this, 'store').createRecord('entity-custom-field', {
      storedWith: 'ticket'
    })

    set(this, 'customField', customField)
    set(this, 'customFieldType', null)
    set(this, 'canShowFeedback', false)
    set(this, 'customValue', get(this, 'store').createRecord('entity-custom-value'))
    set(this, 'customValues', Ember.A())

    this.toggleProperty('resetErrors')
  },

  actions: {
    toggleDropdown() {
      this.toggleProperty('toggleDropdown')
    },

    addCustomField() {
      set(this, 'savingCustomField', true)
      set(this, 'canShowFeedback', true)

      get(this, 'customValues').forEach( (customValue) => {
        customValue.validate().then( ({ validations }) => {
          if (validations.get('isValid')) {
            get(this, 'customField.entityCustomValues').addObject(customValue)
          }
        })
      })

      get(this, 'customField').validate().then( ({ validations }) => {
        if (get(validations, 'isValid')) {
          const addCustomFieldAction = get(this, 'addCustomField')
          const ticketLevel = get(this, 'ticketLevel')
          const customField = get(this, 'customField')

          addCustomFieldAction(ticketLevel, customField)
            .then( () => {
              set(this, 'savingCustomField', false)
              this.resetState()
            })
            .catch( () => {
              set(this, 'savingCustomField', false)
            })
        }
      })
      .catch( () => {
        set(this, 'savingCustomField', false)
      })
    },

    addCustomValue() {
      get(this, 'customValue').validate().then( ({ validations }) => {
        if (get(validations, 'isValid')) {
          get(this, 'customValues').addObject(get(this, 'customValue'))

          set(this, 'customValue', get(this, 'store').createRecord('entity-custom-value'))
          this.toggleProperty('resetErrors')
        }
      }).catch( () => null)
    },

    removeCustomValue(customValue) {
      get(this, 'customValues').removeObject(customValue)
      customValue.destroyRecord()
    },

    customFieldTypeSelected(type) {
      this.set('customFieldType', type)

      if (type.toLowerCase() === 'checkbox') { type = 'boolean' }
      if (type.toLowerCase() === 'free text') { type = 'input'}
      if (type.toLowerCase() === 'dropdown') { type = 'select'}
      this.set('customField.htmlControl', type.toLowerCase())
      this.set('customValue', this.get('store').createRecord('entity-custom-value'))
      this.set('customValues', Ember.A())
      this.toggleProperty('resetErrors')
    }
  }
});
