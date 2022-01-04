import Ember from 'ember';
import DeviseAuthorizer from 'ember-simple-auth/authorizers/devise';
export default DeviseAuthorizer.extend({
  tokenAttributeName: "token",
  authorize(data, block) {
    const accessToken = data.token; //Data is the response returned by the server
    if (!Ember.isEmpty(accessToken)) {
      block('Authorization', "Token " + accessToken);
    }
  }

});
