module.exports = function(grunt) {

	// project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less: {
			developmnet: {
				options: {
					paths: ["./src/less"]	//, yuicompress: true	
				}
			},
			// less files that will be compiled to css
			files: { 
				"./assets/stylesheets/styles.css" : "./src/less/styles.less"
			}
		},
		//running 'grunt watch' will watch for changes
		watch: {
			files: "./src/less/*.less",
			tasks: ["less"]
		} 
	}) ;

	grunt.loadNpmTasks('grunt-contrib-less') ; 
	grunt.loadNpmTasks('grunt-contrib-watch') ; 

	grunt.registerTask('default', ['watch']) ; 

} ; 