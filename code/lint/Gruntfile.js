module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporterOutput: 'jshint.log'
			},
			all: {
				files: { 
					src: ['scripts/*.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');

};