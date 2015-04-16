cson = require 'coffeeson'

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
				tasks: ['copy:views', 'concat:views', 'copy:index']
			data:
				files: ['source/rockData/***']
				tasks: ['compileData:rocks']

		concurrent:
			options:
				logConcurrentOutput: true
			watch:
				tasks: ['watch:less', 'watch:js', 'watch:views']

		concat:
			js:
				options:
					process: (source, filename) -> "\n(function() {\n#{source}\n})();\n"
				src: ['source/js/modules/**.js']
				dest: 'www/js/modules.js'
			views:
				options:
					process: (source, filename) -> "<script type=\"text/ng-template\" id=\"/views/#{filename.split('/').pop()}\">#{source}</script>"
				src: ['source/views/**.html']
				dest: 'www/views.html'

		clean:
			build: ['www/**']

		compileData:
			rocks:
				src: 'source/rockData/*.coffee'
				dest: 'www/rockData'
				varname: 'rockData'
			quiz:
				src: 'source/quiz.coffee'
				dest: 'www/'
				varname: 'quizData'
			glossary:
				src: 'source/glossary.coffee'
				dest: 'www/'
				varname: 'glossaryData'

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
				options:
					process: (source, filename) -> source.replace '</head>', "#{grunt.file.read 'www/views.html'}\n</head>"
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
						src: ['app.js', 'index.js']
						dest: 'www/js'
					}
				]
			lib:
				files: [
					{
						expand: true
						cwd: 'bower_components/'
						flatten: true
						src: ['*/*.js', '!*/*.min.js', '*/src/*.js']
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
			fonts:
				files: [
					{
						expand: true
						cwd: 'source/fonts/'
						src: ['**']
						dest: 'www/fonts'
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

	grunt.registerMultiTask 'compileData', 'Compile the data in coffeescript format', () ->
		name = this.target
		targets = grunt.file.expandMapping this.data.src, this.data.dest, cwd: './', ext: '.json', flatten: true
		all = []
		compile = (item) ->
			try
				json = cson.parse grunt.file.read item.src[0]
			catch error
				console.error "Invalid cson: "+item.src[0]
			itemid = item.dest.split('/').pop().split('.')[0]
			json.rockid = itemid
			all.push json
			outpath = item.dest.split('/')[...-1].join('/') + '/'
			outfile = outpath + item.dest.split('/').pop()
			grunt.file.write outfile, JSON.stringify json

		compile target for target in targets
		finalTarget = "#{this.data.dest}/#{name}.json"

		rockObj = {rocks:all}
		all.forEach (rock) ->
			rockObj[rock.rockid] = rock

		grunt.file.write finalTarget, JSON.stringify all
		grunt.file.write finalTarget.replace('.json', '.js'), "var #{this.data.varname} = #{JSON.stringify rockObj}"
		console.log "Compiled #{all.length} data file#{if all.length == 1 then '' else 's'} for #{name}"

	grunt.registerTask 'build', [
			'clean:build'
			'less:build'
			'copy:js'
			'concat:js'
			'copy:views'
			'concat:views'
			'copy:index'
			'copy:misc'
			'copy:lib'
			'copy:img'
			'copy:fonts'
			'compileData:rocks'
			'compileData:quiz'
			'compileData:glossary'
		]
	grunt.registerTask 'dev', ['build', 'http-server:dev', 'concurrent:watch']
	grunt.registerTask 'default', ['dev']
