import { test, moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
moduleForComponent('summer-note', 'Integration | Component | summer note', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{summer-note}}`);
  assert.equal(this.$('textarea.wysiwyg-textarea').length, 1, 'there is one text are that is rendered');
});
