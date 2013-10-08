{
  title: "Our Big Project &mdash; creating a static website plugin"
}

Let's put everything we know together to create a static website generator that takes pages in markdown format and assembles them into a fully-functional blog.

### What we're trying to do

Let's look at the structure we want for the project:

	my-blog
		init/
			sample.post
		content/
			hello_world.post
			second_post.post
		templates/
			partials/
				header.tmpl
				footer.tmpl
			archive.tmpl
			category.tmpl
			index.tmpl
			post.tmpl
		styles/
			blog.css
		scripts/
			blog.js
		blog/
			<our blog gets generated here>
		Gruntfile.js
		package.json

We will need to take the information for each post from the `.post` file and build a corresponding `.html` file by assembling it from templates:

*  templates that correspond to the different types of pages we will have: a home page, a list of all the posts, a list of posts in a specific category and pages for the individual posts;
* `partials` which are the parts common to all page types, such as the header and the footer.

#### The structure of posts

We want to be able to include some meta-data along with the content of our posts, so a post should look like:

	[METADATA]

	title: My Post
	slug: my-post
	date: September 13, 2013
	category: General

	[CONTENT]

	<markdown content goes here>

Let's think about the kind of metadata is useful:

* `title` for the title of the post;
* `slug` for the URL part leading to the post; in the example above, it would be `http://myawesomeblog.com/my-post`; in the absence of an explicit slug, we should generate it based on the post title based on some rules;
* `date` when the post was written; if ommited, we can look at the timestamp on the file itself.
* `category` of the post.

We've also created a `init` folder containing `sample.post` so we don't have to start each page from scratch. We'll create a separate Grunt task that creates new posts for us:

	grunt new "Post title"


### Let's gather our tools

Off the top of our heads, we will most definitely need:

* `grunt-contrib-copy` to copy everything to the `blog` folder;
* `grunt-contrib-clean` to clean up after generating temporary files;
* `grunt-markdown` to convert the Markdown content of our posts to HTML.


### Building the Gruntfile

	grunt.initConfig({
		copy: {
			sample: {
				files: [{
					src: 'init/sample.post',
					dest: 'posts/new_post.post'
				}]
			}
		}
	});

	grunt.registerTask('default', 'Build the blog', []);
	grunt.registerTask('new', 'Create a new post', ['copy:sample'])

