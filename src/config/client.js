let config = {
  api: {
    protocol: 'http',
    host: 'localhost',
    port: 7082,
    prefix: 'api'
  },
};

// Use the browser's location so we don't 
// have to hardcode this. It may be appropriate
// to code this in if we end up hosting the 
// frontend in a static location and the backend
// application server somewhere else
config.endpoint = location.protocol + '//' 
  + location.hostname
  + (location.port ? ':'+location.port: '') + "/"
  + config.api.prefix + "/"

// config.endpoint = config.api.protocol + '://' +
//   config.api.host + ':' +
//   config.api.port + '/' +
//   config.api.prefix + '/';

module.exports = config;