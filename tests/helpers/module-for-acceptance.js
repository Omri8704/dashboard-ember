import { module } from 'qunit';
import Ember from 'ember';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

const { RSVP: { Promise } } = Ember;

export default function(name, options = {}) {
  module(name, {
    beforeEach(assert) {
      localStorage.setItem('ember_simple_auth-session', '{"secure":{},"authenticated":{"authenticator":"authenticator:application","token":"asdf","email":"user@example.com"}}');
      this.application = startApp();
      let campaign =  server.create('campaign');
      let entity = server.create('entity', {campaigns: [campaign] } );
      server.create('current_user', {entities: [entity], entity_admin: true});
      // login code
      visit('/');
      andThen(() => assert.equal(currentURL(), '/login'));
      fillIn('.email input', 'something@gmail.com');
      fillIn('.password input', 'Abcd1234');
      click("#loginButton");
      andThen(() => assert.equal(currentURL(), '/'));
      // login code

      if (options.beforeEach) {
        return options.beforeEach.apply(this, arguments);
      }
    },

    afterEach() {
      let afterEach = options.afterEach && options.afterEach.apply(this, arguments);
      return Promise.resolve(afterEach).then(() => destroyApp(this.application));
    }
  });
}
