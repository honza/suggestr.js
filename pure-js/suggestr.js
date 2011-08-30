/*
 * Suggestr - the dead simple autocompleter for jQuery
 * Author: Honza Pokorny
 * Usage: 
 *  var el = document.getElementById('input');
 *  suggestr(el, ['John', 'Peter', 'Mark']);
 * URL: https://github.com/honza/suggestr.js
 * License: BSD
 *
 */

(function() {

  var root = this;

  // keep track of current item
  var cache = 0;

  var keyMap = {
    up: 38,
    down: 40,
    enter: 13
  };

  root.suggestr = function(el, data) {

    function reset() {
      cache = 0;
      ui.innerHTML = "";
    }

    function moveSelection(direction) {
      var index = cache;
      var newIndex;

      if (direction == keyMap.up) {
        newIndex = index - 1;
      } else {
        newIndex = index + 1;
      }

      if (-1 < newIndex && newIndex < ui.children.length) {

        // loop over through all children

        for (var i=0; i < ui.children.length; i++) {
          var item = ui.children[i];
          item.style.list_style = 'none';
          item.style.backgroundColor = '#fff';
        }

        ui.children[newIndex].style.backgroundColor = '#ececec';
        cache = newIndex;

      }

    }

    var ui, that, value, i, regex;

    // prepare ui
    ui = document.createElement('div');
    ui.id = 'suggestr-div';
    ui.style.width = '200px';
    ui.style.position = 'absolute';

    el.parentNode.appendChild(ui);

    el.onkeydown = function(k) {
      if (k.keyCode == keyMap.enter) {
        value = ui.children[cache].innerText;
        el.value = value;
        reset();

        if (k.preventDefault) k.preventDefault();
          else k.returnValue = false;
        if (k.stopPropagation) k.stopPropagation();
        if (k.cancelBubble) k.cancelBubble = true;

        return false;
      }

    };

    el.onkeyup = function(k) {

      if (k.keyCode == keyMap.enter)
        return;

      if (k.keyCode == keyMap.up || k.keyCode == keyMap.down) {
        moveSelection(k.keyCode);
        return;
      }

      ui.innerHTML = "";

      value = el.value.toLowerCase();

      if (!value.length)
        return;

      for (i=0; i < data.length; i++) {
        if (data[i].toLowerCase().indexOf(value) > -1) {
          regex = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + value + ")(?![^<>]*>)(?![^&;]+;)", "gi");
          var item = data[i].replace(regex, "<strong>$1</strong>");

          var li = document.createElement('li');
          li.innerHTML = item;
          li.style.listStyle = 'none';
          li.style.backgroundColor = '#fff';

          li.onmouseover = function() {
            this.style.backgroundColor = '#ececec';
          };

          li.onmouseout = function() {
            this.style.backgroundColor = '#fff';
          };

          li.onclick = function() {
            el.value = this.innerText;
            reset();
          };

          ui.appendChild(li);
        }
      }

      el.parentNode.appendChild(ui);
      ui.firstChild.style.listStyle = 'none';
      ui.firstChild.style.backgroundColor = '#ececec';

    };

  };

})();
