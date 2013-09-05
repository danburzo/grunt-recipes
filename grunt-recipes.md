# Grunt Up & Running

A book by Dan Burzo ([@danburzo](http://twitter.com/danburzo))

## About this book

This is a book about using Grunt to automate your web development workflow. You should have some basic experience in JavaScript, the language that drives Grunt, but don't get too hung up on that part. 

You can find the book on GitHub: https://github.com/danburzo/grunt-recipes. Contributions/corrections are always welcome. Always.



## Getting started

### Meet Grunt

Grunt is a task runner designed to automate the modern web development workflow. Repetitive tasks like unit testing, minifying your JavaScript and CSS, compiling your SASS stylesheets or CoffeeScripts, linting and many more can now be performed by running a single command. Grunt is open source (find it on GitHub: https://github.com/gruntjs/) and at the center of a wonderful ecosystem of thousands of plugins. Any tool you've used as part of your front-end workflow is likely to have a Grunt plugin. And if it doesn't, it's easy to roll out your own plugin and share it with the community.

Grunt was developed by Ben Altman a.k.a. [@cowboy](http://twitter.com/cowboy) and is used in projects like jQuery, Modernizr and [many others](http://gruntjs.com/who-uses-grunt). Here's him introducing it on the Bocoup blog: http://weblog.bocoup.com/introducing-grunt/


### Resources

* http://gruntjs.com, Grunt's official page, with the guides & API reference;
* http://gruntjs.com/plugins, the list of all available Grunt plugins, with a handy search function;
* [@gruntjs](https://twitter.com/gruntjs) on Twitter for updates;
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

This is because `grunt-contrib-jshint` (along with most other Grunt tasks) is a so-called _multitask_. 

**Note:** Multitasks invoked without an explicit target will run for all targets. 

In the output, you should see a list of all problems the tool found in the specified JavaScript files. This is great, albeit not so readable. Let's configure JSHint to output to a file rather than in the console:

	module.exports = function(grunt) {
		grunt.initConfig({
			jshint: {
				options: {
					reporterOutput: 'jshint.log'
				}
				all: {
					files: ['scripts/*.js']
				}
			}
		});
		grunt.loadNpmTasks('grunt-contrib-jshint');
	};

That's much better. Now we have the list of errors in a handy file in our project called `jshint.log`. Brilliant.

Here we've set `options` globally for _all targets_, but each individual target can have its own `options` property. Target-level options will override the task-level options. 

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
				all: {
					files: ['scripts/*.js']
				}
			}
		});
		grunt.loadNpmTasks('grunt-contrib-jshint');
	};

#### Take five

In this recipe, we've:

* installed and configured our first Grunt task;
* learned about targets and multitasks;

**Also check out:** [`grunt-contrib-csslint`](https://npmjs.org/package/grunt-contrib-csslint) for a similar lint tool for your CSS files.

### Sassy CSS

**Plugins used:** [`grunt-contrib-sass`](https://npmjs.org/package/grunt-contrib-sass).

**Note:** To make `grunt-contrib-sass` work, you also need to have Ruby and Sass installed. To check if you have ruby installed, type `ruby -v` in the console. When you've confirmed you have Ruby installed, run `gem install sass` to install Sass.

#### Install the Sass plugin

	npm install -g grunt-contrib-sass --save-dev

and then, in our Gruntfile:

	grunt.loadNpmTasks('grunt-contrib-sass');

#### Configure the `sass` task

We'll create a single target called `all` for our task. We'll then define a list of source/destination pairs in the `files` property:

	module.exports = function(grunt) {
		grunt.initConfig({
			sass: {
				all: {
					files: {
						'css/main.css': 'scss/main.scss',
						'css/homepage.css': 'scss/homepage.scss'
					}
				}
			}
		});
		grunt.loadNpmTasks('grunt-contrib-sass');
	};

If you've read through the previous recipe, you'll recall that the `files` property accepted an array of comma-separated file paths. Turns out there are a host of ways to describe the files your tasks needs to operate on, but we'll talk about that later. For now, let's examine this form:

	files: {
		'css/main.css': 'scss/main.scss',
		'css/homepage.css': 'scss/homepage.scss'
	}

We've defined `files` as an object with key/value pairs correspond to _destination-file_/_source-file_. 

#### Run the `sass` ask

Let's run our task to see how it works:

	grunt sass

### 

This means that for each new Sass file that you add to your project, you'll need to edit your Gruntfile to include a new source/destination pair in your `sass` task. Not too sexy. 

Let's fix that by _building the files object dynamically_:

	files: [{
		expand: true,
		cwd: 'scss/',
		src: ['*.scss'],
		dest: 'css/',
		ext: '.css'
	}]

Okay, take a deep breath! There's a lot going on in the few lines above. First, we've moved back to `files` as an array, but instead of strings describing single paths, we now have objects describing source/destination mappings. How is it done? Let's look at each property:

* `expand` is set to `true` so that we can use the properties below:
* `cwd` (current working directory) is the common path to all the source files; in our case, all `.scss` files are inside the `scss` folder (note the trailing slash character);
* `src` is an array of one or more patterns to match, relative to `cwd`;
* `dest` is the counterpart to `cwd` and describes the destination path prefix; in other words, this is the destination folder for all our generated CSS files;
* `ext` is the new extension for the destination files; in our case, we want all `.scss` files to become `.css` files.

In plain words, the previous construct reads as: 

> Run all files with the `.scss` extension from the `scss` folder through the `sass` task and place the resulting files in the `css` folder, each with their original names but with the `.css` extension instead of `.scss`.

If you run `grunt sass` again, you'll notice that everything still works, but with the added benefit that we add/remove Sass files to your project and they'll be picked up by the sass task without having to update the Gruntfile each time.

#### Take five

In this recipe, we've learned:

* to write multiple source/destination pairs for the files used by our task;
* to define these pairs dynamically so we don't have to maintain them, one by one, for all eternity.

### Precompile your Handlebars templates

**Plugins used:** [`grunt-contrib-handlebars`](https://npmjs.org/package/grunt-contrib-handlebars).


### Files, in-depth
http://gruntjs.com/configuring-tasks#files

### Watch for changes

**Plugins used:** [`grunt-contrib-watch`](https://npmjs.org/package/grunt-contrib-watch).

In the previous recipes, we saw how we can compile our Sass files into CSS files and merge your Handlebars templates into a single JST file. It is somewhat magical, but to run `grunt sass` after every change is far from being productive. Let's take this up a notch and make our files recompile automatically every time they change. For this, we will use the `watch` task provided by `grunt-contrib-watch`. 

As usual, let's install it in our project:

	npm install grunt-contrib-watch

and load the tasks in our Gruntfile, next to our Sass task:

	module.exports = function(grunt) {
		grunt.initConfig({
			sass: {
				all: {
					files: {
						'main.css': 'main.scss',
						'homepage.css': 'homepage.scss'
					}
				}
			}
		});
		grunt.loadNpmTasks('grunt-contrib-sass');
		grunt.loadNpmTasks('grunt-contrib-watch');
	};

#### Configuring the `watch` task

There are really only two things to define:

* which files we need to watch;
* what task(s) to run when the files change.

So let's go ahead and do that:

	module.exports = function(grunt) {
		grunt.initConfig({
			sass: {
				all: {
					files: {
						'css/main.css': 'scss/main.scss',
						'css/homepage.css': 'scss/homepage.scss'
					}
				}
			},

			watch: {
				sass: {
					files: ['scss/**/*.scss'],
					tasks: ['sass']
				},
				handlebars: {
					files: ['templates/**/*.hbs'],
					tasks: ['handlebars']
				}
			}
		});
		grunt.loadNpmTasks('grunt-contrib-sass');
		grunt.loadNpmTasks('grunt-contrib-watch');
	};

We've created two targets for our `watch` task, one for watching the Sass files and one for watching the Handlebars templates. In both instances, we've used _wildcards_ to define patterns to match the desired files. In effect, the `scss/**/*.scss` pattern is similar to `scss/*.scss` (i.e. match all files with the `.scss` extension within the `scss` folder) with the exception that the former looks into subfolders as well. When any of the files change, the associated task is executed. 

Let's check it out in action:
	
	grunt watch

Because `watch` is a _multitask_, what we're actually saying with the above command is:

	grunt watch:sass watch:handlebars


Now go ahead and change one of your Sass files, and notice that the `sass` task is run. At the same time, if a Handlebars template changes, the `handlebars` task is run.

By default, `watch` looks for three kinds of changes: 

* files that were _added_ and match the pattern;
* files that were _deleted_ and match the pattern;
* files that were _changed_. 

This behavior is controlled by the `events` option, which can have one or many of the values: `all` (the default), `changed`, `added` and `deleted`. Let's assume we want to run the `handlebars` task only when a template is added or deleted &mdash; an no, it doesn't make sense in a real-world scenario, but go with me:

	watch: {
		handlebars: {
			files: ['templates/**/*.hbs'],
			tasks: ['handlebars'],
			options: {
				events: ['added', 'deleted']
			}
		}
	}

#### Take five

In this recipe, we've learned how to use `watch` task to trigger other tasks automatically when you make changes to your files.

### Using variables/templates

### Start a server

### Build an app

## Write your own Grunt plugin

