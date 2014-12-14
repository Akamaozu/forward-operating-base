module.exports = function(grunt){
	
	grunt.registerTask('build', ['build-css', 'htmlbuild', 'clean']);
}