'use strict';

module.exports = function (grunt) {
   // ��Ŀ����
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
  
  //uglify: ѹ��javascript
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //concat: �ϲ��ļ�
  grunt.loadNpmTasks('grunt-contrib-concat');
  //jshint: ���javascript�﷨����
  grunt.loadNpmTasks('grunt-contrib-jshint');
  //watch: �Զ���
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  //ִ��grunt����
  grunt.registerTask('concat', ['concat']);
  
  grunt.registerTask('tasks', ['jshint','uglify','watch']);
  
  grunt.registerTask('default', ['concat']);
}