module.exports = function(grunt) {
	grunt.initConfig({
		concat: {
			options: {
				separator: ';'
			}
		},
		jadeUsemin: {
			prod: {
				options: {
					targetPrefix: 'public',
					tasks: {
						js: ['concat', 'uglify']
					}
				},
				files: [{
					src: './assets/includes/main.jade',
					dest: './app/views/includes/main.jade'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-jade-usemin');

	grunt.registerTask('default', ['jadeUsemin:prod']);
};
