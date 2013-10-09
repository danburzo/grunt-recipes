module.exports = function(grunt) {

	grunt.initConfig({
		copy: {
			all: {
				files: [{
					expand: true,
					src: ['assets/**'],
					dest: 'book/'
				}]
			}
		},
		clean: {
			all: ['book']
		},
		watch: {
			all: {
				files: ['chapters/*.md', 'grunt-chapter.ejs'],
				tasks: ['clean', 'copy', 'pages'],
				options: {
					atBegin: true
				}
			}
		},

		pages: {
			options: {
				sortFunction: function(a, b) {
					if (a.sourcePath > b.sourcePath) return 1;
					if (b.sourcePath > a.sourcePath) return -1;
					return 0; 
				}
			},
			posts: {
				src: 'chapters',
				dest: 'book/chapters',
				layout: 'grunt-chapter.ejs',
				url: ':slug/'
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