module.exports = function(grunt) {

	grunt.initConfig({
		markdown: {
			all: {
				files: [{
					expand: true,
					src: '*.md',
					dest: 'dist/',
					ext: '.html'
				}],
				options: {
					markdownOptions: {
						gfm: true
					}
				}
			}
		},
		watch: {
			all: {
				files: ['*.md'],
				tasks: ['markdown'],
				options: { spawn: false }
			}
		}
	});

	grunt.loadNpmTasks('grunt-markdown');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch']);
};