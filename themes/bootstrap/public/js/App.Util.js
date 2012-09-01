/**********************
 * App util
 **********************/
App.Util.inherits = function(_sub, _super) {

  function F() {}
  F.prototype = _super.prototype;

  _sub.prototype = new F();
  _sub.prototype.constructor = _sub;
}; 

App.Util.insertScript = function(id, url) {

  if (document.getElementById(id)) {
    return;
  }

  if (!this.head) {
    this.head = document.getElementsByTagName('head')[0];
  }

  var script = document.createElement('script');
  script.id = id;
  script.src = url;
  script.async = true;
  this.head.appendChild(script, this.insert);
};

App.Util.globalizeConfig = function(config) {
  for(var k in config) {
    window[k] = config[k];
  }
};