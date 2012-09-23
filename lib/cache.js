module.exports = exports = (function() {

  var memcached;
  var config = requireApp('/config/memcached');

  function error(err) {
    console.error(err);
  }

  function init() {
    if (memcached === undefined) {
      var Memcached = require('memcached');
      memcached = new Memcached(config.host + ':' + config.port);
    }
  }

  function set(key, value, callback) {
    init();
    memcached.set(key, value, config.lifetime, function(err, result){
      if(err) error(err);
      if (callback) callback(result);
    });
  }

  function get(key, callback) {
    init();
    memcached.get(key, function(err, result){
      if (err) error(err);
      if (callback) callback(result);
    });
  }

  return {
    get: get,
    set: set
  }
})();