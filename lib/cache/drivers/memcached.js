module.exports = exports = (function() {

  var config = requireApp('/config/cache');
  var Memcached = require('memcached');
  var client = new Memcached(config.host + ':' + config.port);

  var Cache = {
    set: function(key, value, callback) {
      client.set(key, value, config.lifetime, function(err, result){
        if (callback) callback(result);
      });
    },
    get: function(key, callback) {
      client.get(key, function(err, result){
        if (callback) callback(result);
      });
    },
    flush: function() {
      client.flush(function(err, result){
        if(err) console.error(err);
      });
    }
  };

  return Cache;
})();