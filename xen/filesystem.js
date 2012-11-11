var fs = require('fs');

FileSystem = {

  listFiles: function(directory) {
    
    var returnFiles = [];

    (function readdirSyncRecursive(path) {
      
      var files = fs.readdirSync(path);
      var relativePath = path.replace(path, '').replace(/^\//, '');
      relativePath += relativePath ? '/' : '';
      
      for (var i in files) {

        var currentFile = path + '/' + files[i];
        var stats = fs.statSync(currentFile);
      
        if (stats.isFile()) {
          returnFiles.push(relativePath + files[i]);
        }
        else if (stats.isDirectory()) {
          readdirSyncRecursive(currentFile);  
        }
      }
    
    })(directory);

    return returnFiles;
  }
};

module.exports = exports = FileSystem;