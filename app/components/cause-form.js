import Component from "@ember/component";
import { inject } from "@ember/service";

export default Component.extend({
  notify: inject(),
  actions: {
    handleFileUpload(file, base64) {
      this.get('fileUpload')(file, base64)
    },
    cancelEdit() {
      this.get('cancelEditAction')( )
    },
    submit() {
      let isUpdate = this.get("cause.id") && this.get("cause.id").length > 0

      this.get("cause").validate().then( ({ model, validations }) => {
        if( validations.get('isValid') ){
          model.save().then( () => {
            this.get('submitAction')( )
            this.get('notify').success( isUpdate ? "Successfully saved Cause" : "Successfully created new Cause")
          }).catch( (reason) => {
            if( reason.isAdapterError ){
              this.get('notify').alert( reason.errors[0].title )
            }
            this.get("cause.errors").setProperties( reason.errors )
            this.set('hasFeedback', true)
          });
        }else{
          this.set('hasFeedback', true)
        }
      })
    }
  }
});
