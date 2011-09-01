# Suggestr - the dead simple autocompleter for jQuery
# Author: Honza Pokorny
# Usage:
#   el = document.getElementById 'input'
#   suggestr el, ['John', 'Peter', 'Mark']
# URL: https://github.com/honza/suggestr.js
# License: BSD

do ->

  root = @

  cache = 0

  keyMap =
    up: 38
    down: 40
    enter: 13

  root.suggestr = (el, data) ->

    reset = ->
      cache = 0
      ui.innerHTML = ""

    moveSelection = (direction) ->
      index = cache

      if direction is keyMap.up
        newIndex = index - 1
      else
        newIndex = index + 1

      if -1 < newIndex and newIndex < ui.children.length

        for item in ui.children
          item.style.listStyle = 'none'
          item.style.backgroundColor = '#fff'

        ui.children[newIndex].style.backgroundColor = '#ececec'
        cache = newIndex

    ui = document.getElementById 'suggestr-div'
    unless ui
      ui = document.createElement 'div'
      ui.id = 'suggestr-div'
      ui.style.width = '200px'
      ui.style.position = 'absolute'

    el.parentNode.appendChild ui

    el.onblur = (e) ->
      try
        el.parentElement.removeChild ui
      catch e

    el.onkeydown = (k) ->
      if k.keyCode is keyMap.enter
        value = ui.children[cache].innerText
        el.value = value
        do reset

        if k.preventDefault
          do k.preventDefault
        else
          k.returnValue = false

        if k.stopPropagation
          do k.stopPropagation

        if k.cancelBubble
          k.cancelBubble = true

        return false

      if k.keyCode is keyMap.up or k.keyCode is keyMap.down
        moveSelection k.keyCode

        if k.preventDefault
          do k.preventDefault
        else
          k.returnValue = false

        if k.stopPropagation
          do k.stopPropagation

        if k.cancelBubble
          k.cancelBubble = true

        return false

    el.onkeyup = (k) ->

      if k.keyCode is keyMap.enter
        return

      if k.keyCode is keyMap.up or k.keyCode is keyMap.down
        return

      ui.innerHTML = ""

      value = do el.value.toLowerCase

      if not value.length
        return

      for item in data
        if item.toLowerCase().indexOf(value) > -1
          regex = new RegExp "(?![^&;]+;)(?!<[^<>]*)(" + value + ")(?![^<>]*>)(?![^&;]+;)", "gi"
          item = item.replace regex, "<strong>$1</strong>"

          li = document.createElement 'li'
          li.innerHTML = item
          li.style.listStyle = 'none'
          li.style.backgroundColor = '#fff'

          li.onmouseover = ->
            @style.backgroundColor = '#ececec'

          li.onmouseout = ->
            @style.backgroundColor = '#fff'

          li.onclick = ->
            el.value = @innerText;
            do reset

          ui.appendChild li

      el.parentNode.appendChild

      if ui.children.length > 0
        ui.firstChild.style.listStyle = 'none'
        ui.firstChild.style.backgroundColor = '#ececec'
