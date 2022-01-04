import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('file-drop', 'Integration | Component | file drop', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{file-drop}}`);

  assert.equal(this.$().text().trim(), 'Drag and drop file here, or click to upload file.');

});
