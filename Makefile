# Minify all source files
all:
	uglifyjs jquery/jquery.suggestr.js > jquery/jquery.suggestr.min.js
	uglifyjs pure-js/suggestr.js > pure-js/suggestr.min.js
