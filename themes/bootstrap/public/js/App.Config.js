/**********************
 * App config
 **********************/

App.Config = (function() {

  var data = {};

  var Config = {
    get: function (key) {
      if (key === undefined) {
        return data;
      }
      var parts = key.split('.');
      var obj = data;
      for(var i = 0, l = parts.length; i < l; i++) {
        obj = obj[ parts[i] ];
      }
      return obj;
    },
    set: function (key, val) {

      if (typeof key === 'object' && val === undefined) {
        $.extend(data, key);
      } else {
        var obj = data;
        var parts = key.split('.');
        key = parts.pop();

        for(var i = 0, l = parts.length; i < l; i++) {
          if (obj[ parts[i] ] === undefined) {
            obj[ parts[i] ] = {};
          }
          obj = obj[ parts[i] ];
        }

        if (typeof obj[key] === 'object' && typeof val === 'object') {
          $.extend(obj[key], val);
        } else {
          obj[key] = val;
        }
      }
    },
    remove: function(key) {
      if (key !== undefined) {
        delete data[key];
      } else {
        data = {};
      }
    }
  };
  return Config;
})();

// App.Config.Disqus = {
//   disqus_developer: ( document.domain === '127.0.0.1' ),
//   disqus_shortname: 'USERNAME'
// };

// App.Config.Analytics = {
//   account: 'UA-XXXXXXX-XX'
// };

// App.Config.GooglePlus = {
//   ___gcfg: {
//     lang: 'en-GB' 
//   }
// };