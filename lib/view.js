var hbs = require('hbs');
var fs = require('fs');
var siteConfig = require('../config/site');

function View(path, data, theme) {
  this.path = path;
  this.theme = theme || siteConfig.theme;
  this.setData(data || {});
}

View.prototype.setData = function(data) {
  if (!this.data) {
    this.data = data;
  } else {
    for (var prop in data) {
      this.data[prop] = data[prop];
    }    
  }
};

View.prototype.getData = function() {
  return this.data;
};

View.prototype.render = function() {
  
  var path = __dirname + '/../themes/' + this.theme + '/views/' + this.path + '.hbs';
  var html = fs.readFileSync(path, 'utf8');
  var template = hbs.compile(html);

  return template(this.getData());
};

module.exports = exports = View;