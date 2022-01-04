import Ember from 'ember';

const {
  Component,
  observer,
  computed
} = Ember

export default Component.extend({
  campaignFilter: null,
  emailFilterOptions: null,
  selectedFilter: null,
  previousSavedFilter: null,
  model: null,

  init() {
    this._super(...arguments);
    if (this.get('previousSavedFilter')) {
      this.set('selectedFilter', this.get('emailFilter'));
    }
  },

  _resetFilter: observer('selectedFilter', function() {
    this.toggleProperty('resetFilter');
  }),

  selectedFilterOptions: computed('selectedFilter', {
    get() {
      return this.get('selectedFilter.options');
    }
  }),

  actions: {
    filterSelected(filter) {
      // if previously saved, update the attributes and delete the value from the model
      if (this.get('emailFilter.previousSavedFilter')) {
        this.get('removeFilterAttr')(this.get('selectedFilter'));
        let updatedFilter = Object.assign({}, filter, this.get('emailFilter'));
        updatedFilter.propName = filter.propName;
        updatedFilter.value = null;

        this.set('selectedFilter', updatedFilter);
      }
      else {
        let updatedFilter = Object.assign({}, filter, this.get('emailFilter'));

        this.set('selectedFilter', updatedFilter);
      }

    },
    filterOptionSelected(filterOption) {
      if (this.get('selectedFilter')) {
        this.get('filterOptionSelected')(this.get('selectedFilter'), filterOption);
        this.get('updateFilter')(this.get('selectedFilter'));
      }
      else {
        throw new Error('Error in email-filter component\'s filterOptionsSelected action');
      }
    }
  }
});
