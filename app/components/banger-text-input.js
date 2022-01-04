import Ember from 'ember';

export default Ember.Component.extend({
  type: 'text',
  classNames: ['form-group'],
  classNameBindings: ['hasFeedback', 'hasError', 'hasSuccess'],
  labelClass: 'control-label',

  // input group used by bootstrap to add content like $, @ to left side of an input
  inputGroupBeforeContent: null,

  // custom inner addon to be able to add glyphicons to left side of an input
  innerAddonHtml: null,

  defaultValue: null,
  errors: [],
  validation_errors: [],
  hasError: false,
  hasFeedback: false,
  hasSuccess: false,

  disabled: false,

  baseInput: Ember.computed('inputGroupBeforeContent', 'innerAddonHtml', function() {
    return !(this.get('inputGroupBeforeContent') || this.get('innerAddonHtml'))
  }),

  _classNames: Ember.computed("class", function(){
    if (this.get('class')) {
      return `form-control ${this.get("class")}`
    }
    return 'form-control'
  }),

  observeFeedback: Ember.observer('errors.[]', 'validation_errors.[]', 'hasFeedback', function() {
    const hasErrors = this.get('errors') && this.get('errors').length > 0;
    const hasValidationErrors = this.get("validation_errors") && this.get('validation_errors').length > 0;

    if ((hasErrors || hasValidationErrors) && this.get('hasFeedback')) {
      this.set("hasSuccess", !hasErrors);
      this.set("hasError", hasErrors);
    }
  }),

  // trigger show feedback when hasFeedback gets toggled to true (e.g. by a submit action)
  showFeedback: Ember.computed('errors.[]', 'validation_errors.[]', 'hasFeedback', 'canShowFeedback', function() {
    const hasErrors = this.get('errors') && this.get('errors').length > 0;
    const hasValidationErrors = this.get("validation_errors") && this.get('validation_errors').length > 0;

    // if errors and submit has been triggered show them, or if the component itself has been touched
    return ((hasErrors || hasValidationErrors) && this.get('hasFeedback')) || this.get('canShowFeedback');
  }),

  _resetErrorState: Ember.observer('resetErrors', function() {
    this.clearState()
  }),

  clearState() {
    this.set('hasSuccess', false)
    this.set('hasError', false)
    this.set('hasFeedback', false)
    this.set('canShowFeedback', false)
  },

  setErrors() {
    const hasErrors = this.get('errors') && this.get("errors").length > 0;
    const hasValidationErrors = this.get("validation_errors") && this.get('validation_errors').length > 0;
    this.set("hasSuccess", !(hasErrors || hasValidationErrors));
    this.set("hasError", (hasErrors || hasValidationErrors));
  },

  didReceiveAttrs() {
    if (!this.get('property') && this.get('defaultValue')) {
      this.set('_defaultValue', this.get('defaultValue'))
    }
  },

  actions: {
    updateProp(val) {
      this.send('showFeedbackAction')

      this.set('_defaultValue', null)
      if (this.get('update')) {
        this.get('update')(val)
      }
      else {
        this.set('property', val)
      }
    },

    showFeedbackAction() {
      this.set("hasFeedback", true)
      this.set("canShowFeedback", true)
      this.setErrors();
    },
    updateFeedback() {
      this.setErrors();
    }
  }
});
