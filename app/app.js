import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

Ember.onerror = (error) => {
  console.error(error);
  throw error;
};
Ember.RSVP.on('error', (error) => {
  // Check and do not log TransitionAborted errors
  if(error.name !== 'TransitionAborted') {
    console.error(error)
  }
});

const App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  currentPath: '',
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
