import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'ember-test-selectors';
import { click, find, findAll } from 'ember-native-dom-helpers';

moduleForComponent('amplo-dropdown', 'Integration | Component | amplo dropdown', {
  integration: true,
  beforeEach() {
    this.set('options', [{name: 'test1'}, {name: 'test2'}] )
    this.set('preSelectedItem', {name: 'pre-selected text'} )
    this.set('selectItem', (val) => {
      this.set('selectedItem', val)
    })

  }
});

test('it renders default placeholder text', function(assert) {

  this.render(hbs`
    {{amplo-dropdown}}
  `);

  assert.equal(
    find(testSelector('selected-text')).textContent.trim(),
    'Placeholder Text',
    'selected text is test'
  );
});

test('it renders a custom placeholder', function(assert) {

  this.render(hbs` {{amplo-dropdown placeholderText='test'}} `);

  assert.equal(
    find(testSelector('selected-text')).textContent.trim(),
    'test',
    'selected text is test'
  );
});

test('it renders dropdown items', async function(assert) {

  this.render(hbs`
    {{#amplo-dropdown
      options=options
      onChange=selectItem as |model|}}
        {{model.name}}
    {{/amplo-dropdown}}
  `);

  assert.equal(findAll(testSelector('dropdown-item')).length, 0, 'dropdown-items do not render')
  await click(testSelector('selected-text'))
  assert.equal(findAll(testSelector('dropdown-item')).length, this.get('options').length, 'dropdown-items do render')
  assert.equal(find(testSelector('dropdown-item')).textContent.trim(), this.get('options')[0]['name'], 'dropdown-item 1 exists and shows its name')
})

test('it selects a dropdown item and the items disapear', async function(assert) {
  this.render(hbs`
    {{#amplo-dropdown
      options=options
      onChange=(action (mut selectedItem)) as |model|}}
        {{model.name}}
    {{/amplo-dropdown}}
  `);

  await click(testSelector('selected-text'))
  await this.$(testSelector('dropdown-item', '1')).click()

  assert.equal(
    find(testSelector('selected-text')).textContent.trim(),
    'test2',
    'selected text is test'
  );
  assert.equal(findAll(testSelector('dropdown-item')).length, 0, 'dropdown-items do not show up anymore')
});

test('it\'s action item works', async function(assert) {
  this.render(hbs`
    {{#amplo-dropdown
      options=options
      onChange=(action (mut selectedItem)) as |model|}}
        {{model.name}}
    {{/amplo-dropdown}}
  `);

  await click(testSelector('selected-text'))
  await this.$(testSelector('dropdown-item', '1')).click()

  assert.equal(
    this.get('selectedItem'),
    this.get('options')[1],
    'selected item has changed'
  );
});

test('it can have a pre-selected item', function(assert) {

  this.render(hbs`
    {{#amplo-dropdown
      placeholderText='test'
      selectedItem=preSelectedItem
      options=options
      onChange=selectItem as |model|}}
        {{model.name}}
    {{/amplo-dropdown}}
  `);

  assert.equal(
    find(testSelector('selected-text')).textContent.trim(),
    'pre-selected text',
    'selected text is test'
  );
});

test('it closes the dropdown when clicked away', async function(assert) {

  this.render(hbs`
    <div class='btn btn-default' data-test-fake-btn> button here </div>
    {{#amplo-dropdown
      placeholderText='test'
      options=options
      onChange=selectItem as |model|}}
        {{model.name}}
    {{/amplo-dropdown}}
  `);

  await click(testSelector('selected-text'))
  assert.equal(
    findAll(testSelector('dropdown-item')).length,
    2,
    'dropdown-items do show up'
  )

  await click(testSelector('fake-btn'))

  assert.equal(
    findAll(testSelector('dropdown-item')).length,
    0,
    'dropdown-items do not show up'
  )

});
