import Ember from 'ember';

export default Ember.Component.extend({
  editing: false,
  submitButtonText: "Finish",
  cancelButtonText: "Cancel",
  aspectRatio: 1,
  currentImage: Ember.computed("property", function() {
    if( this.get("image") )
      return this.get("image")
    else if( this.get("property") )
      return this.get("property")
    else
      return "assets/images/light_gray.png"
  }),

  setupCropper() {
    setTimeout( ()=> {
      const image = this.$(".image-cropper");
      image.cropper({
        aspectRatio: this.get("aspectRatio"),
        checkImageOrigin: false,
        resizable: true,
        modal: true,
      });
    }, 100)
  },

  actions: {
    triggerFile() {
      this.$().find('.file').click();
    },

    fileTooBig() {
      this.set('error', "File is too big. Must be under 10MB.");
    },
    fileCorrectSize() {
      this.set('error', null);
    },
    filePicked(file, base64image) {
      this.sendAction("filePickedAction");
      this.set("file", file);
      this.set("base64image", base64image);
      this.set("editing", true);
      this.setupCropper();
    },

    saveImage() {
      const imageData = this.$(".image-cropper")
        .cropper('getCroppedCanvas')
        .toDataURL('image/jpeg');
      this.set("property", imageData);
      this.set("editing", false);
      this.$(".image-cropper").cropper("destroy");
      this.sendAction("saveAction");
    },

    cancel() {
      this.$(".image-cropper").cropper("destroy");
      this.set("editing", false);
      this.sendAction("cancelAction");
    }
  }
});
