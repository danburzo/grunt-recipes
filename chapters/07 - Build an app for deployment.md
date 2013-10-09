{
  title: "Build an app for deployment"
}

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

```bash
npm install grunt-contrib-uglify grunt-contrib-concat grunt-contrib-cssmin grunt-contrib-htmlmin grunt-contrib-copy grunt-usemin --save-dev
```

... in one fell swoop, even. Now let's add all of it to our Gruntfile:

```javascript
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-usemin');
```

### Basic configuration

```javascript
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
```

Let's take the code above apart, piece by piece.

First, we configure the `cssmin` task to take all stylesheets from `app/css` and minimize and concatenate them in a single file in `dist/css` called `app.css`.
We do the same for HTML, except we're using a dynamic declaration of the files object since we want to have a separate HTML file in the `dist` folder for each HTML in our `app` folder.

Then we configure the `copy` task to copy into the `dist` folder one by one any files not already covered by the other tasks &mdash; stuff like icons, images, fonts, etc.  

We already notice we've been using `app` and `dist` a lot, so let me take this moment to introduce a handy way to Not Repeat Yourself: enter **Grunt templates**. They are tiny dynamic snippets delimited by `<%` and `%>` that you can add to your strings. We're interested in templates of the form `<%= object.property.path %>` which expands to the corresponding value from Grunt's configuration object. Let's see it in action:

```javascript
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
```

We've defined an `appConfig` property to hold our commonly-used paths. Now we can refer to the two paths as `<%= appConfig.appRoot %>` and `<%= appConfig.distRoot %>` in all our tasks.

**Note:** You can define any number of custom properties in your Grunt configuration (like we did above with `appConfig`), but make sure the names don't conflict with any task names and stay away from the `grunt` keyword, which is reserved to access the Grunt object in the templates.

Another cool thing we can do is to get a timestamp for the current Grunt run and add that to the generated CSS/JS files to ensure they are unique.

```javascript
{
	appConfig: {
		appRoot: 'app',
		distRoot: 'dist',
		timestamp: Date.now()
	}
}
```

And here's how we might use this to append the timestamp to our generated CSS file in `cssmin`:

```javascript
cssmin: {
	all: {
		files: {
			'<%= appConfig.distRoot %>/css/app.<%= appConfig.timestamp %>.css': '<%= appConfig.appRoot %>/css/**/*.css'
		}
	}
}
```

### Take five
