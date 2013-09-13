## Our Big Project &mdash; creating a static website plugin

Let's put everything we know together to create a static website generator that takes pages in markdown format and assembles them into a fully-functional blog.

Let's look at the structure we want for the project:

	my-blog
		posts/
			hello_world.post
			second_post.post
		templates/
			partials/
				header.tmpl
				footer.tmpl
			index.tmpl
			post.tmpl
			archive.tmpl
		styles/
			blog.css
		blog/
			<our blog gets generated here>
		Gruntfile.js
		package.json

We will need to take the information for each post from the `.post` file and build a corresponding `.html` file by assembling it from templates:

*  `index.tmpl`, `post.tmpl` and `archive.tmpl` correspond to the different types of pages we will have: a home page, a list of all the posts and pages for the individual posts;
* `partials` contains the parts common to all page types, such as the header and the footer.

