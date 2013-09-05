## Getting started

### Meet Grunt

Grunt was created by Ben Alman a.k.a. [@cowboy](http://twitter.com/cowboy) to automate his front-end development workflow. You know, all the little repetitive tasks like unit testing, minifying your JavaScript and CSS, compiling your Sass stylesheets or CoffeeScripts, linting and what-not. With Grunt, they become a breeze: configure them once and let Grunt run them for you; in this sense, Grunt is a _task runner_ for the boring but oh-so-necessary parts of the web developer's life. It's [open source](https://github.com/gruntjs/) and at the heart of a wonderful ecosystem of thousands of plugins. As such, any tool you've ever used in your workflow is likely to have a Grunt counterpart. And if it doesn't, it's easy to roll out your own plugin and share it with the community. Organizations like Twitter, Adobe, jQuery (and [many others](http://gruntjs.com/who-uses-grunt)) use it and so should you, because it's A Great Thing&trade;.

### Resources

Here are a few places we're going to visit quite often, so make sure you have them handy:

* http://gruntjs.com, Grunt's official page, with guides and the API reference;
* http://gruntjs.com/plugins, the list of all available Grunt plugins &mdash; the ones that start with `grunt-contrib-` are maintained by the Grunt team, while the others are created by people like you and me;
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
