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

	var package = grunt.file.readJSON('package.json');
	if (package.devDependencies) {
		var gruntTasks = Object.keys(package.devDependencies).filter(function(task) {
			return task.indexOf('grunt-') === 0;	
		});
		gruntTasks.forEach(grunt.loadNpmTasks);
	}

	grunt.registerTask('default', ['watch']);
};