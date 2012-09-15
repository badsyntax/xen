var View = require('./view');

function ViewModel(path, data, theme) {
  this.view = new View(path, data, theme);
}

ViewModel.factory = function(path, data, theme) {
  
  var vmPath = __dirname + '/../themes/' + require('../config/site').theme + '/viewmodels/' + path;

  try {
    var VM = require(vmPath);
  } catch(e) {
    var VM = ViewModel;
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
  if (!this.hasCompiled) {
    this.hasCompiled = true;
    var data = {};
    for(var key in this) {
      if (/^get/.test(key) && typeof this[key] === 'function') {
        var newKey = key.replace(/^get/, '');
        newKey = newKey.charAt(0).toLowerCase() + newKey.slice(1);
        data[newKey] = this[key]();
      }
    }
    this.setData(data);
  }
};

ViewModel.prototype.render = function() {
  this.compile();
  return this.view.render();
};

module.exports = exports = ViewModel;