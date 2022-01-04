module.exports = function() {
  var ENV = {
    build: {},
    s3: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      prefix: 'dashboard',
      filePattern: '**/*.{js,css,png,gif,ico,jpg,map,xml,txt,svg,swf,eot,ttf,woff,woff2,otf,xlsx}'
    },
    redis: {
      url: process.env.REDIS_URL,
      allowOverwrite: true,
      keyPrefix: 'dashboard:index'
    }
  };

  ENV["revision-data"] = {
    scm: null
  }
  ENV.build.environment = 'production';
  ENV.pipeline = {
    activateOnDeploy: true
  }
  ENV.s3.bucket = process.env.S3_SYSTEM_BUCKET;
  ENV.s3.region = process.env.AWS_REGION;

  return ENV;
};
