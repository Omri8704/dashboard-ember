import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: validator('presence', true),
  goal: [
    validator('number', {
      gte: 10
    })
  ],
});

export default DS.Model.extend(Validations, {
  bind_to_category: DS.attr('string'),
  campaign_id: DS.attr('string'),
  campaign_name: DS.attr('string'),
  category: DS.attr('string'),
  delivery_targets: DS.attr({ defaultValue: function () { return [] } }),
  display_impact: DS.attr("boolean"),
  end_date: DS.attr('string'),
  image_filename: DS.attr('string'),
  image_alt_text: DS.attr('string'),
  money_goal: DS.attr('number'),
  participation_goal: DS.attr('number'),
  short_description: DS.attr('string'),
  start_date: DS.attr('string'),
  title: DS.attr('string'),
  type: DS.attr('string'),
  full_description: DS.attr('string')
});
