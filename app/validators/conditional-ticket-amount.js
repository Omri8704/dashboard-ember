import BaseValidator from 'ember-cp-validations/validators/base';
import Ember         from 'ember'

const { get } = Ember

const ConditionalTicketAmount = BaseValidator.extend({
  validate(value, options, model) {
    if (get(model, 'category') === 'free') {
      return true
    }

    if (get(model, 'category') === 'paid') {
      if (!Ember.isNone(value) && !isNaN(value) && value > 0) {
        return true
      }
      else {
        return "Must give an amount"
      }
    }

    if (!Ember.isNone(value) && !isNaN(value) && value > 0) {
      return true
    }
    else {
      return "Must give an amount"
    }
  }
});

ConditionalTicketAmount.reopenClass({
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
    return [];
  }
});

export default ConditionalTicketAmount;
