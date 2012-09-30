module.exports = exports = (function() {

  var config = requireApp('/config/cache');
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

  function callback(key, callback, getData, cacheOnCondition) {
    if (cacheOnCondition === undefined) {
      cacheOnCondition = true;
    }
    if (!cacheOnCondition) {
      getData(function(data){
        callback(data);
      });
      return;
    }
    get(key, function(data){
      if (!data) {
        getData(function(cache){
          set(key, cache);
          callback(cache);
        })
      } else {
        callback(data);
      }
    });
  }

  function flush() {
    memcached.flush(function(err, result){
      if(err) console.error(err);
    });
  }

  return {
    get: get,
    set: set,
    callback: callback,
    flush: flush
  }
})();