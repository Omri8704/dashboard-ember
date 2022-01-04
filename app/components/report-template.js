import Ember from 'ember';
import { inject } from "@ember/service";

export default Ember.Component.extend({
  store: inject(),
  settings: inject(),
  notify: inject(),

  init() {
    this._super(...arguments)

    if (!this.get('reportTemplate')) {
      this.set("reportTemplate", this.get('store').createRecord('report-template', {
        entity: this.get("settings.current_entity"),
        valueIds: []
      }))
    }
  },

  willDestroyElement() {
    const template = this.get('reportTemplate')
    const isNewAndNotInFlight = template.get('isNew') && !template.get('isSaving')

    if (isNewAndNotInFlight) {
      this.get('reportTemplate').deleteRecord()
    }
    else if (template.get('hasDirtyAttributes')){
      this.get('reportTemplate').rollbackAttributes()
    }
  },

  fields: Ember.computed('reportTemplate.valueIds.[]', 'reportTemplate.headers', 'reportTemplate.formatterIdsByValue', function() {
    const templateFormatters = this.get("reportTemplate.formatterIdsByValue");
    const formatters = this.get('store').peekAll('report-template-formatter');

    return this.get('reportTemplate.valueIds').map( (valueId, index) => {
      const field = this.get('store').peekRecord('report-template-value', valueId);
      const availableFormatters = field.get('availableFormatters');
      let usedFormatter;

      // Loop through fields and link field formatters
      Object.keys(templateFormatters).forEach(function(key) {
        const fieldVal = field.get("value");

        if(fieldVal === key) {
          usedFormatter = formatters.find(function(item) {
            return parseInt(item.id) === templateFormatters[fieldVal];
          });
        }
      });

      // Set usedFormatter on field to be used in report-field component select element
      field.set('usedFormatter', usedFormatter);

      return {
        field,
        formatters: formatters.filter(function(formatter) {
          const formatterId = parseInt(formatter.get('id'));
          return availableFormatters.includes(formatterId);
        }),
        header: this.get('reportTemplate.headers')[index]
      }
    })
  }),

  availableFields: Ember.computed('validFields.[]', 'reportTemplate.valueIds.[]', function() {
    return this.get('validFields').filter( field => {
      const alreadySelectedField = this.get('reportTemplate.valueIds').includes(field.get('id'))
      if (!alreadySelectedField) {
        return field
      }
    })
  }),

  fieldFormatters: Ember.computed('reportTemplate.formatterIdsByValue.{}', function() {
    return this.get('reportTemplate.formatterIdsByValue')
  }),

  actions: {
    createField(field) {
      if (field) {
        this.get("reportTemplate.valueIds").addObject(field.get('id'))
        this.get('reportTemplate.headers').addObject(field.get('name'))
      }
      else {
        this.get("notify").error('Please select a field')
      }
    },

    setCustomHeader(field, updatedHeader) {
      if (field.header === updatedHeader ) { return }
      const indexOfHeader = this.get('reportTemplate.headers').indexOf(field.header)
      const headers = this.get('reportTemplate.headers').map( (header, index) => {
        if (index === indexOfHeader) {
          return updatedHeader
        }
        else {
          return header
        }
      })
      this.set('reportTemplate.headers', headers)
    },

    reorderFields(fields, draggedItems) {
      const sortedFields = fields.reduce( (obj, current) => {
        obj.valueIds.push(current.field.get('id'))
        obj.headers.push(current.header)

        return obj
      }, {valueIds: [], headers: []})
      this.set('reportTemplate.valueIds', sortedFields.valueIds)
      this.set('reportTemplate.headers', sortedFields.headers)
    },

    selectFormatter(formatter, field) {
      let templateFieldFormatters = this.get('reportTemplate.formatterIdsByValue');
      if(formatter) {
        templateFieldFormatters[field.field.get('value')] = parseInt(formatter.get('id'));
      } else if (templateFieldFormatters[field.field.get('value')]) {
        delete templateFieldFormatters[field.field.get('value')];
      }
      this.set('reportTemplate.formatterIdsByValue', Object.assign({}, templateFieldFormatters));
    },

    removeField(field) {
      this.get('reportTemplate.valueIds').removeObject(field.field.id)
      this.get('reportTemplate.headers').removeObject(field.header)
    },

    save() {
      this.get('onSave')(this.get('reportTemplate'))
    },

    delete() {
      this.get('onDelete')(this.get('reportTemplate'))
    },

    showConfirmation() {
      this.toggleProperty('expandConfirmation');
    }
  }
});
