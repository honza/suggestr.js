(function() {
  (function() {
    var cache, keyMap, root;
    root = this;
    cache = 0;
    keyMap = {
      up: 38,
      down: 40,
      enter: 13
    };
    return root.suggestr = function(el, data) {
      var moveSelection, reset, ui;
      reset = function() {
        cache = 0;
        return ui.innerHTML = "";
      };
      moveSelection = function(direction) {
        var index, item, newIndex, _i, _len, _ref;
        index = cache;
        if (direction === keyMap.up) {
          newIndex = index - 1;
        } else {
          newIndex = index + 1;
        }
        if (-1 < newIndex && newIndex < ui.children.length) {
          _ref = ui.children;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            item.style.listStyle = 'none';
            item.style.backgroundColor = '#fff';
          }
          ui.children[newIndex].style.backgroundColor = '#ececec';
          return cache = newIndex;
        }
      };
      ui = document.createElement('div');
      ui.id = 'suggestr-div';
      ui.style.width = '200px';
      ui.style.position = 'absolute';
      el.parentNode.appendChild(ui);
      el.onkeydown = function(k) {
        var value;
        if (k.keyCode === keyMap.enter) {
          value = ui.children[cache].innerText;
          el.value = value;
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
      };
      return el.onkeyup = function(k) {
        var item, li, regex, value, _i, _len;
        if (k.keyCode === keyMap.enter) {
          return;
        }
        if (k.keyCode === keyMap.up || k.keyCode === keyMap.down) {
          return;
        }
        ui.innerHTML = "";
        value = el.value.toLowerCase();
        if (!value.length) {
          return;
        }
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          item = data[_i];
          if (item.toLowerCase().indexOf(value) > -1) {
            regex = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + value + ")(?![^<>]*>)(?![^&;]+;)", "gi");
            item = item.replace(regex, "<strong>$1</strong>");
            li = document.createElement('li');
            li.innerHTML = item;
            li.style.listStyle = 'none';
            li.style.backgroundColor = '#fff';
            li.onmouseover = function() {
              return this.style.backgroundColor = '#ececec';
            };
            li.onmouseout = function() {
              return this.style.backgroundColor = '#fff';
            };
            li.onclick = function() {
              el.value = this.innerText;
              return reset();
            };
            ui.appendChild(li);
          }
        }
        el.parentNode.appendChild;
        ui.firstChild.style.listStyle = 'none';
        return ui.firstChild.style.backgroundColor = '#ececec';
      };
    };
  })();
}).call(this);
