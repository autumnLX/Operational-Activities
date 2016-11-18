'use strict';

module.exports = function (grunt) {
   // 项目配置
  grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/zepto.js', 'src/common.js'],
        dest: 'dest/lib.min.js'
      }
    },
	uglify: {
      options: {
        banner: '/*! <%= pkg.file %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['src/<%=pkg.file %>.js'],
        dest: 'dest/<%= pkg.file %>.min.js'
      }
    },
    jshint: { 
		all: ['src/test.js']
    },
	watch:{
		build:{
			files:['src/*.js','src/*.css'],
			tasks:['jshint','uglify'],
			options:{spawn:false}
		}
	}
  });
  
  //uglify: 压缩javascript
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //concat: 合并文件
  grunt.loadNpmTasks('grunt-contrib-concat');
  //jshint: 检查javascript语法错误
  grunt.loadNpmTasks('grunt-contrib-jshint');
  //watch: 自动化
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  //执行grunt任务
  grunt.registerTask('concat', ['concat']);
  
  grunt.registerTask('tasks', ['jshint','uglify','watch']);
  
  grunt.registerTask('default', ['concat']);
}