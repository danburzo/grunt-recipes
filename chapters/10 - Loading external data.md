{
  title: "Loading external data in our tasks",
  slug: "external-data"
}

Grunt provides two methods for loading external data into the Gruntfile:

* `grunt.file.readJSON()` to load an external JSON file;
* `grunt.file.readYAML()` to load an external YAML file;

JSON and YAML are both languages to describe data structures, so you can choose whichever you feel more comfortable with.

A common use for reading external data is to pull out task options into separate files, for easier maintenace.

### Load Grunt tasks dynamically

Let's use `readJSON()` for something fun like automatically loading all the tasks defined in `package.json`, instead of writing `grunt.loadNpmTasks()` for each one.

```javascript
module.exports = function(grunt) {

	// load `package.json`
	var package = grunt.file.readJSON('package.json');
	
	// check if we have any dependencies
	if (package.devDependencies) {

		// filter out the ones that don't start with `grunt-`
		var gruntTasks = Object.keys(package.devDependencies).filter(function(task) {
			return task.indexOf('grunt-') === 0;	
		});

		// load each task
		gruntTasks.forEach(grunt.loadNpmTasks);
	}
};
```

**Note:** A small caveat &mdash; `readJSON()` only accepts _valid_ JSON-files, while `package.json` can be merely JSON-like and still work with `npm install`. The most common JSON-like-but-not-quite-JSON thing it might contain are comments, which work perfectly fine with the NPM installer but will break the above script.
