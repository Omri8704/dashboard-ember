import Ember from 'ember';

const {
  Component,
  inject
} = Ember

export default Component.extend({
  tagName: "div",
  classNames: 'drop-zone'.w(),
  classNameBindings: ['entered'],
  notify: inject.service(),
  dragOver(e) {
    e.preventDefault()
  },
  dragEnter(e) {
    this.set("entered", true)
    e.preventDefault()
  },
  dragLeave(e) {
    this.set("entered", false)
    e.preventDefault()
  },
  drop(e) {
    e.preventDefault()
    this.set("entered", false)
    const file = e.dataTransfer.files[0];
    this.set("file", file)
    this.sendAction("fileAdded", file)
  },

  actions: {
    triggerClick() {
      this.$(".file").click()
    },

    filePicked(file) {
      this.set("file", file)
      this.sendAction("fileAdded", file)
    },

    fileTooBig() {
      this.get('notify').warning("The file you are trying to upload is too large.")
    },

    enterTheDragon(e) {
      this.set("entered", true)
      e.preventDefault()
    },

    leaveTheDragon(e) {
      this.set("entered", false)
      e.preventDefault()
    },

    removeFile() {
      this.set('file', null)
      this.sendAction('removeFile')
    }
  }
});
