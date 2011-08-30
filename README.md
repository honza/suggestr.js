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

Note
----

A CoffeeScript version of this plugin is added for your convenience. The
`jquery.suggestr.js` file wasn't produced by compiling
`jquery.suggestr.coffee`. The same goes for the `pure-js` directory.

Building
--------

To build the project, first install its dependencies via `npm`.

    $ git clone git://github.com/honza/suggestr.js.git
    $ cd suggestr.js
    $ npm install

Then, you can run the build command.

    $ cake build

This uses CoffeeScript and Uglify to compile and minify the source files.

License
-------

BSD. Short and sweet.
