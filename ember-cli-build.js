/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app;
  var env = EmberApp.env() || 'development';
  var isProductionLikeBuild = ['production', 'staging', 'heroku', 'review'].indexOf(env) > -1;

  var fingerprintOptions = {
    extensions: ['js', 'css', 'png', 'jpg', 'gif', 'xlsx'],
    replaceExtensions: ['hbs', 'js', 'css', 'scss', 'html']
  };

  console.log(`env: ${env}`);
  console.log(`isProductionLikeBuild: ${isProductionLikeBuild}`);


  switch (env) {
    case 'local':
      fingerprintOptions.prepend = 'http://localhost:4200/';
      break;
    case 'development':
      fingerprintOptions.enabled = false
      fingerprintOptions.prepend = '/';
      break;
    case 'production':
      fingerprintOptions.enabled = true
      fingerprintOptions.prepend = `https://${process.env.S3_SYSTEM_BUCKET}.s3.amazonaws.com/dashboard/`;
      break;
  }

  app = new EmberApp(defaults, {
    'ember-cli-babel': {
      includePolyfill: true
    },
    fingerprint: fingerprintOptions,
    bootstrap: {
      plugins: ['tooltip', 'modal']
    },
    'ember-cli-tooltipster': {
      importTooltipsterBorderless:  false,
      importTooltipsterLight:  false,
      importTooltipsterPunk:   false,
      importTooltipsterShadow: false,
      importTooltipsterNoir: true
    },
    emberHighCharts: {
     includeHighCharts: true,
     includeModules: ['no-data-to-display', 'heatmap', 'map'],
     includeHighChartsMore: true
    },
    minifyJS: {
      enabled: !!isProductionLikeBuild
    },
    minifyCSS: {
      enabled: !!isProductionLikeBuild
    },
    sourceMaps: {
      enabled: !!isProductionLikeBuild
    },
    nodeAssets: {
      summernote: {
        srcDir: 'dist',
        import: ['summernote.js', 'summernote.css']
      },
      cropper: {
        srcDir: 'dist',
        import: ['cropper.js', 'cropper.min.css']
      }
    }
  });
  app.import('vendor/BeeFree.js');
  return app.toTree();
};
