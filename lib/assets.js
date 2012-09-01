var hbs = require('hbs');
var fs = require('fs');
var siteConfig = require('../config/site');
var themeConfig = require('../themes/' + siteConfig.theme + '/config');

function Assets(type) {
  this.type = type.toLowerCase();
};

Assets.prototype.renderScript = function() {
  
  var scripts = themeConfig.assets.script;
  var html = '';

  scripts.forEach(function(script) {
    
    script = [
      'themes',
      siteConfig.theme,
      'public',
      script
    ].join('/');

    html += '<script src="/' + script + '"></script>\n';
  });

  return html;
};

Assets.prototype.renderStyle = function() {
  
  var styles = themeConfig.assets.style;
  var html = '';

  styles.forEach(function(style) {
    
    style = [
      'themes',
      siteConfig.theme,
      'public',
      style
    ].join('/');

    html += '<link rel="stylesheet" type="text/css" href="/' + style + '" />\n';
  });

  return html;
};

Assets.prototype.render = function() {
  
  var type = this.type.charAt(0).toUpperCase() + this.type.slice(1);
  var method = this['render' + type];

  if (method === 'undefined') {
    return '';
  }

  return method();
};

module.exports = exports = Assets;