# Grunt Enlightenment

A book by Dan Burzo ([@danburzo](http://twitter.com/danburzo))

## About this book

This is a book about using Grunt to automate your web development workflow. You should have some basic experience in JavaScript, the language that drives Grunt, but don't get too hung up on that part. 

You can find the book on GitHub: https://github.com/danburzo/grunt-recipes. Contributions/corrections are always welcome. Always.



## Getting started

### Meet Grunt

Grunt is a task runner designed to automate the modern web development workflow. Repetitive tasks like unit testing, minifying your JavaScript and CSS, compiling your SASS stylesheets or CoffeeScripts, linting and many more can now be performed by running a single command. Grunt is open source (find it on GitHub: https://github.com/gruntjs/) and at the center of a wonderful ecosystem of thousands of plugins. Any tool you've used as part of your front-end workflow is likely to have a Grunt plugin. And if it doesn't, it's easy to roll out your own plugin and share it with the community.

### Resources

* http://gruntjs.com, Grunt's official page, with the guides & API reference;
* http://gruntjs.com/plugins, the list of all available Grunt plugins, with a handy search function;
* `#grunt` on `irc.freenode.net` to talk to the Grunt team.

### Get Grunt Up & Running

Grunt is written in JavaScript, so you will need a Node.js environment and the Node Package Manager that comes with it. 

#### Install Node

Go to http://nodejs.org/download/ and grab the installer for your operating system. It will install Node and NPM.

*Sidenote:* Working with Grunt means interacting with a shell, which Mac and Linux users are lucky enough to have readily available. As for Windows, let's just say I'd eat a live snail before I use the Command Prompt. Instead, I suggest you install Git for Windows &mdash; available at http://git-scm.com/downloads &mdash; that comes with a real shell and, seriously, who doesn't need Git on their machine anyways?

#### Install Grunt

We'll use NPM to install Grunt CLI (Command-Line Interpreter) from the console:

	npm install -g grunt-cli

**Note:** The `-g` flag stands for *global*, which makes Grunt CLI available from any folder on your machine.

That's it! You're ready to add Grunt magic to your projects.

#### Set up your first Grunt project

Let's create a new project:

	mkdir my-project
	cd my-project

There are two main files you need to create in the root directory of your project:

* `package.json`: this file is used to store NPM metadata such as the name and description of the project, and its dependencies;
* `Gruntfile.js`: this file is used to load and configure your grunt tasks.

##### package.json

Let's create a very basic version of this file:

	{
	  "name": "my-project", // the name of our project, hyphen-separated
	  "version": "0.0.0" // project version (in semantic format)
	}

Now, let's install Grunt in our current project:

	npm install grunt --save-dev

The `--save-dev` flag instructs NPM to update `package.json` and add `grunt` as a dependency to the project. Our file will now look like this:

	{
	  "name": "my-project",
	  "version": "0.0.0",

	  // the list of project dependencies
	  "devDependencies": {
	  	"grunt": "~0.4.1"
	  }
	}

In addition, you'll notice a `node_modules` directory added to your project. This is where all local NPM modules are installed -- like we just did with `grunt` -- and can be safely added to `.gitignore`.

*Did you know?* Running `npm install` in any project directory that has a `package.json` will install all its necessary dependencies with their appropriate versions, as listed in the `devDependencies` property.

##### Gruntfile.js

Let's create a Gruntfile next to our `package.json`. The basic format for the file is this:
	
	module.exports = function(grunt) {
	  // We'll do grunt stuff here soon!
	};

For example, let's write a task that just prints out `Hello World!` into the console:

	module.exports = function(grunt) {
	  grunt.registerTask('default', function() {
	  	grunt.log.write('Hello World!');
	  });
	};

And now to run it:
	
	grunt
	> Running "default" task
	> Hello World!

#### Take five

OK, let's recap what we've just done:

* We installed Node and Node Package Manager, which allows us to run Grunt and to quickly install all the necessary Grunt plugins;
* We installed Grunt CLI globally;
* We created a new, empty project;
* We added basic versions of `package.json` and `Gruntfile.js`;
* We ran `grunt` for the first time!

You can read more at: http://gruntjs.com/getting-started

## Recipes

It's time to make Grunt do some actual work for us. Through these recipes, we'll automate stuff like:

* Minifying and concatenating our CSS and JS files;
* Starting a local webserver;
* Watching for changes on files and running tasks accordingly.

In the process, we'll get familiar with some of the more popular Grunt plugins.

### Lint your JavaScript code

**Plugins used:** [`grunt-contrib-jshint`](https://npmjs.org/package/grunt-contrib-jshint).

A JavaScript linter is a tool that looks for syntax errors, bad practices and style inconsistencies in your code.


#### Install the JSHint plugin

	npm install grunt-contrib-jshint --save-dev

#### Load JSHint tasks into our Gruntfile

	module.exports = function(grunt) {
		grunt.loadNpmTasks('grunt-contrib-jshint');
	};

#### Confige the JSHint task

	module.exports = function(grunt) {
		grunt.initConfig({
			jshint: {
				all: ['scripts/*.js']
			}
		});
		grunt.loadNpmTasks('grunt-contrib-jshint');
	};
	
We added a call to `initConfig` for the `jshint` task. In it, we defined a single *target* called `all`. We told JSHint to look at all files with a `.js` extension within the `scripts` folder.

**Note:** Grunt tasks can have multiple configurations, named _targets_. This allows us to use different sets of options for the same task, depending on what we need. A common scenario is having a target for _development_ and one for _distribution_.

In defining the list of JavaScript files to lint, we've used a shorthand. This is the equivalent, more explicit version:

	jshint: {
		all: {
			files: ['scripts/*.js']
		}
	}

#### Run the JSHint task

In your project directory, run:
	
	grunt jshint:all

...to run the JSHint task with the `all` target. Or simply:

	grunt jshint

...which will runt jshint for all targets (of which we only have one anyways). In the output, you should see a list of all problems the tool found in the specified JavaScript files. This is great, albeit not so readable. Let's configure JSHint to output to a file rather than in the console:

	module.exports = function(grunt) {
		grunt.initConfig({
			jshint: {
				options: {
					reporterOutput: 'jshint.log'
				}
				all: ['scripts/*.js']
			}
		});
		grunt.loadNpmTasks('grunt-contrib-jshint');
	};

That's much better. Now we have the list of errors in a handy file in our project called `jshint.log`. Brilliant.

Here we've set `options` globall for _all targets_, but each target can have its own `options` property, in which case you need to renounce the shorthand and use the `files` property explicitly.

#### More JSHint options

We've just configured an output file to serve as an error log. Next, let's look at how to customize the kind of rules JSHint enforces. Armed with the [full list of JSHint flags](http://www.jshint.com/docs/options/), we can create a JSON file which we'll name `.jshintrc` into our root directory. It looks something like this:

	{
	  "curly": true,
	  "eqnull": true,
	  "eqeqeq": true,
	  "undef": true,
	  "globals": {
	    "jQuery": true
	  }
	}

Now, let's tell JSHint to look at this file for the rules to enforce:

	module.exports = function(grunt) {
		grunt.initConfig({
			jshint: {
				options: {
					jshintrc: '.jshintrc',
					reporterOutput: 'jshint.log'
				}
				all: ['scripts/*.js']
			}
		});
		grunt.loadNpmTasks('grunt-contrib-jshint');
	};

#### Take five

In this recipe, we've:

* installed and configured our first Grunt task;
* learned about targets and multitasks;

**Also check out:** [`grunt-contrib-csslint`](https://npmjs.org/package/grunt-contrib-csslint) for a similar lint tool for your CSS files.

### Build an app

### Precompile your CoffeeScript, SASS, LESS

### Start a server

### Watch for changes

## Write your own Grunt plugin

