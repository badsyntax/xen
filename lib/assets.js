var siteConfig = require('../config/site');
var themeConfig = require('../themes/' + siteConfig.theme + '/config');

function Assets(app) {
  this.app = app;
}

Assets.prototype.getScriptHtml = function(script) {
 
  if (this.app.get('env') === 'development') {
    script = [
      'themes',
      siteConfig.theme,
      'public',
      script
    ].join('/');
  }

  return '<script src="/' + script + '"></script>\n';
};

Assets.prototype.getStyleHtml = function(style) {

  if (this.app.get('env') === 'development') {
    style = [
      'themes',
      siteConfig.theme,
      'public',
      style
    ].join('/');
  }

  return '<link rel="stylesheet" type="text/css" href="/' + style + '" />\n';
};

Assets.prototype.renderScript = function() {
  
  var scripts = themeConfig.assets.script;
  var html = '';

  switch(this.app.get('env')) {
    case 'development': 
      scripts.forEach(function(script) {
        html += this.getScriptHtml(script);
      }.bind(this));
    break;
    case 'production':
      html = this.getScriptHtml('js/app.min.js');
    break;
  }

  return html;
};

Assets.prototype.renderStyle = function() {
  
  var styles = themeConfig.assets.style;
  var html = '';

  switch(this.app.get('env')) {
    case 'development': 
      styles.forEach(function(style) {
        html += this.getStyleHtml(style);
      }.bind(this));
    break;
    case 'production':
        html = this.getStyleHtml('css/app.min.css');
    break;
  }

  return html;
};

Assets.prototype.render = function(type) {

  type = type.toLowerCase();
  type = type.charAt(0).toUpperCase() + type.slice(1);
  var method = this['render' + type];

  if (method === 'undefined') {
    return '';
  }

  return method.call(this);
};

module.exports = exports = Assets;