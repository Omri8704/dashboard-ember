import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';
import config from '../config/environment';
export default DeviseAuthenticator.extend({
  serverTokenEndpoint: config.host + "/users/sign_in",
  tokenAttributeName: "token"
});
