module.exports = function(grunt) {

	grunt.initConfig({
		
		sass: {
			all: {
				files: [{
					expand: true,
					cwd: 'scss/',
					src: ['*.scss'],
					dest: 'css/',
					ext: '.css'
				}]
			}
		},

		handlebars: {
			all: {
				files: {
					'js/templates.js': ['templates/**/*.hbs']
				}
			}
		},

		watch: {
			options: {
				atBegin: true
			},
			sass: {
				files: ['scss/**/*.scss'],
				tasks: ['sass']
			},
			handlebars: {
				files: ['templates/**/*.hbs'],
				tasks: ['handlebars']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-contrib-watch');

};