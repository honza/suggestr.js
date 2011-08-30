fs = require 'fs'
{spawn} = require 'child_process'
jsp = require('uglify-js').parser
pro = require('uglify-js').uglify

header = """
/**
 * Suggestr.js - dead simple autocompleter
 * https://github.com/honza/suggestr.js
 *
 * Copyright 2011, Honza Pokorny
 * Released under the BSD license
 */
"""


uglify = (src, lib) ->
  code = fs.readFileSync src, 'utf-8'

  ast = jsp.parse code
  ast = pro.ast_mangle ast
  ast = pro.ast_squeeze ast
  min = pro.gen_code ast

  fs.writeFileSync lib, header + '\n' + min

task 'build', 'build all min versions and coffeescripts', (options) ->
  # Generate js from coffee/
  spawn 'coffee', ['-c', 'coffee']
  # Generate js from jquery-coffee/
  spawn 'coffee', ['-c', 'jquery-coffee']
  # Minify pure js version
  uglify 'pure-js/suggestr.js', 'pure-js/suggestr.min.js'
  # Minify jquery js version
  uglify 'jquery/jquery.suggestr.js', 'jquery/jquery.suggestr.min.js'
   
