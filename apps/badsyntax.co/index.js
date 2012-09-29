GLOBAL.requireApp = function(module) {
  return require(__dirname + module);
};

GLOBAL.appDir = function() {
  return __dirname;
};

var express = require('express');
var path = require('path');
var app = express();
var config = require('./config/site');
var bootstrap = requireRoot('/lib/bootstrap');

app.configure(function(){
  app.set('port', process.env.PORT || 3001);
  app.set('views', __dirname + '/themes/' + config.theme + '/views');
  app.set('view options', { layout: false });
  app.set('view engine', 'hbs');
  app.enable('verbose errors');
  if ('production' == app.settings.env) {
    app.disable('verbose errors');
  }
  app.set('app dir', __dirname);
  app.use(express.favicon(__dirname + '/public/favicon.ico', { maxAge: 2592000000 }));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use('/themes', express.static(path.join(__dirname, '/themes')));
  app.use(express.cookieParser());
  app.use(express.session({ secret: "xen" }));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

bootstrap(app);

module.exports = app;