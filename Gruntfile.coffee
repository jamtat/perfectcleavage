module.exports = (grunt) ->

	# Project configuration
	grunt.initConfig
		pkg: grunt.file.readJSON 'package.json'

		watch:
			options:
				livereload: true
			less:
				files: ['source/less/**']
				tasks: ['less:development']
			js:
				files: ['source/js/**.js', 'source/js/modules/**.js']
				tasks: ['copy:js', 'concat:js']
			views:
				files: ['source/index.html', 'source/views/**']
				tasks: ['copy:index', 'copy:views']

		concat:
			js:
				src: ['source/js/modules/**.js']
				dest: 'www/js/modules.js'


		copy:
			misc:
				files: [
					{
						expand: true
						src: ['res/**', 'spec/**', 'spec.html', 'icon.png']
						dest: 'www/'
					}
				]
			index:
				src: 'source/index.html'
				dest: 'www/index.html'
			views:
				files: [
					expand: true
					cwd: 'source/views/'
					src: ['**']
					dest: 'www/views'
				]
			js:
				files: [
					{
						expand: true
						cwd: 'source/js/'
						src: ['app.js']
						dest: 'www/js'
					}
				]
			img:
				files: [
					{
						expand: true
						cwd: 'source/img/'
						src: ['**']
						dest: 'www/img'
					}
				]

		less:
			development:
				options:
					paths: ['less']
					cleancss: false
				files:
					'www/css/main.css': 'source/less/main.less'


	grunt.loadNpmTasks 'grunt-contrib-less'
	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-contrib-concat'
	grunt.loadNpmTasks 'grunt-contrib-copy'
	grunt.loadNpmTasks 'grunt-contrib-clean'

	# Default task(s)
	grunt.registerTask 'default', ['watch:less', 'watch:js']
	grunt.registerTask 'build', [
			'clean:build',
			'copy:build',
			'imagemin:build',
			'svgmin:build',
			'cssmin:build',
			'less:build',
			'uglify:buildcopymin',
			'uglify:build'
		]
