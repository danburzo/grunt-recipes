{
  title: "Sassy Sass",
  slug: "sass"
}

**Plugins used:** [`grunt-contrib-sass`](https://npmjs.org/package/grunt-contrib-sass).

**Note:** To make `grunt-contrib-sass` work, you also need to have Ruby and Sass installed. To check if you have ruby installed, type `ruby -v` in the console. When you've confirmed you have Ruby installed, run `gem install sass` to install Sass.

### Install the Sass plugin

```bash
npm install -g grunt-contrib-sass --save-dev
```

and then, in our Gruntfile:

```bash
grunt.loadNpmTasks('grunt-contrib-sass');
```

### Configure the `sass` task

We'll create a single target called `all` for our task. We'll then define a list of source/destination pairs in the `files` property:

```javascript
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
```

If you've read through the previous recipe, you'll recall that the `files` property accepted an array of comma-separated file paths. Turns out there are a host of ways to describe the files your tasks needs to operate on, but we'll talk about that later. For now, let's examine this form:

```javascript
files: {
	'css/main.css': 'scss/main.scss',
	'css/homepage.css': 'scss/homepage.scss'
}
```

We've defined `files` as an object with key/value pairs correspond to _destination-file_/_source-file_. 

### Run the `sass` ask

Let's run our task to see how it works:

```bash
grunt sass
```

### 

This means that for each new Sass file that you add to your project, you'll need to edit your Gruntfile to include a new source/destination pair in your `sass` task. Not too sexy. 

Let's fix that by _building the files object dynamically_:

```javascript
files: [{
	expand: true,
	cwd: 'scss/',
	src: ['*.scss'],
	dest: 'css/',
	ext: '.css'
}]
```

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

