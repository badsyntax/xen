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

app.configure(function(){
  console.log('test');
  app.set('port', process.env.PORT || 3001);
  app.set('views', __dirname + '/themes/' + config.theme + '/views');
  app.set('view options', { layout: false });
  app.set('view engine', 'hbs');
  app.set('app dir', __dirname);
  app.use(express.favicon(__dirname + '/public/favicon.ico', { maxAge: 2592000000 }));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use('/themes', express.static(path.join(__dirname, '/themes')));
  //app.use(express.cookieParser());
  //app.use(express.session({ secret: "keyboard cat" }));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

requireRoot('/lib/route')(app);

module.exports = app;