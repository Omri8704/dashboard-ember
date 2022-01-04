import Component from "@ember/component";
import { computed, get, set } from "@ember/object";

export default Component.extend({
  classNames: ['btn-group'],
  ulClassName: 'amplo-dropdown',
  buttonClassNames: 'button button--secondary amplo-dropdown-toggle',
  placeholderText: 'Placeholder Text',
  selectedItem: null,
  dropdownOpen: false,
  isLoading: false,
  disabled: null,
  options: null,
  didInsertElement() {
    this._super(...arguments)
    $(window).on('click', this.outsideHandler.bind(this))
  },

  willDestroyElement() {
    this._super(...arguments)
    $(window).off('click')
  },

  outsideHandler(e) {
    const $element = get(this, 'element');
    const $target = $(e.target);
    const isInside = $target.closest($element).length == 1;
    if (!isInside) {
      set(this, 'dropdownOpen', false)
    }
  },

  click() {
    this.toggleProperty('dropdownOpen')
  },

  disableButton: computed('isLoading', 'disabled', function() {
    return get(this, 'isLoading') || get(this, 'disabled');
  }),

  actions: {
    selectItemAction(model) {
      get(this, 'onChange')(model);
      set(this, 'selectedItem', model);
    }
  }
});
