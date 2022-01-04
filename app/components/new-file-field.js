import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
  init(){
    this._super(...arguments);
  },
  click(event){
    event.target.value = ""
  },

  filesDidChange: function(files) {
    var reader;

    if (files) {
      reader = new FileReader();
      reader.onload = ( (e) => {
        if (files[0].size > 20000000) {
          this.sendAction("fileTooBig");
          return;
        } else {
          this.sendAction("fileCorrectSize");
        }
        return this.sendAction("action", files[0], e.target.result);
      });
      return reader.readAsDataURL(files[0]);
    }
  }
});
