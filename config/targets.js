/* eslint-env node */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var ENV = {
  browsers: [
    'last 1 Chrome versions',
    'last 1 Firefox versions'
  ]
};

if (['production', 'stg', 'heroku', 'review'].indexOf(EmberApp.env()) > -1) {
  ENV.browsers.push('ie 10')
  ENV.browsers.push('last 1 Edge versions')
  ENV.browsers.push( 'last 1 Safari versions')
}

module.exports = ENV
