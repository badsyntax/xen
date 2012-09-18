module.exports = exports = {
  breadcrumbs: [],
  set: function(breadcrumbs) {
    this.breadcrumbs = breadcrumbs;
  },
  add: function(breadcrumb) {
    this.breadcrumbs.push( breadcrumb );
  },
  get: function() {
    this.breadcrumbs[ this.breadcrumbs.length - 1 ].last = true;
    return this.breadcrumbs;
  }
};