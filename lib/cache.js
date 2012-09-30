module.exports = exports = (function() {

  var config = requireApp('/config/cache');
 
  return requireRoot('/lib/cache/drivers/' + config.driver);
})();