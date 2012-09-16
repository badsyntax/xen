var View = require('./view');

function ViewModel(path, data, theme) {
  this.view = new View(path, data, theme);
}

ViewModel.factory = function(path, data, theme) {
  
  var VM;
  var vmPath = __dirname + '/../themes/' + require('../config/site').theme + '/viewmodels/' + path;

  try {
    VM = require(vmPath);
  } catch(e) {
    VM = ViewModel;
    console.log('Error: unable to find viewmodel ' + vmPath);
  }

  return new VM(path, data, theme);
};

ViewModel.prototype.setData = function() {
  this.view.setData.apply(this.view, arguments);
};

ViewModel.prototype.getData = function() {
  return this.view.getData.apply(this.view, arguments);
};

ViewModel.prototype.compile = function() {
  for(var key in this) {
    if (typeof this[key] === 'function') {
      this[key] = this[key].bind(this);
    }
  }
  this.setData(this);
};

ViewModel.prototype.render = function() {
  this.compile();
  return this.view.render();
};

module.exports = exports = ViewModel;