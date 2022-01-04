import Ember from 'ember';

export default Ember.Component.extend({
  emptyFilter: true,
  classNames: ['mailing-filter-selector'],
  classNameBindings: ['in', 'hard-in'],

  init(){
    this._super(...arguments)

    let renderedFilters = this.get("mailingFilter.renderedFilterComponents")
    let attributeName = this.get("attribute.name")

    if( this.emptyFilter || (renderedFilters && renderedFilters.includes( attributeName ) )){
      this.toggleProperty('hard-in')
    }else{
      // This is required to animate the CSS transition (has to do with CSS3 transitions and render time)
      Ember.run.scheduleOnce("afterRender", this, function() {
        let self = this
        Ember.run.later((function() { self.toggleProperty('in') }), 10)
      });
    }

    if( renderedFilters && attributeName ){
      this.get("mailingFilter.renderedFilterComponents").pushObject( attributeName )
    }
  },

  _propagateValues: function(doCrud){
    const attr = this.get("attribute.name")
    const value = this.get("attribute.value")
    if( doCrud ) this.sendAction("crudAction", attr, value)
  },

  actions: {
    action() {
      this._propagateValues( true )
    },

    changeFilter(newAttr) {
      const oldAttr = this.get("attribute.name")
      const option = this.get("attribute.value")
      this.sendAction("selectAttribute", oldAttr, newAttr, option)
    },

    changeFilterValue(option) {
      const oldAttr = this.get("attribute.name")
      this.sendAction("selectAttribute", oldAttr, oldAttr, option)
      this._propagateValues( this.emptyFilter )
    }
  }
});
