# Grunt Up & Running

A book by Dan Burzo ([@danburzo](http://twitter.com/danburzo))

## About this book

This is a book about using Grunt to automate your web development workflow. You should have some basic experience in JavaScript, the language that drives Grunt, but don't get too hung up on that part. 

You can find the book on GitHub: https://github.com/danburzo/grunt-recipes. Contributions/corrections are always welcome.

## Getting started

### Meet Grunt

Grunt is a task runner designed to automate the modern web development workflow. Repetitive tasks like unit testing, minifying your JavaScript and CSS, compiling your SASS stylesheets or CoffeeScripts, linting and many more can now be performed by running a single command. Grunt is open source (find it on GitHub: https://github.com/gruntjs/) and at the center of a wonderful ecosystem of thousands of plugins. Any tool you've used as part of your front-end workflow is likely to have a Grunt plugin. And if it doesn't, it's easy to roll out your own plugin and share it with the community.

Grunt was developed by Ben Alman a.k.a. [@cowboy](http://twitter.com/cowboy) and is used in projects like jQuery, Modernizr and [many others](http://gruntjs.com/who-uses-grunt). Here's him introducing it on the Bocoup blog: http://weblog.bocoup.com/introducing-grunt/


### Resources

* http://gruntjs.com, Grunt's official page, with the guides & API reference;
* http://gruntjs.com/plugins, the list of all available Grunt plugins, with a handy search function;
* [@gruntjs](https://twitter.com/gruntjs) on Twitter for updates;
* `#grunt` on `irc.freenode.net` to talk to the Grunt team.

### Get Grunt Up & Running

Grunt is written in JavaScript, so you will need a Node.js environment and the Node Package Manager that comes with it. 

#### Install Node

Go to http://nodejs.org/download/ and grab the installer for your operating system. It will install Node and NPM.

*Note:* Working with Grunt means interacting with a shell, which Mac and Linux users are lucky enough to have readily available. As for Windows, let's just say I'd eat a live snail before I use the Command Prompt. Instead, I suggest you install Git for Windows &mdash; available at http://git-scm.com/downloads &mdash; that comes with a real shell and, seriously, who doesn't need Git on their machine anyways?

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

In addition, you'll notice a `node_modules` directory added to your project. This is where all local NPM modules are installed &mdash; like we just did with `grunt` &mdash; and can be safely added to `.gitignore`.

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
* Starting a local web server;
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

* installed, configured and ran our first _real_ Grunt task;
* learned about targets and multitasks, both of which are wonderful things.

**Extra credits:** You can grab a very similar task [`grunt-contrib-csslint`](https://npmjs.org/package/grunt-contrib-csslint), and make it lint the CSS files in your project.
### Sassy Sass

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
### Pre-compile your Handlebars templates

**Plugins used:** [`grunt-contrib-handlebars`](https://npmjs.org/package/grunt-contrib-handlebars).

[Handlebars](http://handlebarsjs.com/) is a popular template library which helps you build HTML fragments populated with data from an object. A template looks something like:
	
	<div class="person">
	  <h1>{{name}}</h1>
	  <p>{{description}}</p>
	</div>

The portions between `{{` and `}}` are dynamic and are populated from the object you feed to the template. If you are not familiar with it, its homepage describes the library in more depth.

There are two basic ways to include Handlebars templates in your web application:

1. Inline them as strings in JavaScript: 

		var template = "<div class="person"><h1>{{name}}</h1><p>{{description}}</p></div>";

	This is bad because we're mixing JavaScript and HTML, and it's not too readable either.

2. Include them in the HTML inside `<script>` tags:

		<script type='text/x-handlebars' id='person-template'>
			<div class="person">
			  <h1>{{name}}</h1>
			  <p>{{description}}</p>
			</div>
		</script>

	This is somewhat better, but includes the extra step of querying the DOM for the script element and reading its content as a string (`element.innerHTML`). In addition, the HTML file containing all these templates can get quite large and unmaintainable.

Both techniques, as described, only get you to the point where you have the content of the template as a string. From hereon, you need to perform two additional steps:

1. First, compile the string into a template function;
2. Call the template function with a data object to get the HTML fragment.

Let's see how `grunt-contrib-handlebars` can make this all better.

#### The advantages of pre-compiling your templates

Here's what's in it for you: 

* You get to keep your templates in separate files, without the performance penalty of separate HTTP requests for each one;
* You make your app faster by skipping the DOM queries and the compilation step;
* You reduce the payload by including only the Handlebars Runtime library, which is smaller and faster, instead of the whole shebang.

Sold? Right, let's get on with it.

#### Install the `handlebars` task

	npm install grunt-contrib-handlebars --save-dev

and then add it to your Gruntfile:
	
	grunt.loadNpmTasks('grunt-contrib-handlebars');

#### Configuring the `handlebars` task

In its most basic form, we only need to define the _source_ and _destination_ files:

	handlebars: {
		all: {
			files: {
				"js/templates.js": ["templates/**/*.hbs"]
			}
		}
	}

Let's run this to see what happens:
	
	grunt handlebars

Grunt will take all files with a `.hbs` extension from the `templates` folder and all its sub-folders and merge them into a single file called `templates.js`, which looks something like this:

[[ INSERT CODE EXAMPLE ]] 

You can now include a single file in your HTML:

	<script type='text/javascript' src='js/templates.js'></script>

and in your JavaScript code, you access the templates as follows:

	var personTemplate = JST['person']; // presto!

#### More customization

In real life, you'll probably want to add the templates under your application's namespace &mdash; something like `MyApp.Templates` &mdash; instead of `JST`. This is done using the `namespace` option:

	handlebars: {
		options: {
			namespace: 'MyApp.Templates'
		},
		all: {
			files: {
				"js/templates.js": ["templates/**/*.hbs"]
			}
		}
	}

Let's also configure how template names are generated for each file, using the `processName` option. We define a function which takes one argument (the file path) and returns the string to use as the template name:

	options: {
		processName: function(filePath) {

			// split path at slash, hyphen and space
			var parts = filePath.split(/[\/\-\s]/); 
			
			// capitalize each part, starting from the second
			for (var i = 1; i < parts.length; i++) {
				parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].substr(1);
			}

			// restore the string and return it
			return parts.join('');
		}
	}

In the example above, we're transforming the template path into a camel-case name:

	templates/product/detail.hbs -> 'productDetail'

#### Take five

In this recipe, we made Handlebars templates better in terms of speed and maintainability. In fact, if you install Handlebars syntax highlighting in your favorite editor (I use Sublime Text), you'll get even more clarity by keeping your templates in separate `.hbs` files.
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


#### Tweaking the watch behavior

By default, `watch` looks for three kinds of changes: 

* files that were _added_ to the project and match the pattern;
* matching files files that were _deleted_;
* matching files that were _changed_. 

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

This will make the watch ignore changes in existing Handlebars templates and only react when we add or remove Handlebars templates.

Alrighty then.

There's one little quirk we need to address: the `watch` task will only pick up on changes that happen _after_ we call `grunt task`. We'd like to make sure our generated CSS and compiled templates are up-to-date when the watch starts. For this, we will use `atBegin: true` to run _all tasks_ associated with the watch before the actual watching begins. Because we want this behavior for both Sass and Handlebars files, we will add this option on the task directly rather than on each target:

	watch: {
		options: {
			atBegin: true
		},
		sass: {
			files: ['scss/**/*.scss'],
			tasks: ['sass']
		},
		handlebars: {
			files: ['templates/**/*.hbs'],
			tasks: ['handlebars']
		}
	}


#### Take five

In this recipe, we've:

* learned how to use `watch` to trigger other tasks automatically when you make changes to your files;
* configured the types of events the watch responds to;
* run the associated tasks at the beginning of the watch process to make sure everything is up to date.


### Start a server

**Using:** [`grunt-contrib-connect`](https://npmjs.org/package/grunt-contrib-connect)

#### Install the `connect` task

	npm install grunt-contrib-connect --save-dev

and then load it into  your Gruntfile:
	
	grunt.loadNpmTasks('grunt-contrib-connect');

#### Configure a persistent server

To create a persistent server (one which does not stop after Grunt tasks have completed), we will use `keepalive: true`:

	connect: {
		server: {
			options: {
				keepalive: true
			}
		}
	}

We've created a single target called `server` for our `connect` task.

#### Run your server

	grunt connect:server

Now go to http://localhost:8000 and you should be able to browse your app, and see your `index.html` if you have one.

#### More server configuration

You can customize the host name, port and protocol for your server:

	connect: {
		server: {
			options: {
				keepalive: true,
				protocol: 'https',
				hostname: 'myapp',
				port: '8080'
			}
		}
	}

The code above makes the server available at https://myapp:8080. This is useful in the case you want to start several servers at once, with different base directories, as in the example below:

	connect: {
		first: {
			options: {
				keepalive: true,
				hostname: 'firstsite',
				base: 'first-site'
			}
		},
		second: {
			options: {
				keepalive: true,
				hostname: 'secondsite',
				base: 'second-site'
			}
		}
	}

This makes the directories `first-site` and `second-site` from your project available at http://firstite:8000 and http://secondsite:8000, respectively.

#### Take five

In this recipe, we've learned how to use the `connect` task to start a local server.
### Build an app for deployment

By now, you should be comfortable with working with one task at a time. It's time to really make Grunt shine by integrating the variety of tasks involved in preparing a web application for deployment, such as precompiling, minifying, concatenating and moving files around.

#### What we're trying to accomplish

We want to take our main HTML file, identify all the stylesheets and scripts it references, optimize those (e.g. minification, concatenation) and then update the references from the HTML with the optimized version.

At the end of the task, we want to have a `dist` folder that contains the optimized version of our project, readily deployable to a production environment.

#### Tasks we'll use in this recipe

* [`grunt-contrib-uglify`](https://npmjs.org/package/grunt-contrib-uglify) to minify JavaScript;
* [`grunt-contrib-cssmin`](https://npmjs.org/package/grunt-contrib-cssmin) to minify CSS;
* [`grunt-contrib-htmlmin`](https://npmjs.org/package/grunt-contrib-htmlmin) to minify gruntde;
* [`HTML-contrib-concat`](https://npmjs.org/package/grunt-contrib-concat) to concatenate files;
* [`grunt-contrib-copy`](https://npmjs.org/package/grunt-contrib-copy) to copy files and folders;
* [`grunt-usemin`](https://github.com/yeoman/grunt-usemin) to replaces references to scripts and stylesheets in HTML files with their optimized versions.

Now, don't get too intimidated! If you think about it each task has a very specific purpose in the workflow, and you'll see how easy is to choreograph them into one fluent, beautiful task.

#### Let's install everything

	npm install grunt-contrib-uglify grunt-contrib-concat grunt-contrib-cssmin grunt-contrib-htmlmin grunt-contrib-copy grunt-usemin --save-dev

... in one fell swoop, even. Now let's add all of it to our Gruntfile:

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-usemin');

#### Basic configuration

	grunt.initConfig({

		// Minimize tasks
		cssmin: {
			all: {
				files: {
					'dist/css/app.css': 'app/css/**/*.css'
				}
			}
		},

		htmlmin: {
			all: {
				files: [{
					expand: true,
					cwd: 'app/',
					src: '**/*.html',
					dest: 'dist/'
				}]
			}
		},

		// Move other things around
		copy: {
			all: {
				files: [{
					expand: true,
					cwd: 'app/',
					dest: 'dist/',
					src: [
						'.htaccess',
						'*.ico',
						'images/**/*.{jpg,png,gif}',
						'css/fonts/*'
					]		
				}]
			}
		}

	});

Let's take the code above apart, piece by piece.

First, we configure the `cssmin` task to take all stylesheets from `app/css` and minimize and concatenate them in a single file in `dist/css` called `app.css`.
We do the same for HTML, except we're using a dynamic declaration of the files object since we want to have a separate HTML file in the `dist` folder for each HTML in our `app` folder.

Then we configure the `copy` task to copy into the `dist` folder one by one any files not already covered by the other tasks &mdash; stuff like icons, images, fonts, etc.  

We already notice we've been using `app` and `dist` a lot, so let me take this moment to introduce a handy way to Not Repeat Yourself: enter **Grunt templates**. They are tiny dynamic snippets delimited by `<%` and `%>` that you can add to your strings. We're interested in templates of the form `<%= object.property.path %>` which expands to the corresponding value from Grunt's configuration object. Let's see it in action:

	grunt.initConfig({

		appConfig: {
			appRoot: 'app',
			distRoot: 'dist'
		},

		// Minimize tasks
		cssmin: {
			all: {
				files: {
					'<%= appConfig.distRoot %>/css/app.css': '<%= appConfig.appRoot %>/css/**/*.css'
				}
			}
		},

		htmlmin: {
			all: {
				files: [{
					expand: true,
					cwd: '<%= appConfig.appRoot %>/',
					src: '**/*.html',
					dest: '<%= appConfig.distRoot %>'
				}]
			}
		},

		// Move other things around
		copy: {
			all: {
				files: [{
					expand: true,
					cwd: '<%= appConfig.appRoot %>/',
					dest: '<%= appConfig.distRoot %>',
					src: [
						'.htaccess',
						'*.ico',
						'images/**/*.{jpg,png,gif}',
						'css/fonts/*'
					]		
				}]
			}
		}

	});

We've defined an `appConfig` property to hold our commonly-used paths. Now we can refer to the two paths as `<%= appConfig.appRoot %>` and `<%= appConfig.distRoot %>` in all our tasks.

**Note:** You can define any number of custom properties in your Grunt configuration (like we did above with `appConfig`), but make sure the names don't conflict with any task names and stay away from the `grunt` keyword, which is reserved to access the Grunt object in the templates.

Another cool thing we can do is to get a timestamp for the current Grunt run and add that to the generated CSS/JS files to ensure they are unique.

	{
		appConfig: {
			appRoot: 'app',
			distRoot: 'dist',
			timestamp: Date.now()
		}
	}

And here's how we might use this to append the timestamp to our generated CSS file in `cssmin`:

	cssmin: {
		all: {
			files: {
				'<%= appConfig.distRoot %>/css/app.<%= appConfig.timestamp %>.css': '<%= appConfig.appRoot %>/css/**/*.css'
			}
		}
	}
### Loading external data in our tasks

Grunt provides two methods for loading external data into the Gruntfile:

* `grunt.file.readJSON()` to load an external JSON file;
* `grunt.file.readYAML()` to load an external YAML file;

Let's use `readJSON()` for something fun like automatically loading all the tasks defined in `package.json`:

	module.exports = function(grunt) {

		// load `package.json`
		var package = grunt.file.readJSON('package.json');
		
		// check if we have any dependencies
		if (package.devDependencies) {

			// filter out the ones that don't start with `grunt-`
			var gruntTasks = Object.keys(package.devDependencies).filter(function(task) {
				return task.indexOf('grunt-') === 0;	
			});

			// load each task
			gruntTasks.forEach(grunt.loadNpmTasks);
		}
	};

**Note:** `readJSON()` only accepts _valid_ JSON-files, while `package.json` can be JSON-like and still work with `npm install`. The most common JSON-like-but-not-quite-JSON thing it might contain are comments, which work perfectly fine with the NPM installer but will break the above script.

### Files, in-depth
http://gruntjs.com/configuring-tasks#files

### Using variables/templates

## Write your own Grunt plugin