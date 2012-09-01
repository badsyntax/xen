var hbs = require('hbs');
var fs = require('fs');

function View(path, data) {
  this.path = path;
  this.data = data;
};

View.prototype.render = function() {
  var template = hbs.compile(
    fs.readFileSync(__dirname + '/../views/' + this.path + '.hbs', 'utf8') 
  );
  return template(this.data);
};

module.exports = exports = View;