var express = require('express');
var app = express();
var Memcached = require('memcached');

var memcached = new Memcached('localhost:11211');

console.log('1');
memcached.set('hello', 'world', 10000, function( err, result ){
  if( err ) console.error( err );
  console.dir( result );

  console.log('2');
});

console.log('3');


memcached.get('hello', function( err, result ){
  if( err ) console.error( err );
  console.dir( result );
});


app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port') + ' in ' + app.get('env') + ' mode');
});
