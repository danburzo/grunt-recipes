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
