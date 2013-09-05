module.exports = function(grunt) {

	grunt.initConfig({
		concat: {
			all: {
				files: {
					'dist/grunt-recipes.md': ['chapters/*.md']
				}
			}
		},
		markdown: {
			all: {
				files: {
					'dist/grunt-recipes.html': 'dist/grunt-recipes.md'
				},
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
				files: ['chapters/*.md', '*.tmpl'],
				tasks: ['concat', 'markdown'],
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