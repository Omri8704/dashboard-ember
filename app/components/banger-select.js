import BangerTextInput from './banger-text-input';

export default BangerTextInput.extend({
  propertyToSet: null,
  displayErrors: null,
  disabled: false,

  actions: {
    updateProp(data) {
      if (this.get('updateSelected')) {
        this.get('updateSelected')(data);
      }
      else {
        if (this.get('propertyToSet')) {
          this.set('property', data[this.get('propertyToSet')]);
        }
        else {
          this.set('property', data);
        }
      }
    }
  }
});
