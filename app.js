var express = require('express');
var router = require('./lib/router');
var http = require('http');
var path = require('path');
var app = express();
var config = require('./config/site');

app.configure(function(){

  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/themes/' + config.theme + '/views');
  app.set('view options', { layout: false });

  app.set('view engine', 'hbs');
  app.use(express.favicon(__dirname + '/public/favicon.ico', { maxAge: 2592000000 }));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/themes', express.static(path.join(__dirname, 'themes')));
  //app.use(express.cookieParser());
  //app.use(express.session({ secret: "keyboard cat" }));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

GLOBAL.requireRoot = function(module) {
  return require(__dirname + module);
};

router.setup(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port') + ' in ' + app.get('env') + ' mode');
});