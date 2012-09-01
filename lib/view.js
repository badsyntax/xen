function View(path, data) {
  this.path = path;
  this.data = data;
};

View.prototype.render = function() {
  return require('fs').readFileSync(__dirname + '/../views/' + this.path + '.hbs', 'utf8');
};

module.exports = exports = View;