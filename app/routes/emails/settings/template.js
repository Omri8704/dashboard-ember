import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.createRecord('bee-free-token')
      .save()
      .then( (beeTokenRecord) => {
        const beeToken = JSON.parse(beeTokenRecord.get('token'));
        const template = this.store.findRecord("email-template", params.id)
        let list = this.modelFor('emails.settings');
        let mergeTags = list.find(function(row){
          return (row.id == params.id || row.amplo_template_id == params.id)
        }).merge_tags

        return {
          mergeTags: mergeTags,
          beeToken: beeToken,
          emailTemplate: template
        }
    })
  },
  resetController(controller) {
    controller.set('hasFeedback', false)
  },
  actions:{
    backToList(){
      this.transitionTo('emails.settings')
    }
  }
});
