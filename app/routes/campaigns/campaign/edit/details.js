import Ember from 'ember';
const { set } = Ember;

export default Ember.Route.extend({
  model(){
    return( this.modelFor("campaigns.campaign") )
  },
  setupController(controller) {
    this._super(...arguments);
    if( controller.get("settings.current_entity.raisers_edge_integration") ){
      set( controller, "initiatives", controller.store.findAll("initiative") )
      set( controller, "causes", controller.store.findAll("cause") )
      set( controller, "appeals", controller.store.findAll("appeal") )
    }
  }
});
