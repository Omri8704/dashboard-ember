import { moduleFor, test } from 'ember-qunit';
// import Pretender from 'pretender';
import { startMirage } from 'dashboard/initializers/ember-cli-mirage';

moduleFor('controller:events/event/tickets', 'Unit | Controller | events/event/tickets', {
  integration: true,
  beforeEach() {
    this.server = startMirage();
  },
  afterEach() {
    this.server.shutdown();
  }
});


// Replace this with your real tests.
test('it exists', function(assert) {
  // (new pretender(function(){
  //   this.get('/api/causes', function(request){
  //     return [ 200, {"content-type": "application/json"}, "{\"data\": null}" ]
  //   });
  //   this.get('/api/entity-custom-fields', function(request){
  //     return [ 200, {"content-type": "application/json"}, "{\"data\": null}" ]
  //   });
  // }));

  let controller = this.subject();
  assert.ok(controller);
});
