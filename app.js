GLOBAL.requireRoot = function(module) {
  return require(__dirname + module);
};

var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

/* Vhosts */
app.use(express.vhost('badsyntax.co', require('./apps/badsyntax.co')));

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port') + ' in ' + app.get('env') + ' mode');
});