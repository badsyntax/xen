var BaseModel = requireRoot('/xen/model');
var Globalize = requireRoot('/xen/globalize');
var DataStore = requireRoot('/xen/datastore');

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

  uri = uri.replace(/\?.*$/, ''); // remove query string

  var record = new DataStore(type || 'pages').where(function(page){
    return page.uri === uri;
  }).find()[0];

  if (!record) {
    console.error('Page record not found: ' + uri);
    return false;
  }

  return new PageModel( record );
};

module.exports = exports = PageModel;  