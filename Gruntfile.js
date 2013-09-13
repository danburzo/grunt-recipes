module.exports = function(grunt) {

	grunt.initConfig({
		concat: {
			all: {
				files: {
					'dist/grunt-recipes.md': ['chapters/*.md']
				}
			}
		},
		copy: {
			all: {
				files: [{
					expand: true,
					src: ['assets/**'],
					dest: 'dist/'
				}]
			}
		},
		markdown: {
			all: {
				files: {
					'dist/grunt-recipes.html': 'dist/grunt-recipes.md'
				},
				options: {
					markdownOptions: {
						gfm: true,
						tables: true
					},
					template: 'grunt-recipes.tmpl'
				}
			}
		},
		watch: {
			all: {
				files: ['chapters/*.md', '*.tmpl'],
				tasks: ['concat', 'copy', 'markdown'],
				options: {
					atBegin: true
				}
			}
		},

		logfiles: {
			filesObject: {
				files: {
					'dist/destination': ['chapters/*.md', '*.tmpl']
				}
			},
			filesArray: {
				files: [{
					src: ['chapters/*.md', '*.tmpl'],
					dest: 'dist/destination'
				}]
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

	grunt.registerMultiTask('logfiles', function() {
		this.files.forEach(function(file) {
            grunt.log.writeln('File ' + file.dest + ' has the sources ' + grunt.log.wordlist(file.src));
        }); 
	});
};