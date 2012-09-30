module.exports = exports = (function() {

  var config = requireApp('/config/cache');
  var Cache = requireRoot('/lib/cache/drivers/' + config.driver);

  Cache.callback = function(key, callback, getData, cacheOnCondition) {
    if (cacheOnCondition === undefined) {
      cacheOnCondition = true;
    }
    if (!cacheOnCondition) {
      getData(function(data){
        callback(data);
      });
      return;
    }
    Cache.get(key, function(data){
      if (!data) {
        getData(function(cache){
          Cache.set(key, cache);
          callback(cache);
        })
      } else {
        callback(data);
      }
    });
  };
 
  return Cache;
})();