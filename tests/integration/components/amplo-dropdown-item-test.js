import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'ember-test-selectors';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('amplo-dropdown-item', 'Integration | Component | amplo dropdown item', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`{{amplo-dropdown-item index=1}}`);

  assert.equal(
    find(testSelector('dropdown-item')).textContent.trim(),
    '',
    'dropdown-item is empty'
  )

  this.render(hbs`
    {{#amplo-dropdown-item index=1}}
      template block text
    {{/amplo-dropdown-item}}
  `);

  assert.equal(
    find(testSelector('dropdown-item')).textContent.trim(),
    'template block text',
    'dropdown-item text is rendered'
  )
});

test('it renders a plain text model', function(assert) {
  this.render(hbs`{{amplo-dropdown-item index=1 model="a new model"}}`);

  assert.equal(
    find(testSelector('dropdown-item')).textContent.trim(),
    'a new model',
    'plain text model is rendered'
  )
})

test('it renders a plain text model', function(assert) {
  this.set('model', {name: "a new model name"})
  this.render(hbs`
    {{#amplo-dropdown-item index=1 model=model as |model|}}
      {{model.name}}
    {{/amplo-dropdown-item}}
  `);

  assert.equal(
    find(testSelector('dropdown-item')).textContent.trim(),
    'a new model name',
    'model.name is rendered'
  )
})
