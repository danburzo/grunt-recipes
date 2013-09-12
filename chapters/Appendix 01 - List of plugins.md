### Some useful Grunt plugins

Here are some handpicked plugins for your enjoyment. Most of the 'official' plugins (starting with `grunt-contrib`) are included.

#### General purpose

These general purpose plugins operate on any text-based files.

###### grunt-contrib-copy
Copy projects from one location to another.

###### grunt-contrib-concat
Concatenate files.

###### grunt-contrib-clean
Delete files and directories from your project. You can use this to clean up if other tasks create temporary files.

###### grunt-contrib-watch
Watch for changes on files in your projects and trigger other tasks. We discussed about this in _Chapter 6_.

###### grunt-contrib-compress
Create ZIP archives from your files.

###### grunt-contrib-symlink
Create symbolic links, for when you don't need to physically copy files.

#### Server

###### grunt-contrib-connect
Start a server to preview your changes or to facilitate other tasks, such as automated testing.

###### grunt-contrib-livereload
Reload your pages after each change you make. Works in conjunction with `grunt-contrib-connect` and `grunt-contrib-watch`.

#### CSS-specific

##### Preprocessing

###### grunt-contrib-less
[LESS](http://lesscss.org/) &rarr; CSS.

###### grunt-contrib-sass
[Sass](http://sass-lang.com/) &rarr; CSS.

###### grunt-contrib-stylus
[Stylus](http://learnboost.github.io/stylus/) &rarr; CSS.

###### grunt-contrib-compass
Allows you to use the [Compass](http://compass-style.org/) framework for Sass.

##### Others

###### grunt-contrib-csslint
Lint tool for CSS.

###### grunt-contrib-cssmin
Minify your CSS files.

###### grunt-contrib-mincss
Another plugin for CSS minification.


#### JavaScript-specific

###### grunt-contrib-coffee
CoffeeScript to JavaScript.

###### grunt-contrib-jshint
Lint tool for JavaScript. We talked about it in _Chapter 3_.

###### grunt-complexity
Analyze the complexity of your code.

###### grunt-plato
Analyze your code with Plato.

#### HTML-specific

##### Precompilation

###### grunt-contrib-handlebars
Handlebars templates &rarr; JST.

###### grunt-contrib-jst
Underscore templates &rarr; JST.

###### grunt-contrib-jade
Jade templates &rarr; JST.

##### Others

###### grunt-contrib-htmlmin
Minify your HTML files by removing comments and irrelevant white space.

###### grunt-manifest
Generate HTML5 cache manifest files for web sites that can run even when the device is not connected to the Internet.

#### Image-specific

###### grunt-contrib-imagemin
Minify images.

###### grunt-grunticon
GruntIcon was created by Filament Group.

#### Automated testing

###### grunt-contrib-jasmine
Automatically builds and maintains your spec runner and runs your tests headlessly through phantomjs.

###### grunt-contrib-nodeunit
Unit testing for Node.

###### grunt-contrib-qunit
Run QUnit tests.


#### Miscellaneous

###### grunt-contrib-requirejs
Build your RequireJS-powered app.

###### grunt-contrib-yuidoc
Generate documentation from YUIDoc.
