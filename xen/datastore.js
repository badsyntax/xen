function DataStore(type, dataPath) {
  this.type = type;
  this.start = 0;
  this.end = -1;
  this.whereCallback = null;
  this.dataPath = dataPath || appDir() + '/content/' + this.type + '.json'; 
  this.data = require(this.dataPath);
}

DataStore.prototype.limit = function(start, end) {
  this.start = start;
  this.end = end;
  return this;
};

DataStore.prototype.where = function(callback) {
  this.whereCallback = callback;
  return this;
};

DataStore.prototype.add = function(data) {
  this.data.push(data);
  return this;
};

DataStore.prototype.save = function(dataPath) {
  var items = this.find();
  require('fs').writeFileSync(dataPath || this.dataPath, JSON.stringify(items, null, 2));
};

DataStore.prototype.remove = function() {
 
  var removeUris = this.find().map(function(item){
    return item.uri;
  });

  this.where(function(item){
    return ( removeUris.indexOf(item.uri) === -1 );
  }).limit(0, -1);

  this.save();
};

DataStore.prototype.find = function() {

  var data = this.data;

  if (typeof this.whereCallback === 'function') {
    data = data.filter(this.whereCallback);
  }

  if (this.end === -1) {
    this.end = data.length;
  }

  return data.slice(this.start, this.end);
};

module.exports = exports = DataStore;