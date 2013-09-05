### Start a server

**Using:** [`grunt-contrib-connect`](https://npmjs.org/package/grunt-contrib-connect)

#### Install the `connect` task

	npm install grunt-contrib-connect --save-dev

and then load it into  your Gruntfile:
	
	grunt.loadNpmTasks('grunt-contrib-connect');

#### Configure a persistent server

To create a persistent server (one which does not stop after Grunt tasks have completed), we will use `keepalive: true`:

	connect: {
		server: {
			options: {
				keepalive: true
			}
		}
	}

We've created a single target called `server` for our `connect` task.

#### Run your server

	grunt connect:server

Now go to http://localhost:8000 and you should be able to browse your app, and see your `index.html` if you have one.

#### More server configuration

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

#### Take five

In this recipe, we've learned how to use the `connect` task to start a local server.