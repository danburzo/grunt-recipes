{
  title: "Watch for changes",
  slug: "watch"
}


**Plugins used:** [`grunt-contrib-watch`](https://npmjs.org/package/grunt-contrib-watch).

In the previous recipes, we saw how we can compile our Sass files into CSS files and merge your Handlebars templates into a single JST file. It is somewhat magical, but to run `grunt sass handlebars` after every change is far from being productive. Let's take this up a notch and make our files re-compile automatically every time we make a change to them. For this we will use the `watch` task provided by `grunt-contrib-watch`. 

As usual, let's install it in our project:

```bash
npm install grunt-contrib-watch
```

and load the tasks in our Gruntfile, after our `sass` and `handlebars` tasks:

```javascript
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
```

### Configuring the `watch` task

There are really only two things we need to define:

1. the files we want to watch;
2. the task(s) to run when the files change.

So let's go ahead and do that:

```javascript
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
```

We've created _two targets_ for our task, one for watching the Sass files and one for watching the Handlebars templates. In both instances, we've used _wildcards_ to define patterns to match all desired files. The `scss/**/*.scss` pattern is similar to `scss/*.scss` (i.e. match all files with the `.scss` extension within the `scss` folder) with the exception that the former looks into subfolders as well &mdash; you can read all about it in the _Files in-depth_ chapter. 

When any of the targeted files change, the associated task is executed.

Let's check it out in action:
	
```bash
grunt watch
```

Because `watch` is a _multitask_, what we're actually saying with the above command is:

```bash
grunt watch:sass watch:handlebars
```

Now go ahead and change one of your Sass files, and notice that the `sass` task is run. At the same time, if a Handlebars template changes, the `handlebars` task is run.

__Note:__ In our example, we're running a single task with each change, but in effect the `tasks` option can take an array of tasks to be run in sequence. You can even include specific targets for each task, e.g.:

```javascript
watch: {
    sass: {
        files: ['scss/**/*.scss'],
        tasks: ['sass:all', 'csslint:all']
    }
}
```

#### A note about persistent tasks

Some tasks such as `watch` or `connect` (about which we'll learn in the next chapter) are persistent, in the sense that once you start them they run in the background as long as the console is open. To stop a persistent task without closing the console, use `Ctrl+C`.

### Tweaking the watch behavior

By default, `watch` looks for three kinds of changes: 

* files that were _added_ to the project and match the pattern;
* matching files files that were _deleted_;
* matching files that were _changed_. 

This behavior is controlled by the `events` option, which can have one or many of the values: `all` (the default), `changed`, `added` and `deleted`. Let's assume we want to run the `handlebars` task only when a template is added or deleted &mdash; an no, it doesn't make sense in a real-world scenario, but go with me:

```javascript
watch: {
	handlebars: {
		files: ['templates/**/*.hbs'],
		tasks: ['handlebars'],
		options: {
			events: ['added', 'deleted']
		}
	}
}
```

This will make the watch ignore changes in existing Handlebars templates and only react when we add or remove Handlebars templates.

Alrighty then.

There's one little quirk we need to address: the `watch` task will only pick up on changes that happen _after_ we call `grunt task`. We'd like to make sure our generated CSS and compiled templates are up-to-date when the watch starts. For this, we will use `atBegin: true` to run _all tasks_ associated with the watch before the actual watching begins. Because we want this behavior for both Sass and Handlebars files, we will add this option on the task directly rather than on each target:

```javascript
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
```

### Take five

In this recipe, we've:

* learned how to use `watch` to trigger other tasks automatically when you make changes to your files;
* configured the types of events the watch responds to;
* run the associated tasks at the beginning of the watch process to make sure everything is up to date.

