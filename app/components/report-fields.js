import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'table',
  // className: 'table--container',
  classNames: ['table--container', 'enumerate-table'],

  init() {
    this._super(...arguments)

    this.set('usedFields', [])
    this.set('createdFields', [])
  },

  remainingFieldNames: Ember.computed('availableFields.[]', 'usedFields.[]', function() {
    return this.get('availableFields').filter( validField => {
      return !this.get('usedFields').includes(validField.get('id'))
    })
  }),

  hasSelectedField: Ember.computed('selectedField', function() {
    return (this.get('selectedField') === undefined) ? true : false;
  }),

  actions: {
    reorderItems(itemModels, draggedItems) {
      this.get('onReorderFields')(itemModels, draggedItems)
    },

    selectField(field) {
      this.set('selectedField', field)
    },

    handleCreateField() {
      this.get('usedFields').addObject(this.get('selectedField.id'))
      this.get('onCreateField')(this.get('selectedField'))

      if (this.get('remainingFieldNames.length') > 0) {
        this.set('selectedField', this.get('remainingFieldNames')[0])
      }
    },

    handleRemoveField(field) {
      this.get('onRemoveField')(field)
      this.set('field', this.get('remainingFieldNames')[0])
    },

    handleCustomHeader(field, header) {
      this.get('onCustomHeader')(field, header)
    },

    handleSelectFormatter(formatter, field) {
      this.get("onSelectFormatter")(formatter, field);
    }
  }
});
