import { moduleForComponent, test } from 'ember-qunit';
// import wait from 'ember-test-helpers/wait';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('banger-text-input', 'Integration | Component | banger text input | ready', {
  integration: true
});

test('it renders with the value of the input as the value given', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  this.set('value', 'value');
  this.render(hbs`{{banger-text-input property=value placeholder="placeholder"}}`);
  // assert.equal(this.$().text().trim(), '');
  assert.equal(this.$().find(".form-control").val(), 'value');
});

test('it propigates label properly', function(assert) {
  // if there is no label given no label renders
  this.render(hbs`{{banger-text-input property=value label=label}}`);

  assert.equal(this.$().find("label").length, 0);

  // if there is a label given, render the correct text
  this.set('label', 'placeholder')
  assert.equal(this.$().find("label").length, 1);
  assert.equal(this.$().find("label").text(), 'placeholder');
});

test('it only shows errors after blur', function(assert) {
  this.set('value', 'hey there')
  this.set('errors', ['cant be blank'])
  this.render(hbs`{{banger-text-input property=value errors=errors}}`)
  const classes = this.$('.form-group').attr('class').split(' ')

  assert.ok(!classes.includes("has-feeback"))

  this.$('input').first().focus()
  this.$('input').first().trigger('focusout')
  let newClasses = this.$('.form-group').attr('class').split(' ')
  assert.ok(newClasses.includes("has-feedback"))
  assert.ok(newClasses.includes("has-error"))
});

test('it only shows feedback if errors else shows success', function(assert) {
  this.set('value', 'hey there')
  this.set('errors', ['cant be blank'])
  this.render(hbs`{{banger-text-input property=value errors=errors}}`)

  assert.equal(this.$('.help-block').length, 0, "no help blocks")

  this.$('input').first().trigger('focusout')
  assert.equal(this.$('.help-block').length, 1, "one help block")
  assert.equal(this.$('.help-block').text(), "cant be blank", "message is: can't be blank")
  const classes = this.$('.form-group').attr('class').split(' ')
  assert.ok(classes.includes('has-error'), "contains hass-error class")

  this.set('errors', [])
  this.$('input').first().val('changed').trigger("focusout")

  const newClasses = this.$('.form-group').attr('class').split(' ')

  assert.ok(newClasses.includes('has-success'), "contains success class")
  assert.equal(this.$('.help-block').length, 0, "doesnt have help blocks")
})
