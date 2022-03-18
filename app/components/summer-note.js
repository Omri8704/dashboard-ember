import Ember from 'ember';

const {
  Component
} = Ember

export default Component.extend({
  classNames: ['wysiwyg-editor'],
  btnSize: 'btn-xs',
  height: 120,
  focus: false,
  airMode: false,
  disabled: false,
  willDestroyElement() {
    this.$('.wysiwyg-textarea').destroy();
  },

  didInsertElement() {
    const _btnSize = this.get('btnSize');
    const _height = this.get('height');
    const _focus = this.get('focus');
    const _airMode = this.get('airMode');


    this.$('.wysiwyg-textarea').summernote({
      height: _height,
      focus: _focus,
      toolbar: [['font', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']], ['fontsize', ['fontsize']], ['color', ['color']], ['para', ['ul', 'ol', 'paragraph']], ['height', ['height']], ['table', ['table']], ['insert', ['link', 'picture', 'video', 'hr']], ['codeview', ['codeview']]],
      airMode: _airMode
    });

    this.$('.note-editable').attr('contenteditable', !this.get('disabled'));

    const _content = this.get('content');
    if (_content) {
      this.$('textarea').code(_content);
    }
    this.$('.btn').addClass(_btnSize);
  },

  doUpdate() {
    const content = this.$('.note-editable').html();
    this.set('content', content);
  },

  keyUp() {
    this.doUpdate();
  },

  click() {
    this.doUpdate();
  },

  setHeight: Ember.observer('height', function() {
    this.$('.note-editable').css('height', this.get('height'));
  }),

  setContentEditable: Ember.observer('disabled', function() {
    this.$('.note-editable').attr('contenteditable', !this.get('disabled'));
  })
});
