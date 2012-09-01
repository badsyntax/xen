var siteConfig = require('../config/site');
var themeConfig = require('../themes/' + siteConfig.theme + '/config');

module.exports = {
  config: {},
  setConfig: function(group, key, val) {
    var config = this.config;
    if (!config[group]) {
      config[group] = {};
    }
    if (typeof key === 'object') {
      for(attr in key) {
        config[group][attr] = key[attr];
      }
    } else {
      config[group][key] = val;
    }
  },
  getConfig: function(group) {
    return this.config[group];
  },
  getConfigAsArray: function(group) {
    var config = this.getConfig(group);
    var arr = [];
    for(var key in config) {
      arr.push({
        key: key,
        val: (typeof config[key] === 'string') ? "'" + config[key] + "'" : config[key],
        notLast: true
      });
    }
    arr[arr.length-1].notLast = false;
    return arr;
  }
};