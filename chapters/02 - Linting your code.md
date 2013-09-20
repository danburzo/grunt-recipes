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