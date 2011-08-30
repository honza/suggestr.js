Suggestr.js
===========

Suggestr.js is a dead simple, no configuration javascript autocompleter. Drop
it in your project and it will work. No nonsense. No bloat.

Usage
-----

### jQuery

    $('#your-cool-input-field').suggestr(['John', 'Peter', 'Mark']);

### Pure JS

    var el = document.getElementById('input');
    suggestr(el, ['John', 'Peter', 'Mark']);


Size
----

### jQuery

* Minified: 1.3kb
* Gzipped: 671 bytes

### Pure JS

* Minified: 1.42kb
* Gzipped: 666 bytes

Note
----

A CoffeeScript version of this plugin is added for your convenience. The
`jquery.suggestr.js` file wasn't produced by compiling
`jquery.suggestr.coffee`. The same goes for the `pure-js` directory.

License
-------

BSD. Short and sweet.
