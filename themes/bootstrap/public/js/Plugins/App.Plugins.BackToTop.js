App.Plugins.BackToTop = function(element) {
  this.element = element ? $(element) : $(window);
  this.isScrolling = false;
  this.createTopElement();
  this.bindEvents();
};

App.Plugins.BackToTop.prototype.createTopElement = function() {
  this.topElement = $('<a href="#" id="backtotop" class="btn" />').appendTo('body');
  this.topElement.append('<i class="icon icon-chevron-up" />');
};

App.Plugins.BackToTop.prototype.bindEvents = function() {
  
  this.topElement.on('click', function(e) {
    e.preventDefault();
    $('html,body').animate({ scrollTop: 0 }, 'slow');
  });
  
  $(window)
  .on('scroll', $.proxy(function(){
    this.isScrolling = true;
  }, this))
  .trigger('scroll');

  setInterval($.proxy(this.onWindowScroll, this), 250);
};

App.Plugins.BackToTop.prototype.onWindowScroll = function() {
  if (this.isScrolling) {
    this.isScrolling = false;
    if ($(window).scrollTop() > 200) {
      if (!this.hasShown) {
        this.hasShown = true;
        this.topElement.fadeIn(200);
      }
    } else {
      if (this.hasShown) {
        this.hasShown = false;
        this.topElement.fadeOut(100);
      }
    }
  }
};