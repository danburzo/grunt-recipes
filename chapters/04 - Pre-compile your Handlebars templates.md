{
  title: "Pre-compile your Handlebars templates"
}

**Plugins used:** [`grunt-contrib-handlebars`](https://npmjs.org/package/grunt-contrib-handlebars).

[Handlebars](http://handlebarsjs.com/) is a popular template library which helps you build HTML fragments populated with data from an object. A template looks something like:
	
	<div class="post">
	  <h1>{{title}}</h1>
	  <p>Published: {{date}}</p>
	</div>

The portions between `{{` and `}}` are dynamic and are populated from the object you feed to the template. If you are not familiar with it, its homepage describes the library in more depth.

There are two basic ways to include Handlebars templates in your web application:

1. Inline them as strings in JavaScript: 

		var template = "<div class='post'><h1>{{title}}</h1><p>Published: {{date}}</p></div>";

	This is bad because we're mixing JavaScript and HTML, and it's not too readable either.

2. Include them in the HTML inside `<script>` tags:

		<script type='text/x-handlebars' id='post-template'>
			<div class="post">
			  <h1>{{title}}</h1>
			  <p>Published: {{date}}</p>
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

### Configure the `handlebars` task

In its most basic form, we only need to define the _source_ and _destination_ files. Assuming the following file structure:

	my-project/
		templates/
			posts/
				list.hbs
				detail.hbs
			home.hbs
		js/
		Gruntfile.js
		package.json

We can write:

	handlebars: {
		all: {
			files: {
				"js/templates.js": ["templates/**/*.hbs"]
			}
		}
	}

Let's run this to see what happens:
	
	grunt handlebars

Grunt will take all files with a `.hbs` extension from the `templates` folder and all its sub-folders and merge them into a single file called `templates.js`. You can now include it in your HTML:

	<script type='text/javascript' src='js/templates.js'></script>

Inspecting `JST` in Developer Tools, we'll see it's an object whose keys are the names of the templates and whose values are the Handlebars templating functions for each:
	
	> JST
	Object
		templates/home.hbs          function(context, options) {...}
		templates/posts/list.hbs    function(context, options) {...}
		templates/posts/detail.hbs  function(context, options) {...}

In your JavaScript code, we use the templates as follows:

	var post = {
		title: 'My First Post',
		date: '10/10/2013'
	};
	var postTemplate = JST['templates/post/detail.hbs'];
	var html = postTemplate(post);

### Customize the names

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

Let's also get rid of the cruft in our template names &mdash; doesn't `posts/detail` look better than `templates/posts/detail.hbs`? We can accomplish this by using the `processName` option, which accepts a function with one argument (the file path) and returns the string to use as the template name:

	options: {
		namespace: 'MyApp.Templates',
		processName: function(filePath) {
			return filePath.replace(/^templates\//, '').replace(/\.hbs$/, '');
		}
	}

So, by removing the `templates/` prefix and the `.hbs` suffix from the file paths, we gen nice clean template names:

	> MyApp.Templates
		home            function(context, options) {...}
		posts/list      function(context, options) {...}
		posts/detail    function(context, options) {...}

### What about partials?

In templating languages, _partials_ are templates that can be reused in other templates. In Handlebars, you use the `{{> partial }}` helper to include partials. Let's take an example:

	<script type='text/x-handlebars' id='post-list-template'>
		<h2>{{ title }}</h2>
		<ul>
			{{#each posts}}
				<li>{{> post-item}}</li>
			{{/each}}
		</ul>
	</script>

	<script type='text/x-handlebars' id='post-item-template'>
		<span class='post'>{{ title }} - {{ date }}</span>
	</script>

We have two templates, one for the list of posts, and one for an individual item in the list. The former is a normal template, while the latter is used as a partial. To make everything happen, you'd write in your JavaScript code:

	var listString = document.getElementById('post-list-template').innerHTML;
	var itemString = document.getElementById('post-item-template').innerHTML;

	Handlebars.registerPartial('post-item', itemString);
	var template = Handlebars.compile(listString);

	template({
		title: 'All posts',
		posts: [
			{ title: 'First post', '10/10/2013'},
			{ title: 'Second post', '10/11/2013'}
		]	
	});

Which outputs the expected markup:
	
	<h2>All posts</h2>
	<ul>
		<li><span class='post'>First post - 10/10/2013</li>
		<li><span class='post'>Second post - 10/10/2013</li>
	</ul>

__Note:__ It's important to register the partial _before_ compiling any template that includes it, otherwise it will throw an error.

Let's see how the `handlebars` task works with partials. First, let's create a `_list-item.hbs` in our `templates` folder:

	my-project/
		templates/
			posts/
				_list-item.hbs
				list.hbs
				detail.hbs
			home.hbs
		js/
		Gruntfile.js
		package.json

If we run `grunt handlebars` again, we'll see that our `MyApp.Templates` does not include our newly created template. That's because the `handlebars` task assumes all files that start with `_` are partials and registers them using `Handlebars.registerPartial()` &mdash; internally, they're kept in the `Handlebars.partials` array.

Now we can just write:
	
	var template = MyApp.Templates['posts/list'];
	template({
		title: 'All posts',
		posts: [
			{ title: 'First post', '10/10/2013'},
			{ title: 'Second post', '10/11/2013'}
		]	
	});

and it works wonderfully!

### Take five

In this recipe, we made Handlebars templates better in terms of speed and maintainability by moving them to separate `.hbs` files.

__Tip:__ For even _more_ goodness, install Handlebars syntax highlighting in your favorite editor &mdash; I use [sublime-text-handlebars](https://github.com/nrw/sublime-text-handlebars) for Sublime Text.