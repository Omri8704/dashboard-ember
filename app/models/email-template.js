import Ember from 'ember';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true),
});

export default DS.Model.extend(Validations, {
  mailings: DS.hasMany('mailings', { async: true }),
  entity: DS.belongsTo('entity', { async: true }),

  name: DS.attr('string'),
  json: DS.attr(),
  html: DS.attr(),
  icon: DS.attr('string'),
  base_template_type: DS.attr('string'),
  dashboard_display_name: DS.attr('string'),
  display_in_dashboard: DS.attr('boolean', {
    defaultValue: true
  }),

  subject: DS.attr('string'),
  description: DS.attr('string'),

  userUploaded: DS.attr('boolean', {
    defaultValue: false
  }),

  amplo_template: DS.attr('boolean', {
    defaultValue: false
  }),

  default_template: DS.attr('boolean', {
    defaultValue: false
  }),

  system_template: DS.attr('boolean', {
    defaultValue: false
  }),

  superadmin_override: DS.attr('boolean', {
    defaultValue: false
  }),

  parsedJSON: Ember.computed('json', {
    get() {
      let json = this.get("json")
      if (json) {
        if (json[0] === "\"") {
          json = json.slice(1,-1);
        }
        return JSON.parse(json);
      }
    }
  })
});
