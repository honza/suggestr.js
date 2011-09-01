# Suggestr - the dead simple autocompleter for jQuery
# Author: Honza Pokorny
# Usage: $('#input').suggestr ['John', 'Peter', 'Mark']
# URL: https://github.com/honza/suggestr.js
# License: BSD

(($) ->

  keyMap =
    up: 38
    down: 40
    enter: 13

  activeCss =
    listStyle: 'none'
    backgroundColor: '#ececec'

  inactiveCss =
    listStyle: 'none'
    backgroundColor: '#fff'

  boxCss =
    width: '200px'
    position: 'absolute'

  $.fn.suggestr = (data) ->

    that = @
    ui = document.getElementById('suggestr-div') or $('<div id="suggestr-div"></div>')
    ui.css boxCss
    ui.data 'active', 0

    reset = ->
      ui.data 'active', 0
      ui.children().remove()

    moveSelection = (direction) ->
      index = ui.data 'active'

      if direction is keyMap.up
        newIndex = index - 1
      else
        newIndex = index + 1

      if -1 < newIndex and newIndex < ui.children().length
        for child in ui.children()
          $(child).css inactiveCss
          $(ui.children()[newIndex]).css activeCss
          ui.data 'active', newIndex

    ui.delegate 'li', 'mouseover', ->
      $(@).css activeCss

    ui.delegate 'li', 'mouseout', ->
      $(@).css inactiveCss

    ui.delegate 'li', 'click', ->
      val = do $(@).text
      that.val val
      do reset

    @keydown (k) ->

      if k.keyCode is keyMap.enter
        val = do $(ui.children()[ui.data 'active']).text
        that.val val
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

    @keyup (k) ->

      if k.keyCode is keyMap.enter
        return

      if k.keyCode is keyMap.up or k.keyCode is keyMap.down
        return

      ui.children().remove()

      value = that.val().toLowerCase()

      if not value.length
        return

      for item in data
        if item.toLowerCase().indexOf(value) > -1
          regx = new RegExp "(?![^&;]+;)(?!<[^<>]*)(#{value})(?![^<>]*>)(?![^&;]+;)", "gi"
          item = item.replace regx, "<strong>$1</strong>"
          x = $ "<li>#{item}</li>"
          $(x).css inactiveCss
          ui.append x

      that.after ui
      ui.children().first().css activeCss

)(jQuery)
