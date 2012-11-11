var siteConfig = requireApp('/config/site');
var themeConfig = requireApp('/themes/' + siteConfig.theme + '/config');

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

Assets.prototype.renderScript = function(scripts) {
  
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

Assets.prototype.renderStyle = function(styles) {
  
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

Assets.prototype.render = function(type, key) {

  type = type.toLowerCase();
  type = type.charAt(0).toUpperCase() + type.slice(1);

  var parts = key.split('.');
  var config = themeConfig.assets;
  for(var i = 0, l = parts.length; i < l; i++) {
    config = config[ parts[i] ];
  }

  return this['render' + type](config);
};

module.exports = exports = Assets;