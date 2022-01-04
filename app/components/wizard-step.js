import hbs from 'htmlbars-inline-precompile';
import Step from 'ember-steps/components/step-manager/step'

const layout = hbs`
  {{#liquid-if isActive class='liquid-wizard'}}
    {{yield}}
  {{else if hasInactiveState}}
    {{yield to='inverse'}}
  {{/liquid-if}}
`
export default Step.extend({
  layout
});
