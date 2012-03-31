// Suggestr - the dead simple autocompleter
//
// Copyright (c) 2011, Honza Pokorny
// Suggestr may be freely distributed under the BSD license.
// https://github.com/honza/suggestr.js

(function($) {

  var keyMap, activeCss, inactiveCss, boxCss;

  keyMap = {
    up: 38,
    down: 40,
    enter: 13
  };

  activeCss = {
    listStyle: 'none',
    backgroundColor: '#ececec'
  };

  inactiveCss = {
    listStyle: 'none',
    backgroundColor: '#fff'
  };

  boxCss = {
    width: '200px',
    position: 'absolute'
  };

  $.fn.suggestr = function(data) {

    var ui, that, value;
    that = this;

    ui = document.getElementById('suggestr-div') || $('<div id="suggestr-div"></div>');
    ui.css(boxCss);
    ui.data('active', 0);

    ui.delegate('li', 'mouseover', function() {
      $(this).css(activeCss);
    });

    ui.delegate('li', 'mouseout', function() {
      $(this).css(inactiveCss);
    });

    ui.delegate('li', 'click', function() {
      var val = $(this).text();
      that.val(val);
      reset();
    });

    function moveSelection(direction) {
      var index, newIndex;
      index = ui.data('active');

      if (direction == keyMap.up) {
        newIndex = index - 1;
      } else {
        newIndex = index + 1;
      }

      if (-1 < newIndex && newIndex < ui.children().length) {
        ui.children().each(function(i, item) {
          $(item).css(inactiveCss);
        });
        $(ui.children()[newIndex]).css(activeCss);
        ui.data('active', newIndex);
      }
    }

    function reset() {
      ui.data('active', 0);
      ui.children().remove();
    }

    this.blur(function(e) {
      ui.remove();
    });

    this.keydown(function(k) {

      if (k.keyCode == keyMap.enter) {
        var val = $(ui.children()[ui.data('active')]).text();

        that.val(val);
        reset();

        if (k.preventDefault) {
          k.preventDefault();
        } else {
          k.returnValue = false;
        }
        if (k.stopPropagation) {
          k.stopPropagation();
        }
        if (k.cancelBubble) {
          k.cancelBubble = true;
        }

        return false;
      }

      if (k.keyCode == keyMap.up || k.keyCode == keyMap.down) {
        moveSelection(k.keyCode);

        if (k.preventDefault) k.preventDefault();
          else k.returnValue = false;
        if (k.stopPropagation) k.stopPropagation();
        if (k.cancelBubble) k.cancelBubble = true;

        return false;
      }

    });

    this.keyup(function(k) {

      if (k.keyCode == keyMap.enter)
        return;

      if (k.keyCode == keyMap.up || k.keyCode == keyMap.down) {
        return;
      }

      ui.children().remove();

      value = that.val().toLowerCase();

      if (!value.length)
        return;

      $.each(data, function(index, item) {
        if (item.toLowerCase().indexOf(value) > -1) {
          var regx = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + value + ")(?![^<>]*>)(?![^&;]+;)", "gi");
          item = item.replace(regx, "<strong>$1</strong>");
          var x = $('<li>' + item + '</li>');
          $(x).css(inactiveCss);
          ui.append(x);
        }
      });

      that.after(ui);
      ui.children().first().css(activeCss);

    });

  };

})(jQuery);
