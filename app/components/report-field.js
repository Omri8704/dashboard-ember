import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  prettyFieldName: Ember.computed('field.field.name', function() {
    return (this.get('field.field.name') || '').replace(/_/g, " ")
  }),

  shouldShowDetails: Ember.computed('field.field.showDetails', function() {
    return this.get('field.field.showDetails') || false;
  }),

  hasFormatters: Ember.computed('field.field.availableFormatters.[]', function() {
    return this.get('field.formatters').length > 0
  }),

  availableFormatters: Ember.computed('field.field.availableFormatters.[]', function() {
    return this.get('field.formatters');
  }),

  selectedFormatter: Ember.computed('field.field.usedFormatters.[]', function() {
    return this.get('field.field.usedFormatter');
  }),

  actions: {
    showDetails() {
      this.toggleProperty('field.field.showDetails');
    },

    remove() {
      this.get('onRemoveField')(this.get('field'))
    },

    setCustomHeader(e) {
      this.get('onCustomHeader')(this.get("field"), e.target.value.trim())
    },

    handleSelectFormatter(formatter) {
      this.get("onSelectFormatter")(formatter, this.get("field"));
    }
  }
});
