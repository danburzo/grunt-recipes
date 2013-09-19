## Pre-compile your Handlebars templates

**Plugins used:** [`grunt-contrib-handlebars`](https://npmjs.org/package/grunt-contrib-handlebars).

[Handlebars](http://handlebarsjs.com/) is a popular template library which helps you build HTML fragments populated with data from an object. A template looks something like:
	
	<div class="person">
	  <h1>{{name}}</h1>
	  <p>{{description}}</p>
	</div>

The portions between `{{` and `}}` are dynamic and are populated from the object you feed to the template. If you are not familiar with it, its homepage describes the library in more depth.

There are two basic ways to include Handlebars templates in your web application:

1. Inline them as strings in JavaScript: 

		var template = "<div class="person"><h1>{{name}}</h1><p>{{description}}</p></div>";

	This is bad because we're mixing JavaScript and HTML, and it's not too readable either.

2. Include them in the HTML inside `<script>` tags:

		<script type='text/x-handlebars' id='person-template'>
			<div class="person">
			  <h1>{{name}}</h1>
			  <p>{{description}}</p>
			</div>
		</script>

	This is somewhat better, but includes the extra step of querying the DOM for the script element and reading its content as a string (`element.innerHTML`). In addition, the HTML file containing all these templates can get quite large and unmaintainable.

Both techniques, as described, only get you to the point where you have the content of the template as a string. From hereon, you need to perform two additional steps:

1. First, compile the string into a template function;
2. Call the template function with a data object to get the HTML fragment.

Let's see how `grunt-contrib-handlebars` can make this all better.

### The advantages of pre-compiling your templates

Here's what's in it for you: 

* You get to keep your templates in separate files, without the performance penalty of separate HTTP requests for each one;
* You make your app faster by skipping the DOM queries and the compilation step;
* You reduce the payload by including only the Handlebars Runtime library, which is smaller and faster, instead of the whole shebang.

Sold? Right, let's get on with it.

### Install the `handlebars` task

	npm install grunt-contrib-handlebars --save-dev

and then add it to your Gruntfile:
	
	grunt.loadNpmTasks('grunt-contrib-handlebars');

### Configuring the `handlebars` task

In its most basic form, we only need to define the _source_ and _destination_ files:

	handlebars: {
		all: {
			files: {
				"js/templates.js": ["templates/**/*.hbs"]
			}
		}
	}

Let's run this to see what happens:
	
	grunt handlebars

Grunt will take all files with a `.hbs` extension from the `templates` folder and all its sub-folders and merge them into a single file called `templates.js`, which looks something like this:

[[ INSERT CODE EXAMPLE ]] 

You can now include a single file in your HTML:

	<script type='text/javascript' src='js/templates.js'></script>

and in your JavaScript code, you access the templates as follows:

	var personTemplate = JST['person']; // presto!

### More customization

In real life, you'll probably want to add the templates under your application's namespace &mdash; something like `MyApp.Templates` &mdash; instead of `JST`. This is done using the `namespace` option:

	handlebars: {
		options: {
			namespace: 'MyApp.Templates'
		},
		all: {
			files: {
				"js/templates.js": ["templates/**/*.hbs"]
			}
		}
	}

Let's also configure how template names are generated for each file, using the `processName` option. We define a function which takes one argument (the file path) and returns the string to use as the template name:

	options: {
		processName: function(filePath) {

			// split path at slash, hyphen and space
			var parts = filePath.split(/[\/\-\s]/); 
			
			// capitalize each part, starting from the second
			for (var i = 1; i < parts.length; i++) {
				parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].substr(1);
			}

			// restore the string and return it
			return parts.join('');
		}
	}

In the example above, we're transforming the template path into a camel-case name:

	templates/product/detail.hbs -> 'productDetail'

### Take five

In this recipe, we made Handlebars templates better in terms of speed and maintainability. In fact, if you install Handlebars syntax highlighting in your favorite editor (I use Sublime Text), you'll get even more clarity by keeping your templates in separate `.hbs` files.