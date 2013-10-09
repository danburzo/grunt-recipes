{
  title: "Appendix A: Some useful Grunt plugins",
  slug: "appendix-plugins"
}

Here are some hand-picked plugins for your enjoyment. Most of the 'official' plugins (starting with `grunt-contrib`) are included. I've also included a few non-Grunt plugins (marked with `*`) because they play nice with the others.

### General purpose

These general purpose plugins operate on any text-based files.

Plugin 					| Description
------ 					| -----------
grunt-contrib-copy		| Copy files and folders from one location to another.
grunt-contrib-concat 	| Concatenate files.
grunt-contrib-clean 	| Delete files and folders from your project. You can use this to clean up if other tasks create temporary files.
grunt-contrib-watch 	| Watch for changes on files in your project and trigger other tasks. We discussed about this in _Chapter 6_.
grunt-contrib-compress 	| Create archives from your files.
grunt-contrib-symlink 	| Create symbolic links, for when you don't need to physically copy files.
grunt-rev 				| Prefix your files with a number representing their content, so each time you change the file, the output will have a different file name to bust the browser cache when you deploy it in production.

### Server-oriented

These plugins are geared towards running a web server locally.

Plugin 						| Description
------ 						| -----------
grunt-contrib-connect 		| Start a server to preview your changes or to facilitate other tasks, such as automated testing.
grunt-contrib-livereload 	| Reload your pages after each change you make. Works in conjunction with `grunt-contrib-connect` and `grunt-contrib-watch`.
\*connect-modrewrite		| When used in conjunction with `grunt-contrib-connect`, allows you to add mod-rewrite rules.


### CSS-specific

Plugins to work with various languages and frameworks that compile to CSS or to lint &amp; minify your stylesheets.

Plugin 					| Description
------ 					| -----------
grunt-contrib-less 		| Convert [LESS](http://lesscss.org/) to CSS.
grunt-contrib-sass 		| Convert [Sass](http://sass-lang.com/) to CSS.
grunt-contrib-stylus 	| Convert [Stylus](http://learnboost.github.io/stylus/) to CSS.
grunt-contrib-compass 	| Allows you to use the [Compass](http://compass-style.org/) framework for Sass.
grunt-recess 			| Use Twitter's RECESS module on top of LESS.
grunt-contrib-csslint 	| Lint tool for CSS.
grunt-contrib-cssmin 	| Minify your CSS files.
grunt-contrib-mincss 	| Another plugin for CSS minification.


### JavaScript-specific

These are plugins that work primarily on JavaScript and other languages that compile to JavaScript.

Plugin 					| Description
------ 					| -----------
grunt-contrib-coffee	| CoffeeScript to JavaScript.
grunt-contrib-jshint	| Lint tool for JavaScript. We talked about it in _Chapter 3_.
grunt-complexity		| Analyze the complexity of your code.
grunt-plato				| Analyze your code with Plato.

### HTML-specific

Plugin 						| Description
------ 						| -----------
grunt-contrib-handlebars	| Handlebars templates &rarr; JST.
grunt-contrib-jst 			| Underscore templates &rarr; JST.
grunt-contrib-jade 			| Jade templates &rarr; JST.
grunt-contrib-htmlmin		| Minify your HTML files by removing comments and irrelevant white space.
grunt-manifest				| Generate HTML5 cache manifest files for web sites that can run even when the device is not connected to the Internet.
grunt-usemin				| This plugin is composed of two tasks `useminPrepare` and `usemin`.

### Image-specific

Plugin 						| Description
------ 						| -----------
grunt-contrib-imagemin		| Minify images.
grunt-grunticon				| GruntIcon was created by Filament Group.
grunt-spritesmith			| Generate sprites from your image files.

### Automated testing

Plugin 						| Description
------ 						| -----------
grunt-contrib-jasmine		| Automatically builds and maintains your spec runner and runs your tests headlessly through phantomjs.
grunt-contrib-nodeunit		| Unit testing for Node.
grunt-contrib-qunit			| Run QUnit tests.
grunt-karma					| A Grunt plugin for the Karma test runner.

### Miscellaneous

Plugin 						| Description
------ 						| -----------
grunt-contrib-requirejs		| Build your RequireJS-powered app.
grunt-contrib-yuidoc		| Generate documentation from YUIDoc.

