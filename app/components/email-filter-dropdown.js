import Ember from 'ember';
import AmploDropdown from './amplo-dropdown';
import HumanizeString from '../utils/humanize-string';

export default AmploDropdown.extend({
  classNames: ['btn-group'],
  ulClassName: 'amplo-dropdown',
  selectedText: 'Select Filter',

  _resetFilter: Ember.observer('resetFilter', function() {
    this.set('selectedText', this.get('placeHolder'));
  }),

  actions: {
    filterSelected(filter) {
      this.set('selectedText', HumanizeString(filter.name));

      if (this.get('filterSelected')) {
        this.get('filterSelected')(filter);
      }

      this.set('selectedFilter', filter);
    },
    filterOptionSelected(filterOption) {
      this.set('selectedText', HumanizeString(filterOption));
      this.set('selectedFilter', filterOption);

      if (this.get('filterOptionSelected')) {
        this.get('filterOptionSelected')(filterOption);
      }
    }
  }
});
