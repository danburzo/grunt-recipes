### Files, in-depth
http://gruntjs.com/configuring-tasks#files

Tasks can be:

* single tasks or multitasks;
* read-only tasks or read-write tasks.
* one-to-one tasks or many-to-one tasks.

Multi-tasks work by taking source files and mapping them to destination files. For each destination, you can define one or more source files. Let's look at the ways to define files:

#### Compact mode

todo.

#### Files object format

In the Files Object Format, you specify a `files` object that has:

* the destination file as key
* a string or array of strings to define the source file(s) for the destination

It looks something like this:

	files: {
		'dist/file1.js': 'app/file1.js',
		'dist/combined.js': ['app/file1.js', 'app/file2.js', 'app/file3.js']
	}

The first line defines one source for the destination file, while the second defines multiple source files for the destination.

#### Files Array Format

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

#### Defining the files object dynamically

#### Patterns

* `?` matches a single character, excluding `/`;
* `*` matches any number of characters, _excluding_ `/`;
* `**` matches any number of characters, _including_ `/`;
* Use `{}` to define a comma-separated list of alternatives, such as `{backbone,jquery}.min.js`, which will match `backbone.min.js` and `jquery.min.js`;
* Use `!` to exclude a match.

##### A few common patterns

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

##### Practice your patterns

Todo.