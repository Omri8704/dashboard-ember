import hbs from 'htmlbars-inline-precompile';
import StepManager from 'ember-steps/components/step-manager';


/*
  Overwrite default template to allow liquid animations between steps
*/

const layout = hbs `
  {{yield (hash
    step=(component "wizard-step"
      register-step=(action "register-step-component")
      currentStep=transitions.currentStep
    )
    transition-to=(action 'transition-to-step')
    transition-to-next=(action 'transition-to-next-step')
    currentStep=transitions.currentStep
  )}}
`
export default StepManager.extend({
  layout
});
