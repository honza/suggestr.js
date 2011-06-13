/*
 * Suggestr - the dead simple autocompleter for jQuery
 * Author: Honza Pokorny
 * Usage: $('#input').suggestr(['John', 'Peter', 'Mark']);
 * URL: https://github.com/honza/suggestr.js
 * License: BSD
 *
 */

(function($) {
  
  var keyMap = {
    up: 38,
    down: 40,
    enter: 13
  };

  var activeCss = {
    listStyle: 'none',
    backgroundColor: '#ececec'
  };

  var inactiveCss = {
    listStyle: 'none',
    backgroundColor: '#fff'
  };

  var boxCss = {
    width: '200px'
  };

  $.fn.suggestr = function(data) {

    var ui, that, value;
    that = this;

    ui = $('<div id="suggestr-div"></div>');
    ui.css(boxCss);

    ui.delegate('li', 'mouseover', function() {
      $(this).css(activeCss);
    });

    ui.delegate('li', 'mouseout', function() {
      $(this).css(inactiveCss);
    });

    ui.delegate('li', 'click', function() {
      var val = $(this).text();
      that.val(val);
      ui.children().remove();
    });

    this.keyup(function(k) {

      if (k.keyCode == keyMap.enter) {
        var val = ui.children().first().text();
        that.val(val);
        ui.children().remove();
        return;
      }

      ui.children().remove();

      value = that.val().toLowerCase();

      if (!value.length)
        return;

      $.each(data, function(index, item) {
        if (item.toLowerCase().indexOf(value) > -1)
          var x = $('<li>' + item + '</li>');
          $(x).css(inactiveCss);
          ui.append(x);
      });
    
      that.after(ui);
      ui.children().first().css(activeCss);

    });

  };

})(jQuery);
