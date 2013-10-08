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
		watch: {
			all: {
				files: ['chapters/*.md', 'grunt-chapter.ejs'],
				tasks: ['copy', 'pages'],
				options: {
					atBegin: true
				}
			}
		},

		pages: {
			options: {},
			posts: {
				src: 'chapters',
				dest: 'book/chapters',
				layout: 'grunt-chapter.ejs',
				url: ':title/'
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