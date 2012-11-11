var DataStore = require('./datastore');

function Model(data) {
  this.setData(data);  
}

Model.prototype.setData = function(data, value) {
 
  switch(typeof data) {
 
    case 'object':
    
      for(var key in data) {
        this[key] = data[key];
      }
      break;
 
    case 'string': 
      this[data] = value;
      break;
  }
};

module.exports = exports = Model;  