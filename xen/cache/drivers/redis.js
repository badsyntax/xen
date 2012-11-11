module.exports = exports = (function() {

  var config = requireApp('/config/cache');
  var redis = require("redis");
  var client = redis.createClient(config.port, config.host);

  client.on("error", function (err) {
    console.log("Redis error " + err);
  });

  var Cache = {
    set: function(key, value, callback) {
      client.set(key, value, function(err, res){
        if (err) {
          console.error(err);
        }
        if (res === 'OK') {
          console.log('Cache set for key: ', key);
        }
      });
    },
    get: function(key, callback) {
      client.get(key, function(err, result) {
        if (err) {
          console.error(err);
        }
        if (!result) {
          console.error('Cache miss for key: ', key);
        }
        callback(result);
      });
    },
    flush: function() {
      console.log('Flushing redis cache');
      client.flushdb();
    }
  };

  return Cache;
})();