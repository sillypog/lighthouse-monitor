module.exports = function(grunt) {
	grunt.initConfig({
		asset_packager: {
			js: {
				options: {
					js: {
						includes: 'app/views/includes',
						source: 'public'
					}
				},
				files: [{src: ['assets/packages/**/*.pkg'], expand: true}]
			}
		},
		clean: ['app/views/includes', 'public/js']
	});

	require('load-grunt-tasks')(grunt);	// Load all the tasks installed via npm.

	grunt.registerTask('set_config', 'Set a config property', function(name, val){
		grunt.config.set(name, val);
	});

	grunt.registerTask('pack', ['clean', 'asset_packager']);
	grunt.registerTask('dev', ['set_config:mode:DEVELOPMENT', 'pack']);
	grunt.registerTask('prod', ['set_config:mode:PRODUCTION', 'pack']);

	grunt.registerTask('default', ['dev']);
};
