import Ember from 'ember'
import request from 'ic-ajax'

const { RSVP: { Promise }, isBlank } = Ember

export default function({url, data, method, contentType = 'application/json'}) {
  if (isBlank(url)) { throw Error('must supply url')}
  if (isBlank(method)) { method = 'get'}

  return new Promise( (resolve, reject) => {
    let token = JSON.parse(localStorage.getItem("ember_simple_auth-session")).authenticated.token;

    return request(url, {
      method,
      contentType,
      beforeSend(xhr) {
        xhr.setRequestHeader('Authorization', "Token " + token);
        xhr.setRequestHeader('CURRENT-ENTITY-ID', localStorage.getItem("entity_id"));
      },
      xhrFields: {
        withCredentials: true
      },
      data
    })
    .then( (res) => resolve(res))
    .catch( (err) => reject(err))
  })
}
