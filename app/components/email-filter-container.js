import Ember from 'ember';

const { get } = Ember

export default Ember.Component.extend({
  emailFilters: null,

  _generateId() {
    return Date.now();
  },

  init() {
    this._super(...arguments)

    const isPrepopulated = this.get('emailFilters').find( (filter) => filter.previousSavedFilter)
    // if previously saved filter, add on an empty object onto the array
    if (isPrepopulated) {
      this.get('emailFilters').pushObject(
        Ember.Object.create({id: this._generateId()})
      );
    }
  },

  updateEmailFilterOtions(emailFilterOptions, selectedFilterOption) {
    return emailFilterOptions.filter( (filterOption) => {
      return filterOption.id !== selectedFilterOption.id
    })
  },

  actions: {
    createFilter() {
      this.get('emailFilters').pushObject(
        Ember.Object.create({id: this._generateId()})
      );
    },

    updateFilter(filter) {
      let foundFilter = this.get('emailFilters').find( (item) => {
        return item.id === filter.id;
      });
      let foundFilterIndex = this.get('emailFilters').indexOf(foundFilter);
      let filterObject = this.get('emailFilters')[foundFilterIndex];

      filterObject.setProperties(filter);
    },

    deleteFilter(emailFilter) {
      let updatedFilters = this.get('emailFilters').filter( (item) => {
        return item.id !== emailFilter.id
      });

      if (updatedFilters.length === 0) {
        updatedFilters.pushObject({id: this._generateId()});
      }

      this.set('emailFilters', updatedFilters);
      this.sendAction('removeFilterAttr', emailFilter.propName);
    },

    removeFilterAttr(emailFilter) {
      this.sendAction('removeFilterAttr', emailFilter.propName);
    },

    filterOptionSelected(selectedFilter, filterOption) {
      if (selectedFilter) {
        this.set('selectedFilter', selectedFilter);
        this.send('createFilter')
        this.sendAction('filterOptionSelected', selectedFilter, filterOption);

        const updatedFilters = this.updateEmailFilterOtions(
          get(this, 'emailFilterOptions'),
          selectedFilter
        )

        this.set('emailFilterOptions', updatedFilters)
      }
      else {
        throw new Error('Error in email-filter component\'s filterOptionsSelected action');
      }
    }
  }
});
