module.exports = function(grunt) {

	grunt.initConfig({
		handlebars: {
			all: {
				files: {
					'js/templates.js': ['templates/**/*.hbs']
				},
				options: {
					namespace: 'MyApp.Templates',
					processName: function(filePath) {
						return filePath.replace(/^templates\//, '').replace(/\.hbs$/, '');
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-handlebars');

};