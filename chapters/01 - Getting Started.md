{
  title: "Getting Started"
}

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

```bash
npm install -g grunt-cli
```

**Note:** The `-g` flag stands for *global*, which makes Grunt CLI available from any folder on your machine.

That's it! You're ready to add Grunt magic to your projects.

#### Set up your first Grunt project

Let's create a new project:

```bash
mkdir my-project
cd my-project
```

There are two main files you need to create in the root directory of your project:

* `package.json`: this file is used to store NPM metadata such as the name and description of the project, and its dependencies;
* `Gruntfile.js`: this file is used to load and configure your grunt tasks.

Your project's file structure should look like this:

```bash
my-project/
	Gruntfile.js
	package.json
```

##### package.json

Let's create a very basic version of this file:

```javascript
{
  "name": "my-project", // the name of our project, hyphen-separated
  "version": "0.0.0" // project version (in semantic format)
}
```

Now, let's install Grunt in our current project. But wait, didn't we do that already? Well, what we did install in the first part of the chapter was Grunt CLI, which is just a small utility that runs the local version of `grunt` for you. So, we still need to add Grunt locally (hence the lack of the `-g` flag):

```bash
npm install grunt --save-dev
```

The `--save-dev` flag instructs NPM to update `package.json` to include `grunt` as a dependency for the project. Our file will now look like this:

```javascript
{
  "name": "my-project",
  "version": "0.0.0",

  // the list of project dependencies
  "devDependencies": {
  	"grunt": "~0.4.1"
  }
}
```

In addition, you'll notice a `node_modules` directory added to your project. This is where all local NPM modules are installed &mdash; like we just did with `grunt` &mdash; and can be safely added to `.gitignore`.

Your project's file structure now looks like this:

```bash
my-project/
	node_modules/
	Gruntfile.js
	package.json
```

*Did you know?* Running `npm install` in any project directory that has a `package.json` will install all its necessary dependencies with their appropriate versions, as listed in the `devDependencies` property.


##### Gruntfile.js

Next, let's create a Gruntfile next to our `package.json`. The basic format for the file is this:

```javascript	
module.exports = function(grunt) {
  // We'll do grunt stuff here soon!
};
```

For example, let's write a task that just prints out `Hello World!` into the console:

```javascript
module.exports = function(grunt) {
  grunt.registerTask('default', function() {
  	grunt.log.write('Hello World!');
  });
};
```

And now to run it:
	
```bash
grunt
> Running "default" task
> Hello World!
```

#### Take five

OK, let's recap what we've just done:

* We installed Node and Node Package Manager, which allows us to run Grunt and to quickly install all the necessary Grunt plugins;
* We installed Grunt CLI globally;
* We created a new, empty project;
* We added basic versions of `package.json` and `Gruntfile.js`;
* We ran `grunt` for the first time!

You can read more at: http://gruntjs.com/getting-started
