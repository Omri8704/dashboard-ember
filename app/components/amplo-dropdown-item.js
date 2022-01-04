import Ember from 'ember';

/*
  Gets the parent component context through the parent component's yield, sends an action with the selected model
*/

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['pointer'],
  model: null, // model object
  click() {
    this.get('selectItemAction')(this.get('model'));
  }
});
