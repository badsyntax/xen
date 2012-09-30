var hbs = require('hbs');
var fs = require('fs');
var siteConfig = requireApp('/config/site');
var Cache = requireRoot('/lib/cache');

function View(path, data, theme) {
  this.path = path;
  this.theme = theme || siteConfig.theme;
  this.setData(data || {});
}

View.globalData = {};

View.prototype.setData = function(data) {
  if (!this.data) {
    this.data = {};
  }
  for (var prop in data) {
    this.data[prop] = data[prop]; 
  }
};

View.prototype.setGlobalData = function(data) {
  for(var key in data) {
    View.globalData[key] = data[key];
  }
};

View.prototype.getData = function(key) {
  return key ? this.data[key] : this.data;
};

View.prototype.renderHtml = function(html, callback) {
  
  var template = hbs.compile(html);

  // Clone the global data object
  var globalData = View.globalData;
  var data = {};
  for(var key in globalData) {
    data[key] = globalData[key];
  }

  // Merge in the global data with the view data
  var viewData = this.getData();
  for(var key in viewData) {
    data[key] = viewData[key];
  }

  callback(template(data));
};

View.prototype.render = function(callback) {
  
  var path = appDir() + '/themes/' + this.theme + '/views/' + this.path + '.hbs';

  Cache.callback(path, function(html){
    this.renderHtml(html, callback);
  }.bind(this), function(setCache) {
    setCache(fs.readFileSync(path, 'utf8'));
  });
};

module.exports = exports = View;