/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'dashboard',
    environment: environment,
    rootURL: '/dashboard/',
    locationType: 'hash',
    'ember-cli-mirage': {
      enabled: false
    },
    metricsAdapters: [
      {
        name: "GoogleAnalytics",
        environments: ['development', 'production', 'review'],
        config: {
          id: 'UA-54759192-48',
          debug: false,
          trace: false,
          sendHitTask: environment !== 'development' && environment !== 'review'
        }
      }
    ],
    moment: {
      includeTimezone: 'all'
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    browserify: {
      ignores: []
    }
  };

  if (environment === 'development' || environment === 'local') {
    ENV.rootURL = '/';
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    // ENV.host = 'http://localhost:3003/';
    ENV.host = '';
    ENV.contentSecurityPolicy = {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' https://loader.getbee.io/v1/api/ https://cdn.mxpnl.com www.google-analytics.com", // Allow scripts from https://cdn.mxpnl.com
      'font-src': "'self' https://maxcdn.bootstrapcdn.com/ https://gw-advance-prod-us-east-1.s3.amazonaws.com/", // Allow fonts to be loaded from http://fonts.gstatic.com
      'connect-src': "'self'  https://*.getbee.io/ http://localhost:3003 http://localhost:4200 www.google-analytics.com https://*.amazonaws.com",
      'img-src': "'self' https://*.s3.amazonaws.com http://lorempixel.com data:",
      'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com https://maxcdn.bootstrapcdn.com/", // Allow inline styles and loaded CSS from http://fonts.googleapis.com
      'media-src': "'self'",
      'frame-src': "https://loader.getbee.io/v1/api/loader"
    };
    ENV['ember-cli-mirage'] = {
      enabled: true
    };
  }

  if (environment === 'development') {
    ENV.host = 'http://localhost:3003/';

    ENV['ember-cli-mirage'] = {
      enabled: false
    };
  }
  if (environment === 'test') {
    // Testem prefers this...
    ENV.rootURL = '/';
    ENV.locationType = 'none';
    ENV.host = '';
    ENV.namespace = 'api';
    ENV['ember-cli-mirage'] = {
      enabled: true
    };
    ENV.contentSecurityPolicy = {
      'default-src': "'none'",
      'script-src': "'self' https://cdn.mxpnl.com", // Allow scripts from https://cdn.mxpnl.com
      'font-src': "'self' https://maxcdn.bootstrapcdn.com/ https://gw-advance-prod-us-east-1.s3.amazonaws.com/", // Allow fonts to be loaded from http://fonts.gstatic.com
      'connect-src': "'self' http://localhost:3003",
      'img-src': "'self' 'https://*.s3.amazonaws.com' 'http://lorempixel.com'",
      'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com https://maxcdn.bootstrapcdn.com/", // Allow inline styles and loaded CSS from http://fonts.googleapis.com
      'media-src': "'self'"
    };
    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production' || environment === 'review') {
    ENV.host = '';
    ENV.rootURL = '/';
    ENV.baseURL = '/dashboard/';
    // a work around for getting npm module into the tests:
    // https://github.com/ef4/ember-browserify/issues/14
    ENV.browserify.ignores.push('timekeeper')
  }
  //config/environment.js
  ENV['simple-auth'] = {
    // authorizer: 'simple-auth-authorizer:devise',
    crossOriginWhitelist: [ENV.host],
    authenticationRoute: '/',
    routeAfterAuthentication: '/',
    routeIfAlreadyAuthenticated: '/'
  //   store: 'simple-auth-session-store:local-storage'
  };
  ENV['simple-auth-devise'] = {
    tokenAttributeName: 'token'
  };

  return ENV;
};
