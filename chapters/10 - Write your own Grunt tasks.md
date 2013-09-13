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

