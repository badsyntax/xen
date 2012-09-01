var hbs = require('hbs');
var fs = require('fs');
var siteConfig = require('../config/site');

function View(path, data, theme) {
  this.path = path;
  this.data = data;
  this.theme = theme || siteConfig.theme;
};

View.prototype.render = function() {
  var html = fs.readFileSync(__dirname + '/../themes/' + this.theme + '/views/' + this.path + '.hbs', 'utf8');
  var template = hbs.compile(html);
  return template(this.data);
};

module.exports = exports = View;