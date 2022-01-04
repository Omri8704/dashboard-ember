import BaseValidator from 'ember-cp-validations/validators/base';
import Ember from 'ember'

const { get } = Ember

const ConditionalDonType = BaseValidator.extend({
  validate(value, options = {}, model) {
    if (!options.hasOwnProperty('donType')) {
      throw new Error('Must supply an attribute donType to check don_type against')
    }

    const donType = options.donType

    if (get(model, 'don_type') !== donType) {
      return true
    }

    if (get(model, 'don_type') === donType && Ember.isPresent(value)) {
      return true
    }
    else {
      return "This field can't be blank"
    }
  }
});

ConditionalDonType.reopenClass({
  /**
   * Define attribute specific dependent keys for your validator
   *
   * [
   * 	`model.array.@each.${attribute}` --> Dependent is created on the model's context
   * 	`${attribute}.isValid` --> Dependent is created on the `model.validations.attrs` context
   * ]
   *
   * @param {String}  attribute   The attribute being evaluated
   * @param {Unknown} options     Options passed into your validator
   * @return {Array}
   */
  getDependentsFor(/* attribute, options */) {
    return ['don_type'];
  }
});

export default ConditionalDonType;
