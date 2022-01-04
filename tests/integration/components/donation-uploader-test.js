import { test, moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
moduleForComponent('donation-uploader', 'Integration | Component | donation uploader', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  localStorage.setItem('ember_simple_auth-session', '{"secure":{},"authenticated":{"authenticator":"authenticator:application","token":"asdf","email":"user@example.com"}}');
  this.render(hbs("{{donation-uploader}}"));
  assert.ok(this.$().text().trim().includes('upload donations'));
});
