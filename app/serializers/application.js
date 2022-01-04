import { ActiveModelSerializer } from 'active-model-adapter';
export default ActiveModelSerializer.extend({
  // this adds the _attributes to the key if the embedded records mixin is used
  // and the attribute has nestedRails set to true
  // ie attrs: {donationLevels: nestedRails: true, embedded: always}
  // will change the donationLevels key to "donation_levels_attributes"
  // makes it easier to update an embedded rails model, expects ${property_name}_attributes
  attrs: {},
  keyForAttribute(key, method) {
    if (method === "serialize" && this.attrs[key]){
      if (this.attrs[key].nestedRails) {
        return key.underscore() + "_attributes"
      }
    }
    return this._super(...arguments)
  }
});
