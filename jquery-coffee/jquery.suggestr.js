(function() {
  (function($) {
    var activeCss, boxCss, inactiveCss, keyMap;
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
    return $.fn.suggestr = function(data) {
      var moveSelection, reset, that, ui;
      that = this;
      ui = $('<div id="suggestr-div"></div>');
      ui.css(boxCss);
      ui.data('active', 0);
      reset = function() {
        ui.data('active', 0);
        return ui.children().remove();
      };
      moveSelection = function(direction) {
        var child, index, newIndex, _i, _len, _ref, _results;
        index = ui.data('active');
        if (direction === keyMap.up) {
          newIndex = index - 1;
        } else {
          newIndex = index + 1;
        }
        if (-1 < newIndex && newIndex < ui.children().length) {
          _ref = ui.children();
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            child = _ref[_i];
            $(child).css(inactiveCss);
            $(ui.children()[newIndex]).css(activeCss);
            _results.push(ui.data('active', newIndex));
          }
          return _results;
        }
      };
      ui.delegate('li', 'mouseover', function() {
        return $(this).css(activeCss);
      });
      ui.delegate('li', 'mouseout', function() {
        return $(this).css(inactiveCss);
      });
      ui.delegate('li', 'click', function() {
        var val;
        val = $(this).text();
        that.val(val);
        return reset();
      });
      this.keydown(function(k) {
        var val;
        if (k.keyCode === keyMap.enter) {
          val = $(ui.children()[ui.data('active')]).text();
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
        if (k.keyCode === keyMap.up || k.keyCode === keyMap.down) {
          moveSelection(k.keyCode);
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
      });
      return this.keyup(function(k) {
        var item, regx, value, x, _i, _len;
        if (k.keyCode === keyMap.enter) {
          return;
        }
        if (k.keyCode === keyMap.up || k.keyCode === keyMap.down) {
          return;
        }
        ui.children().remove();
        value = that.val().toLowerCase();
        if (!value.length) {
          return;
        }
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          item = data[_i];
          if (item.toLowerCase().indexOf(value) > -1) {
            regx = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + value + ")(?![^<>]*>)(?![^&;]+;)", "gi");
            item = item.replace(regx, "<strong>$1</strong>");
            x = $("<li>" + item + "</li>");
            $(x).css(inactiveCss);
            ui.append(x);
          }
        }
        that.after(ui);
        return ui.children().first().css(activeCss);
      });
    };
  })(jQuery);
}).call(this);
