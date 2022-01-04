import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['file-field-container'],
  fileName: Ember.computed("file", function() {
    if (typeof this.get("file") === "string") {
      return this.get("file");
    } else if (typeof this.get("file") === "object") {
      return this.get("file.name");
    } else {
      return "Click here to browse for an Image";
    }
  }),
  actions: {
    triggerFile() {
      this.$('.file').click();
    },
    fileTooBig() {
      return this.set('error', "File is too big. Must be under 10MB.");
    },
    filePicked(file, base64Image) {
      this.set('error', null);
      this.set("file", file);
      this.set("newImage", base64Image);
      this.sendAction("action", file, base64Image);
    }
  }
});
