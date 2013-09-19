## Start a server

**Using:** [`grunt-contrib-connect`](https://npmjs.org/package/grunt-contrib-connect)

When working on a project on your machine, you test your stuff by pointing your browser to `file://path/to/your/project/index.html`. This alone is inelegant. But more importantly, _AJAX features won't work_ since they use the HTTP protocol, not the file protocol. 

What you need is a web server installed locally. You might be tempted to use an AMP stack &mdash; a fancy way of calling a bundle of Apache, MySQL and PHP &mdash; but it's a hassle to link your projects to its `www` folder (I'm lazy) and most of the time you'll use 1% of its features anyway. Plus, let's be honest, it feels a little retro. 

If you have Python installed, you can simply run this in your project folder instead:

	python -m SimpleHTTPServer // for Python 2.x
	python -m http.server // for Python 3.x

It will start a web server through which you can access your project at `http://localhost:8000`.

In this chapter, we'll learn how to configure the `connect` task to obtain a similar result, plus a few other perks.

### Install the `connect` task

	npm install grunt-contrib-connect --save-dev

and then load it into  your Gruntfile:
	
	grunt.loadNpmTasks('grunt-contrib-connect');

### Configure a persistent server

To create a persistent server (one which does not stop after Grunt tasks have completed), we will use `keepalive: true`:

	connect: {
		server: {
			options: {
				keepalive: true
			}
		}
	}

We've created a single target called `server` for our `connect` task.

### Run your server

	grunt connect:server

Now go to http://localhost:8000 and you should be able to browse your app, and see your `index.html` if you have one.

### More server configuration

You can customize the host name, port and protocol for your server:

	connect: {
		server: {
			options: {
				keepalive: true,
				protocol: 'https',
				hostname: 'myapp',
				port: '8080'
			}
		}
	}

The code above makes the server available at https://myapp:8080. This is useful in the case you want to start several servers at once, with different base directories, as in the example below:

	connect: {
		first: {
			options: {
				keepalive: true,
				hostname: 'firstsite',
				base: 'first-site'
			}
		},
		second: {
			options: {
				keepalive: true,
				hostname: 'secondsite',
				base: 'second-site'
			}
		}
	}

This makes the directories `first-site` and `second-site` from your project available at http://firstite:8000 and http://secondsite:8000, respectively.

### Routing everything back to index.html

If you're writing a Single-Page Web Application that uses the [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history), you'll be disappointed to find that your skillfully crafted URLs don't withstand a page refresh. The web server assumes a path like `http://localhost:8000/posts/100` points to a physical file and, failing to find it in your project, throws a _404 Not Found_ error.

Let's fix this by writing a custom _middleware_ for the `connect` task to redirect paths that don't correspond to physical files back to `index.html`.

For this we will be using the `connect-modrewrite` plugin &mdash; our first encounter with a plugin that's not specifically written for Grunt. But rest assured, it's basically the same thing. Let's install it in the same way as with any other plugin:

	npm install connect-modrewrite --save-dev

And then use it in our Gruntfile:

	var rewrite = require('connect-modrewrite');

Let's see how we can use it in our `connect` task:

	var rewrite = require('connect-modrewrite');

	grunt.initConfig({
		connect: {
			server: {
				keepalive: true,
				hostname: 'localhost',
				middleware: function(connect, options) {

					var middleware = [];
					
					// original middleware behavior
					var base = options.base;
					if (!Array.isArray(base)) {
						base = [base];
					}
					base.forEach(function(path) {
						middleware.push(connect.static(path));
					});

					// mod-rewrite behavior
					var rules = [
						'!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ /index.html'
					];
					middleware.push(rewrite(rules));

					return middleware;
				}
			}
		}
	});	

We've written a custom `middleware` function which returns an array of chained middleware. Because we're overwriting the original implementation altogether, we need to make sure to include it &mdash; it's the part with `connect.static`. We're then adding our rewrite middleware to the chain; it contains a single rule which states that all files except HTML, stylesheets, scripts and images should be redirected to `index.html`.

### Take five

In this recipe, we've learned how to use the `connect` task to start a local server. In addition, we've made it useful for developing apps that use the HTML5 History API by redirecting all paths that don't correspond to static assets back to the main HTML.