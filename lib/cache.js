module.exports = exports = (function() {

  var config = requireApp('/config/memcached');
  var Memcached = require('memcached');
  var memcached = new Memcached(config.host + ':' + config.port);

  function set(key, value, callback) {
    memcached.set(key, value, config.lifetime, function(err, result){
      if (callback) callback(result);
    });
  }

  function get(key, callback) {
    memcached.get(key, function(err, result){
      if (callback) callback(result);
    });
  }

  function callback(key, callback, setCache) {
    get(key, function(data){
      if (!data) {
        setCache(function(cache){
          set(key, cache);
          callback(cache);
        })
      } else {
        callback(data);
      }
    });
  }

  function flush() {
    memcached.flush();
  }

  return {
    get: get,
    set: set,
    callback: callback,
    flush: flush
  }
})();