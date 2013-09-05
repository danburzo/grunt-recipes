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
					},
					template: 'grunt-recipes.tmpl'
				}
			}
		},
		watch: {
			all: {
				files: ['*.md', '*.tmpl'],
				tasks: ['markdown'],
				options: {
					atBegin: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-markdown');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch']);
};