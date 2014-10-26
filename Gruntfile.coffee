module.exports = (grunt) ->

	# Project configuration
	grunt.initConfig
		pkg: grunt.file.readJSON 'package.json'

		watch:
			less:
				files: ['source/less/**']
				tasks: ['less:build']
			js:
				files: ['source/js/**.js', 'source/js/modules/**.js']
				tasks: ['copy:js', 'concat:js']
			views:
				files: ['source/index.html', 'source/views/**']
				tasks: ['copy:index', 'copy:views', 'concat:views']

		concurrent:
			options:
				logConcurrentOutput: true
			watch:
				tasks: ['watch:less', 'watch:js', 'watch:views']

		concat:
			js:
				options:
					separator: ';'
					process: (source, filename) -> '(function() {\n'+source+'\n})();'
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
				options:
					process: (source, filename) -> '(function() {\n'+source+'\n})();'
				files: [
					{
						expand: true
						cwd: 'source/js/'
						src: ['app.js']
						dest: 'www/js'
					}
				]
			lib:
				files: [
					{
						expand: true
						cwd: 'bower_components/'
						flatten: true
						src: ['*/*.js', '!*/*.min.js']
						dest: 'www/js/lib'
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

		'http-server':
			dev:
				root: 'www/'
				port: 8080
				host: '127.0.0.1'
				cache: 0
				showDir: true
				autoIndex: true
				ext: "html"
				runInBackground: true


	grunt.loadNpmTasks 'grunt-contrib-less'
	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-contrib-concat'
	grunt.loadNpmTasks 'grunt-contrib-copy'
	grunt.loadNpmTasks 'grunt-contrib-clean'
	grunt.loadNpmTasks 'grunt-http-server'
	grunt.loadNpmTasks 'grunt-concurrent'

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
			'copy:lib'
			'copy:img'
		]
	grunt.registerTask 'dev', ['build', 'http-server:dev', 'concurrent:watch']
	grunt.registerTask 'default', ['dev']
