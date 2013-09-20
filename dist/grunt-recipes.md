# Grunt Up & Running

A book by Dan Burzo ([@danburzo](http://twitter.com/danburzo))

## About this book

This is a book about using Grunt to automate your web development workflow. It covers Grunt v0.4.x.

It's based on the [Grunt Documentation](http://gruntjs.com/getting-started) and [API Reference](http://gruntjs.com/api/grunt) and takes cues from Belén Albeza's excellent primer [_Power-up Your Front-End Development with Grunt_](https://leanpub.com/grunt), which I encourage you to take a look at.

You can find the book on GitHub: https://github.com/danburzo/grunt-recipes. Contributions & corrections are always welcome.

## Getting started

### Meet Grunt

Grunt was created by Ben Alman a.k.a. [@cowboy](http://twitter.com/cowboy) to automate his front-end development workflow. You know, all the little repetitive tasks like unit testing, minifying your JavaScript and CSS, compiling your Sass stylesheets or CoffeeScripts, linting and what-not. With Grunt, they become a breeze: configure them once and let Grunt run them for you; in this sense, Grunt is a _task runner_ for the boring but oh-so-necessary parts of the web developer's life. It's [open source](https://github.com/gruntjs/) and at the heart of a wonderful ecosystem of thousands of plugins. As such, any tool you've ever used in your workflow is likely to have a Grunt counterpart. And if it doesn't, it's easy to roll out your own plugin and share it with the community. Organizations like Twitter, Adobe, jQuery (and [many others](http://gruntjs.com/who-uses-grunt)) use it and so should you, because it's A Great Thing&trade;.

### Front-end workflow?

Here are some things we talk about when we talk about front-end workflow:

#### Optimizing for speed: concatenation & minification

One of the tenets of optimizing web applications is to do everything in our power to reduce (1) the amount of HTTP requests and (2) the payload for each HTTP request. In real life, this means bundling your scripts, stylesheets &mdash; and even images! &mdash; into as few files as possible, using whatever tools one can cobble together.

We'll use Grunt to make our web application production-ready.

#### Keeping things modular

HTML lacks a way to compose your pages from modules. To have a website with multiple pages that share a common header and footer, which is to say any website ever, you're stuck with:

* repeating the same markup in each page of your site, making sure to update all pages when you want to make even the smallest change (highly impractical);
* using frames to load multiple HTML files on a single page &mdash; one for the header, one for the footer, one for the main content (usability nightmare); 
* using PHP or equivalent language to include bits of HTML dynamically (needs a web server with PHP support);
* loading the modules through AJAX calls (needs JavaScript to work, poor search engine ranking);

We'll learn how to use Grunt to write and compose HTML modules in a straightforward way.

#### Making CSS & JavaScript fun again

CSS and JavaScript are wonderful things with less-than-wonderful parts. CSS is crippled by repetition since it lacks variables and inheritance. JavaScript uses prototype inheritance, which seems un unnerve people used to classical inheritance.

Sass, LESS and a host of other languages superset CSS with features like variables, mixins, nesting and functions, which makes the code more concise, readable and maintainable. Through dedicated tools, these can be compiled into normal CSS and used in web pages.

Similarly, CoffeeScript and TypeScript aim to soothe the pains of JavaScript developers by providing traditional classes and inheritance along other features and syntactic goodies.

We'll see how Grunt can pre-process these files automatically, so you don't even have to think about it.

#### Keeping bugs at bay

Lint is the fluff that accumulates on your clothes or in your bellybutton, but it's also the name of a class of tools that look at your code and flag potentially flawed constructs. They're formally known as _static code analysis tools_.

We have lint checkers for JavaScript that remind you that `==` is not the same thing as `===` or that declaring functions inside a for-loop is generally a bad idea. They also point out style inconsistencies, such as using tabs _and_ spaces for indentation (make up your mind, will you?).

And then there's unit testing, that thing you should be doing &mdash; in fact, I'm going to assume you are &mdash; that keeps us safe from breaking things when we refactor code.

We'll find that Grunt is the perfect tool to automate code checking & testing.

#### Better documentation

They say every person has a book in them. Grunt can help your meticulously crafted comments really shine by making them into clean, readable documentation.

### Resources

Here are a few places we're going to visit quite often, so make sure you have them handy:

* http://gruntjs.com, Grunt's official page, with guides and the API reference;
* http://gruntjs.com/plugins, the list of all available Grunt plugins &mdash; the ones that start with `grunt-contrib-` are maintained by the Grunt team, while the others are created by people like you and me. You can find a list of good plugins in this book's _Appendix_;
* [@gruntjs](https://twitter.com/gruntjs) for updates on the topic;
* the IRC channel `#grunt` on `irc.freenode.net` is where the team members hang out.

### Get Grunt Up & Running

Grunt is written in JavaScript, so you'll need a Node.js environment and the Node Package Manager that comes with it. 

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

Your project's file structure should look like this:

	my-project/
		Gruntfile.js
		package.json

##### package.json

Let's create a very basic version of this file:

	{
	  "name": "my-project", // the name of our project, hyphen-separated
	  "version": "0.0.0" // project version (in semantic format)
	}

Now, let's install Grunt in our current project. But wait, didn't we do that already? Well, what we did install in the first part of the chapter was Grunt CLI, which is just a small utility that runs the local version of `grunt` for you. So, we still need to add Grunt locally (hence the lack of the `-g` flag):

	npm install grunt --save-dev

The `--save-dev` flag instructs NPM to update `package.json` to include `grunt` as a dependency for the project. Our file will now look like this:

	{
	  "name": "my-project",
	  "version": "0.0.0",

	  // the list of project dependencies
	  "devDependencies": {
	  	"grunt": "~0.4.1"
	  }
	}

In addition, you'll notice a `node_modules` directory added to your project. This is where all local NPM modules are installed &mdash; like we just did with `grunt` &mdash; and can be safely added to `.gitignore`.

Your project's file structure now looks like this:

	my-project/
		node_modules/
		Gruntfile.js
		package.json

*Did you know?* Running `npm install` in any project directory that has a `package.json` will install all its necessary dependencies with their appropriate versions, as listed in the `devDependencies` property.


##### Gruntfile.js

Next, let's create a Gruntfile next to our `package.json`. The basic format for the file is this:
	
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

## Lint your JavaScript code

**Plugins used:** [`grunt-contrib-jshint`](https://npmjs.org/package/grunt-contrib-jshint).

A JavaScript linter is a tool that looks for syntax errors, bad practices and style inconsistencies in your code.


### Install the JSHint plugin

	npm install grunt-contrib-jshint --save-dev

### Load JSHint tasks into our Gruntfile

	module.exports = function(grunt) {
		grunt.loadNpmTasks('grunt-contrib-jshint');
	};

### Confige the JSHint task

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

### Run the JSHint task

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
				all: ['scripts/*.js']
			}
		});
		grunt.loadNpmTasks('grunt-contrib-jshint');
	};

That's much better. Now we have the list of errors in a handy file in our project called `jshint.log`. Brilliant.

Here we've set `options` globally for _all targets_, but each individual target can have its own `options` property. Target-level options will override the task-level options. 

### More JSHint options

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

### Take five

In this recipe, we've:

* installed, configured and ran our first _real_ Grunt task;
* learned about targets and multitasks, both of which are wonderful things.

Feeling adventurous? Give the the very similar plugin [`grunt-contrib-csslint`](https://npmjs.org/package/grunt-contrib-csslint) a spin to lint the stylesheets in your project.
## Sassy Sass

**Plugins used:** [`grunt-contrib-sass`](https://npmjs.org/package/grunt-contrib-sass).

**Note:** To make `grunt-contrib-sass` work, you also need to have Ruby and Sass installed. To check if you have ruby installed, type `ruby -v` in the console. When you've confirmed you have Ruby installed, run `gem install sass` to install Sass.

### Install the Sass plugin

	npm install -g grunt-contrib-sass --save-dev

and then, in our Gruntfile:

	grunt.loadNpmTasks('grunt-contrib-sass');

### Configure the `sass` task

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

### Run the `sass` ask

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

Read more about the different ways to define files in the chapter _Files In-Depth_.

### Take five

In this recipe, we've learned:

* to write multiple source/destination pairs for the files used by our task;
* to define these pairs dynamically so we don't have to maintain them, one by one, for all eternity.


## Pre-compile your Handlebars templates

**Plugins used:** [`grunt-contrib-handlebars`](https://npmjs.org/package/grunt-contrib-handlebars).

[Handlebars](http://handlebarsjs.com/) is a popular template library which helps you build HTML fragments populated with data from an object. A template looks something like:
	
	<div class="post">
	  <h1>{{title}}</h1>
	  <p>Published: {{date}}</p>
	</div>

The portions between `{{` and `}}` are dynamic and are populated from the object you feed to the template. If you are not familiar with it, its homepage describes the library in more depth.

There are two basic ways to include Handlebars templates in your web application:

1. Inline them as strings in JavaScript: 

		var template = "<div class='post'><h1>{{title}}</h1><p>Published: {{date}}</p></div>";

	This is bad because we're mixing JavaScript and HTML, and it's not too readable either.

2. Include them in the HTML inside `<script>` tags:

		<script type='text/x-handlebars' id='post-template'>
			<div class="post">
			  <h1>{{title}}</h1>
			  <p>Published: {{date}}</p>
			</div>
		</script>

	This is somewhat better, but includes the extra step of querying the DOM for the script element and reading its content as a string (`element.innerHTML`). In addition, the HTML file containing all these templates can get quite large and unmaintainable.

Both techniques, as described, only get you to the point where you have the content of the template as a string. From hereon, you need to perform two additional steps:

1. First, compile the string into a template function;
2. Call the template function with a data object to get the HTML fragment.

Let's see how `grunt-contrib-handlebars` can make this all better.

### The advantages of pre-compiling your templates

Here's what's in it for you: 

* You get to keep your templates in separate files, without the performance penalty of separate HTTP requests for each one;
* You make your app faster by skipping the DOM queries and the compilation step;
* You reduce the payload by including only the Handlebars Runtime library, which is smaller and faster, instead of the whole shebang.

Sold? Right, let's get on with it.

### Install the `handlebars` task

	npm install grunt-contrib-handlebars --save-dev

and then add it to your Gruntfile:
	
	grunt.loadNpmTasks('grunt-contrib-handlebars');

### Configure the `handlebars` task

In its most basic form, we only need to define the _source_ and _destination_ files. Assuming the following file structure:

	my-project/
		templates/
			posts/
				list.hbs
				detail.hbs
			home.hbs
		js/
		Gruntfile.js
		package.json

We can write:

	handlebars: {
		all: {
			files: {
				"js/templates.js": ["templates/**/*.hbs"]
			}
		}
	}

Let's run this to see what happens:
	
	grunt handlebars

Grunt will take all files with a `.hbs` extension from the `templates` folder and all its sub-folders and merge them into a single file called `templates.js`. You can now include it in your HTML:

	<script type='text/javascript' src='js/templates.js'></script>

Inspecting `JST` in Developer Tools, we'll see it's an object whose keys are the names of the templates and whose values are the Handlebars templating functions for each:
	
	> JST
	Object
		templates/home.hbs          function(context, options) {...}
		templates/posts/list.hbs    function(context, options) {...}
		templates/posts/detail.hbs  function(context, options) {...}

In your JavaScript code, we use the templates as follows:

	var post = {
		title: 'My First Post',
		date: '10/10/2013'
	};
	var postTemplate = JST['templates/post/detail.hbs'];
	var html = postTemplate(post);

### Customize the names

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

Let's also get rid of the cruft in our template names &mdash; doesn't `posts/detail` look better than `templates/posts/detail.hbs`? We can accomplish this by using the `processName` option, which accepts a function with one argument (the file path) and returns the string to use as the template name:

	options: {
		namespace: 'MyApp.Templates',
		processName: function(filePath) {
			return filePath.replace(/^templates\//, '').replace(/\.hbs$/, '');
		}
	}

So, by removing the `templates/` prefix and the `.hbs` suffix from the file paths, we gen nice clean template names:

	> MyApp.Templates
		home            function(context, options) {...}
		posts/list      function(context, options) {...}
		posts/detail    function(context, options) {...}

### What about partials?

In templating languages, _partials_ are templates that can be reused in other templates. In Handlebars, you use the `{{> partial }}` helper to include partials. Let's take an example:

	<script type='text/x-handlebars' id='post-list-template'>
		<h2>{{ title }}</h2>
		<ul>
			{{#each posts}}
				<li>{{> post-item}}</li>
			{{/each}}
		</ul>
	</script>

	<script type='text/x-handlebars' id='post-item-template'>
		<span class='post'>{{ title }} - {{ date }}</span>
	</script>

We have two templates, one for the list of posts, and one for an individual item in the list. The former is a normal template, while the latter is used as a partial. To make everything happen, you'd write in your JavaScript code:

	var listString = document.getElementById('post-list-template').innerHTML;
	var itemString = document.getElementById('post-item-template').innerHTML;

	Handlebars.registerPartial('post-item', itemString);
	var template = Handlebars.compile(listString);

	template({
		title: 'All posts',
		posts: [
			{ title: 'First post', '10/10/2013'},
			{ title: 'Second post', '10/11/2013'}
		]	
	});

Which outputs the expected markup:
	
	<h2>All posts</h2>
	<ul>
		<li><span class='post'>First post - 10/10/2013</li>
		<li><span class='post'>Second post - 10/10/2013</li>
	</ul>

__Note:__ It's important to register the partial _before_ compiling any template that includes it, otherwise it will throw an error.

Let's see how the `handlebars` task works with partials. First, let's create a `_list-item.hbs` in our `templates` folder:

	my-project/
		templates/
			posts/
				_list-item.hbs
				list.hbs
				detail.hbs
			home.hbs
		js/
		Gruntfile.js
		package.json

If we run `grunt handlebars` again, we'll see that our `MyApp.Templates` does not include our newly created template. That's because the `handlebars` task assumes all files that start with `_` are partials and registers them using `Handlebars.registerPartial()` &mdash; internally, they're kept in the `Handlebars.partials` array.

Now we can just write:
	
	var template = MyApp.Templates['posts/list'];
	template({
		title: 'All posts',
		posts: [
			{ title: 'First post', '10/10/2013'},
			{ title: 'Second post', '10/11/2013'}
		]	
	});

and it works wonderfully!

### Take five

In this recipe, we made Handlebars templates better in terms of speed and maintainability by moving them to separate `.hbs` files.

__Tip:__ For even _more_ goodness, install Handlebars syntax highlighting in your favorite editor &mdash; I use [sublime-text-handlebars](https://github.com/nrw/sublime-text-handlebars) for Sublime Text.
## Watch for changes

**Plugins used:** [`grunt-contrib-watch`](https://npmjs.org/package/grunt-contrib-watch).

In the previous recipes, we saw how we can compile our Sass files into CSS files and merge your Handlebars templates into a single JST file. It is somewhat magical, but to run `grunt sass handlebars` after every change is far from being productive. Let's take this up a notch and make our files re-compile automatically every time we make a change to them. For this we will use the `watch` task provided by `grunt-contrib-watch`. 

As usual, let's install it in our project:

	npm install grunt-contrib-watch

and load the tasks in our Gruntfile, after our `sass` and `handlebars` tasks:

	module.exports = function(grunt) {
		grunt.initConfig({
			sass: {
				all: {
					files: [{
						expand: true,
						cwd: 'scss/',
						src: ['*.scss'],
						dest: 'css/',
						ext: '.css'
					}]
				}
			},
			handlebars: {
				all: {
					files: {
						'js/templates.js': ['templates/**/*.hbs']
					}
				}
			}
		});
		grunt.loadNpmTasks('grunt-contrib-sass');
		grunt.loadNpmTasks('grunt-contrib-handlebars');
		grunt.loadNpmTasks('grunt-contrib-watch');
	};

### Configuring the `watch` task

There are really only two things we need to define:

1. the files we want to watch;
2. the task(s) to run when the files change.

So let's go ahead and do that:

	module.exports = function(grunt) {
		grunt.initConfig({
			sass: {
				all: {
					files: [{
						expand: true,
						cwd: 'scss/',
						src: ['*.scss'],
						dest: 'css/',
						ext: '.css'
					}]
				}
			},

			handlebars: {
				all: {
					files: {
						'js/templates.js': ['templates/**/*.hbs']
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
		grunt.loadNpmTasks('grunt-contrib-handlebars');
		grunt.loadNpmTasks('grunt-contrib-watch');
	};

We've created _two targets_ for our task, one for watching the Sass files and one for watching the Handlebars templates. In both instances, we've used _wildcards_ to define patterns to match all desired files. The `scss/**/*.scss` pattern is similar to `scss/*.scss` (i.e. match all files with the `.scss` extension within the `scss` folder) with the exception that the former looks into subfolders as well &mdash; you can read all about it in the _Files in-depth_ chapter. 

When any of the targeted files change, the associated task is executed.

Let's check it out in action:
	
	grunt watch

Because `watch` is a _multitask_, what we're actually saying with the above command is:

	grunt watch:sass watch:handlebars


Now go ahead and change one of your Sass files, and notice that the `sass` task is run. At the same time, if a Handlebars template changes, the `handlebars` task is run.

__Note:__ In our example, we're running a single task with each change, but in effect the `tasks` option can take an array of tasks to be run in sequence. You can even include specific targets for each task, e.g.:

	watch: {
        sass: {
            files: ['scss/**/*.scss'],
            tasks: ['sass:all', 'csslint:all']
        }
    }

#### A note about persistent tasks

Some tasks such as `watch` or `connect` (about which we'll learn in the next chapter) are persistent, in the sense that once you start them they run in the background as long as the console is open. To stop a persistent task without closing the console, use `Ctrl+C`.

### Tweaking the watch behavior

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


### Take five

In this recipe, we've:

* learned how to use `watch` to trigger other tasks automatically when you make changes to your files;
* configured the types of events the watch responds to;
* run the associated tasks at the beginning of the watch process to make sure everything is up to date.


## Start a server

**Using:** [`grunt-contrib-connect`](https://npmjs.org/package/grunt-contrib-connect)

When working on a project on your machine, you test your stuff by pointing your browser to `file://path/to/your/project/index.html`. This alone is inelegant. But more importantly, _AJAX features won't work_ since they use the HTTP protocol, not the file protocol. 

What you need is a web server installed locally. You might be tempted to use an AMP stack &mdash; a fancy way of calling a bundle of Apache, MySQL and PHP &mdash; but it's a hassle to link your projects to its `www` folder (I'm lazy) and most of the time you'll use 1% of its features anyway. Plus, let's be honest, it feels a little retro. 

If you have Python installed, you can simply run this in your project folder instead:

	python -m SimpleHTTPServer // for Python 2.x
	python -m http.server // for Python 3.x

It will start a web server through which you can access your project at `http://localhost:8000`.

In this chapter, we'll learn how to configure the `connect` task to obtain a similar result, plus a few other perks.

### Install the `connect` task

	npm install grunt-contrib-connect --save-dev

and then load it into  your Gruntfile:
	
	grunt.loadNpmTasks('grunt-contrib-connect');

### Configure a persistent server

To create a persistent server (one which does not stop after Grunt tasks have completed), we will use `keepalive: true`:

	connect: {
		server: {
			options: {
				keepalive: true
			}
		}
	}

We've created a single target called `server` for our `connect` task.

### Run your server

	grunt connect:server

Now go to http://localhost:8000 and you should be able to browse your app, and see your `index.html` if you have one.

### More server configuration

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

### Routing everything back to index.html

If you're writing a Single-Page Web Application that uses the [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history), you'll be disappointed to find that your skillfully crafted URLs don't withstand a page refresh. The web server assumes a path like `http://localhost:8000/posts/100` points to a physical file and, failing to find it in your project, throws a _404 Not Found_ error.

Let's fix this by writing a custom _middleware_ for the `connect` task to redirect paths that don't correspond to physical files back to `index.html`.

For this we will be using the `connect-modrewrite` plugin &mdash; our first encounter with a plugin that's not specifically written for Grunt. But rest assured, it's basically the same thing. Let's install it in the same way as with any other plugin:

	npm install connect-modrewrite --save-dev

And then use it in our Gruntfile:

	var rewrite = require('connect-modrewrite');

Let's see how we can use it in our `connect` task:

	var rewrite = require('connect-modrewrite');

	grunt.initConfig({
		connect: {
			server: {
				keepalive: true,
				hostname: 'localhost',
				middleware: function(connect, options) {

					var middleware = [];
					
					// original middleware behavior
					var base = options.base;
					if (!Array.isArray(base)) {
						base = [base];
					}
					base.forEach(function(path) {
						middleware.push(connect.static(path));
					});

					// mod-rewrite behavior
					var rules = [
						'!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ /index.html'
					];
					middleware.push(rewrite(rules));

					return middleware;
				}
			}
		}
	});	

We've written a custom `middleware` function which returns an array of chained middleware. Because we're overwriting the original implementation altogether, we need to make sure to include it &mdash; it's the part with `connect.static`. We're then adding our rewrite middleware to the chain; it contains a single rule which states that all files except HTML, stylesheets, scripts and images should be redirected to `index.html`.

### Take five

In this recipe, we've learned how to use the `connect` task to start a local server. In addition, we've made it useful for developing apps that use the HTML5 History API by redirecting all paths that don't correspond to static assets back to the main HTML.
## Build an app for deployment

By now, you should be comfortable with working with one task at a time. It's time to really make Grunt shine by integrating the variety of tasks involved in preparing a web application for deployment, such as precompiling, minifying, concatenating and moving files around.

### What we're trying to accomplish

We want to take our main HTML file, identify all the stylesheets and scripts it references, optimize those (e.g. minification, concatenation) and then update the references from the HTML with the optimized version.

At the end of the task, we want to have a `dist` folder that contains the optimized version of our project, readily deployable to a production environment.

### Tasks we'll use in this recipe

* [`grunt-contrib-uglify`](https://npmjs.org/package/grunt-contrib-uglify) to minify JavaScript;
* [`grunt-contrib-cssmin`](https://npmjs.org/package/grunt-contrib-cssmin) to minify CSS;
* [`grunt-contrib-htmlmin`](https://npmjs.org/package/grunt-contrib-htmlmin) to minify gruntde;
* [`HTML-contrib-concat`](https://npmjs.org/package/grunt-contrib-concat) to concatenate files;
* [`grunt-contrib-copy`](https://npmjs.org/package/grunt-contrib-copy) to copy files and folders;
* [`grunt-usemin`](https://github.com/yeoman/grunt-usemin) to replaces references to scripts and stylesheets in HTML files with their optimized versions.

Now, don't get too intimidated! If you think about it each task has a very specific purpose in the workflow, and you'll see how easy is to choreograph them into one fluent, beautiful task.

### Let's install everything

	npm install grunt-contrib-uglify grunt-contrib-concat grunt-contrib-cssmin grunt-contrib-htmlmin grunt-contrib-copy grunt-usemin --save-dev

... in one fell swoop, even. Now let's add all of it to our Gruntfile:

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-usemin');

### Basic configuration

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

### Take five

## Files, in-depth
http://gruntjs.com/configuring-tasks#files

Tasks can be:

* single tasks or multitasks;
* read-only tasks or read-write tasks.
* one-to-one tasks or many-to-one tasks.

Multi-tasks work by taking source files and mapping them to destination files. For each destination, you can define one or more source files. Let's look at the ways to define files:

### Compact mode

todo.

### Files object format

In the Files Object Format, you specify a `files` object that has:

* the destination file as key
* a string or array of strings to define the source file(s) for the destination

It looks something like this:

	files: {
		'dist/file1.js': 'app/file1.js',
		'dist/combined.js': ['app/file1.js', 'app/file2.js', 'app/file3.js']
	}

The first line defines one source for the destination file, while the second defines multiple source files for the destination.


### Files Array Format

The Files Array Format is the canonical form of defining source/destination pairs. Grunt converts all the other formats to the Files Array Format before sending them to the task. It's very similar to the Files Object format, except we explicitly define the `src` and `dest` properties:

	files: [{
		src: 'app/file1.js',
		dest: 'dist/file1.js'
	}, {
		src: ['app/file1.js', 'app/file2.js', 'app/file3.js'],
		dest: 'dist/combined.js'
	}]

It has the advantage of allowing us to specify additional properties, such as:

* `dot`, allows patterns to match file names that start with a period (e.g. `.gitignore`), even if the pattern does not explicitly have a period there;
* `filter`, which allows us to match files or folders specifically (e.g. filter: 'isFile' will filter out folders)/

... and a couple of others.

### Patterns

* `?` matches a single character, excluding `/`;
* `*` matches any number of characters, _excluding_ `/`;
* `**` matches any number of characters, _including_ `/`;
* Use `{}` to define a comma-separated list of alternatives, such as `{backbone,jquery}.min.js`, which will match `backbone.min.js` and `jquery.min.js`;
* Use `!` to exclude a match.

#### A few common patterns

Let's assume the following structure:

	app/
		app.js
		data.js
		lib/
			jquery.js
			backbone.js
			underscore.js
		modules/
			api.js
			auth.js


The star pattern `*` is generally used to match all files in the folder:

	src: 'app/*.js'
	// matches app.js, data.js

The double star pattern `**/*` is used to match all files in the folder and its subfolders:

	src: 'app/**/*.js'
	// matches app.js, data.js, jquery.js, backbone.js, underscore.js, api.js, auth.js


You don't need to define complicated, all-encompassing patterns, because you can define the sources as arrays. They will all be processed and will result in _a set of files_ (meaning each file will appear only once even if it's matched by multiple patterns).

For example, let's say you want to select all JavaScript files in the `app` folder and its subfolders, _but not_ the `lib` subfolder:

	src: ['app/**/*.js', '!app/lib/*.js']
	// matches app.js, data.js, api.js, auth.js

This array of patterns will initially match all JavaScript files in `app` but then will exclude those from the `lib` subfolder. Easy! 

#### Practice your patterns

Todo.

### Defining the files object dynamically

We mentioned earlier that each object in the Files Array format can take additional properties. Some of these properties are useful in defining our file mappings dynamically.
Let's take a look:

* `expand` is set to `true` so that we can use dynamic mappings;
* `cwd` (current working directory) is the common path to all the source files;
* `src` is an array of one or more patterns to match, relative to `cwd`;
* `dest` is the counterpart to `cwd` and describes the destination path prefix;
* `ext` is the new extension for the destination files, which replaces the extension of the original file; 

The dynamic mapping is useful for one-to-one mappings: for each source file you will get a destination file.

A real-world example would be copying an entire folder structure from one place to another.

	my-project
		app/
			js/
				app.js
				data.js
				lib/
					jquery.js
					backbone.js
				modules/
					api.js
					auth.js
		dist/
		Gruntfile.js
		package.json

We will use `grunt-contrib-copy` to copy the content of the `js` folder into `dist`. A first attempt:
	
	copy: {
		all: {
			files: [{
				expand: true,
				src: 'app/js/**/*.js',
				dest: 'dist/'
			}]
		}
	}

An honest attempt, but it generates the following structure:

	my-project
		app/
			js/
				app.js
				data.js
				lib/
					jquery.js
					backbone.js
				modules/
					api.js
					auth.js
		dist/
			app/
				js/
					app.js
					data.js
					lib/
						jquery.js
						backbone.js
					modules/
						api.js
						auth.js
		Gruntfile.js
		package.json

Close, but no cigar. We wanted the `js` folder included directly under `dist`.

What we need to do is take the `app` part out of the `src` property and put it in the `cwd` property:

	copy: {
		all: {
			files: [{
				expand: true,
				cwd: 'app/',
				src: 'js/**/*.js',
				dest: 'dist/'
			}]
		}
	}

Which gives us the expected result:

	my-project
		app/
			js/
				app.js
				data.js
				lib/
					jquery.js
					backbone.js
				modules/
					api.js
					auth.js
		dist/
			js/
				app.js
				data.js
				lib/
					jquery.js
					backbone.js
				modules/
					api.js
					auth.js
		Gruntfile.js
		package.json

Freeze Frame High-Five!&trade;

So where's the difference? Well, the `cwd` parameter &mdash; standing for the Common Working Directory, if you remember &mdash; dictates where the root of the whole structure we want to match is located, and the rest of the folder structure (from the `src` parameter) is mapped one-to-one in the path defined by `dest`.

### Take five


## Write your own Grunt tasks

### A primer on custom tasks

#### Aliasing existing tasks

Task aliasing is useful for when you want to run multiple tasks in sequence without having to invoke Grunt specifically for each one. The way to do this is:

	grunt.registerTask('mytask', 'Optional task description', ['jshint', 'qunit', 'concat']);

This way you can simply run

	grunt mytask

...and it will trigger the succession of `jshint`, `qunit` and `concat`.

We usually want to define a `default` task that will run when we simply type `grunt` in the command line:

	grunt.registerTask('default', ['watch']);

In addition, the list of tasks can come with specific targets:
	
	grunt.registerTask('default', ['watch:stylesheets']);

### Working with files

Chances are your app will want to operate on files. You can learn about the different ways users can define files in the _Files In-Depth_ chapter, and there certainly are a bunch of them! Fortunately, Grunt does the heavy-lifting for us and normalizes all formats into the _Files Array_ format, expanding all the patterns it finds along the way. 

So really all we have to do is grab the array from `this.files` containing objects which have two main properties:

* the `dest` property holds the path to the destination;
* the `src` property is an array of one or more source files for the destination.

Let's try this out!

Assume we have a project structure like this one:

	app/
		src1.js
		src2.js
	Gruntfile.js
	package.json

We write the following Grunt code:

	grunt.initConfig({
		logfiles: {
			filesObject: {
				files: {
					'dist/file1.js': ['app/src*.js']
				}
			},
			filesArray: {
				files: [{
					src: ['app/src*.js'],
					dest: 'dist/file1.js'
				}]
			}
		}
	});

	grunt.registerMultiTask(
		'logfiles', 
		'Log the source-destination mappings in a Grunt multitask', 
		function() {
			this.files.forEach(function(file) {
				grunt.log.writeln('File ' + file.dest + ' has the sources ' + file.src);
			});	
		}
	);

Firstly, we created two targets corresponding to two different ways of defining files for our tasks. Secondly, we defined our multitask as a simple loop through the `this.files` array.

Now let's check what each of them outputs:

	grunt logfiles:filesObject
	> Running "logfiles:filesObject" (logfiles) task
	> File dist/file1.js has the sources app/src1.js, app/src2.js

	grunt logfiles:filesArray
	> Running "logfiles:filesArray" (logfiles) task
	> File dist/file1.js has the sources app/src1.js, app/src2.js

Identical &mdash; one less thing for us to worry about!

#### Excluding sources that don't exist
	
A good practice in all tasks is to filter out the source files that don't actually exist in the project:

	this.files.forEach(function(file) {
		var sources = file.src.filter(function(path) {
			if (!grunt.file.exists(path)) {
				grunt.log.warn('Source file ' + path + ' not found.');
				return false;
			} else {
				return true;
			}
		});
	});	

Now the `sources` variable contains only the subset of files that are valid.


## Loading external data in our tasks

Grunt provides two methods for loading external data into the Gruntfile:

* `grunt.file.readJSON()` to load an external JSON file;
* `grunt.file.readYAML()` to load an external YAML file;

JSON and YAML are both languages to describe data structures, so you can choose whichever you feel more comfortable with.

A common use for reading external data is to pull out task options into separate files, for easier maintenace.

### Load Grunt tasks dynamically

Let's use `readJSON()` for something fun like automatically loading all the tasks defined in `package.json`, instead of writing `grunt.loadNpmTasks()` for each one.

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

**Note:** A small caveat &mdash; `readJSON()` only accepts _valid_ JSON-files, while `package.json` can be merely JSON-like and still work with `npm install`. The most common JSON-like-but-not-quite-JSON thing it might contain are comments, which work perfectly fine with the NPM installer but will break the above script.

## Our Big Project &mdash; creating a static website plugin

Let's put everything we know together to create a static website generator that takes pages in markdown format and assembles them into a fully-functional blog.

### What we're trying to do

Let's look at the structure we want for the project:

	my-blog
		init/
			sample.post
		content/
			hello_world.post
			second_post.post
		templates/
			partials/
				header.tmpl
				footer.tmpl
			archive.tmpl
			category.tmpl
			index.tmpl
			post.tmpl
		styles/
			blog.css
		scripts/
			blog.js
		blog/
			<our blog gets generated here>
		Gruntfile.js
		package.json

We will need to take the information for each post from the `.post` file and build a corresponding `.html` file by assembling it from templates:

*  templates that correspond to the different types of pages we will have: a home page, a list of all the posts, a list of posts in a specific category and pages for the individual posts;
* `partials` which are the parts common to all page types, such as the header and the footer.

#### The structure of posts

We want to be able to include some meta-data along with the content of our posts, so a post should look like:

	[METADATA]

	title: My Post
	slug: my-post
	date: September 13, 2013
	category: General

	[CONTENT]

	<markdown content goes here>

Let's think about the kind of metadata is useful:

* `title` for the title of the post;
* `slug` for the URL part leading to the post; in the example above, it would be `http://myawesomeblog.com/my-post`; in the absence of an explicit slug, we should generate it based on the post title based on some rules;
* `date` when the post was written; if ommited, we can look at the timestamp on the file itself.
* `category` of the post.

We've also created a `init` folder containing `sample.post` so we don't have to start each page from scratch. We'll create a separate Grunt task that creates new posts for us:

	grunt new "Post title"


### Let's gather our tools

Off the top of our heads, we will most definitely need:

* `grunt-contrib-copy` to copy everything to the `blog` folder;
* `grunt-contrib-clean` to clean up after generating temporary files;
* `grunt-markdown` to convert the Markdown content of our posts to HTML.


### Building the Gruntfile

	grunt.initConfig({
		copy: {
			sample: {
				files: [{
					src: 'init/sample.post',
					dest: 'posts/new_post.post'
				}]
			}
		}
	});

	grunt.registerTask('default', 'Build the blog', []);
	grunt.registerTask('new', 'Create a new post', ['copy:sample'])


## Conclusion

Here you are, you've made it to the end of the book. I hope it was a worthwhile read. Armed with this knowledge, you should be able to use any Grunt plugin you come accross and even write your own.

### What now

If you're still looking for a challenge, here are a few suggestions:

* Look into [Yeoman](http://yeoman.io/), which builds upon Grunt to help you scaffold new applications by generating the necessary project structure, fetching third-party libraries and adding all the Grunt tasks you need to get started;
* Fix a bug in your favorite Grunt plugin;
* Help make this book better! You can [contribute on GitHub](http://github.com/danburzo/grunt-recipes).



## Appendix A: Some useful Grunt plugins

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


## Appendix B: Using Grunt with other tools

### Grunt in Sublime Text

The Sublime Text plugin [`sublime-grunt`](https://github.com/tvooo/sublime-grunt) allows you to run Grunt directly inside the editor, so you don't have to toggle between the IDE and the command line when developing.
## Appendix C: Using the code that comes with this book

Each chapter in this book comes with code samples that you can run to get a better idea of how the concepts apply in real life. You can download the code here: [[LINK]]

To install the necessary dependencies for each project, open up a console and navigate to the project folder. Then simply run:

	npm install

NPM (Node Package Manager) will install Grunt and the other plugins needed to run the Gruntfile.

You can also check out the `README.md` file that comes with each project for more details.
