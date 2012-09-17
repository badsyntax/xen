var BaseModel = require('./base');
var Globalize = require('../lib/globalize');
var DataStore = require('../lib/datastore');

Globalize.culture('en-GB');

function PageModel() { 
  
  BaseModel.apply(this, arguments); 

  this.__defineGetter__('body', function() {

    if (this.content !== undefined) {
      return this.content;
    }
    
    if (this.contentPath === undefined) {
      throw new Error('No page content set!');
    } else {
      this.content = require('fs').readFileSync(__dirname + '/../content/' + this.contentPath, 'utf8');
    }

    return this.content;
  });

  this.__defineGetter__('url', function() {
    return '/' + this.uri;
  });

  this.__defineGetter__('date', function() {
    return Globalize.format( new Date(this.dateCreated), 'D');
  });

  this.__defineGetter__('dateshort', function() {
    return Globalize.format( new Date(this.dateCreated), 'd');
  });
}

require('util').inherits(PageModel, BaseModel);

PageModel.factory = function(uri, type) {

  var record = new DataStore(type || 'pages').where(function(page){
    return page.uri === uri;
  }).find()[0];

  if (!record) {
    throw new Error('Page record not found: ' + uri);
  }

  return new PageModel( record );
};

module.exports = exports = PageModel;  