module.exports = (grunt) ->

	# Project configuration
	grunt.initConfig
		pkg: grunt.file.readJSON 'package.json'

		watch:
			options:
				livereload: true
			less:
				files: ['source/less/**']
				tasks: ['less:build']
			js:
				files: ['source/js/**.js', 'source/js/modules/**.js']
				tasks: ['copy:js', 'concat:js']
			views:
				files: ['source/index.html', 'source/views/**']
				tasks: ['copy:index', 'copy:views', 'concat:views']

		concat:
			js:
				src: ['source/js/modules/**.js']
				dest: 'www/js/modules.js'
			views:
				src: ['source/views/**.html']
				dest: 'www/views.html'

		clean:
			build: ['www/**']

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
			build:
				options:
					paths: ['source/less']
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
	grunt.registerTask 'build', [
			'clean:build'
			'less:build'
			'copy:js'
			'concat:js'
			'copy:index'
			'copy:views'
			'concat:views'
			'copy:misc'
			'copy:img'
		]
	grunt.registerTask 'default', ['build', 'watch:less', 'watch:js', 'watch:views']
