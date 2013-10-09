{
  title: "Files, in-depth"
}

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

```javascript
files: {
	'dist/file1.js': 'app/file1.js',
	'dist/combined.js': ['app/file1.js', 'app/file2.js', 'app/file3.js']
}
```

The first line defines one source for the destination file, while the second defines multiple source files for the destination.


### Files Array Format

The Files Array Format is the canonical form of defining source/destination pairs. Grunt converts all the other formats to the Files Array Format before sending them to the task. It's very similar to the Files Object format, except we explicitly define the `src` and `dest` properties:

```javascript
files: [{
	src: 'app/file1.js',
	dest: 'dist/file1.js'
}, {
	src: ['app/file1.js', 'app/file2.js', 'app/file3.js'],
	dest: 'dist/combined.js'
}]
```

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

```bash
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
```

The star pattern `*` is generally used to match all files in the folder:

```javascript
src: 'app/*.js'
// matches app.js, data.js
```

The double star pattern `**/*` is used to match all files in the folder and its subfolders:

```javascript
src: 'app/**/*.js'
// matches app.js, data.js, jquery.js, backbone.js, underscore.js, api.js, auth.js
```

You don't need to define complicated, all-encompassing patterns, because you can define the sources as arrays. They will all be processed and will result in _a set of files_ (meaning each file will appear only once even if it's matched by multiple patterns).

For example, let's say you want to select all JavaScript files in the `app` folder and its subfolders, _but not_ the `lib` subfolder:

```javascript
src: ['app/**/*.js', '!app/lib/*.js']
// matches app.js, data.js, api.js, auth.js
```

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

```bash
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
```

We will use `grunt-contrib-copy` to copy the content of the `js` folder into `dist`. A first attempt:

```javascript	
copy: {
	all: {
		files: [{
			expand: true,
			src: 'app/js/**/*.js',
			dest: 'dist/'
		}]
	}
}
```

An honest attempt, but it generates the following structure:

```bash
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
```

Close, but no cigar. We wanted the `js` folder included directly under `dist`.

What we need to do is take the `app` part out of the `src` property and put it in the `cwd` property:

```javascript
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
```

Which gives us the expected result:

```bash
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
```

Freeze Frame High-Five!&trade;

So where's the difference? Well, the `cwd` parameter &mdash; standing for the Common Working Directory, if you remember &mdash; dictates where the root of the whole structure we want to match is located, and the rest of the folder structure (from the `src` parameter) is mapped one-to-one in the path defined by `dest`.

### Take five

