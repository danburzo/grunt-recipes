module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			options: {

				// path for our rules file
				jshintrc: '.jshintrc',

				// path to our output file
				reporterOutput: 'jshint.log'
			},
			all: ['scripts/*.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');

};