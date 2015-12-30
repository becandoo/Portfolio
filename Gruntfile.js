/*
 * Generated on 2015-12-02
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2015 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'site'
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      scss: {
        files: 'src/assets/scss/**/*.scss',
        tasks: [ 'sass', 'copy' ]
      },
      js: {
        files: 'src/assets/coffescript/*.coffee',
        tasks: [ 'coffee' ]
      },
      jade: {
        files: 'src/*.jade',
        tasks: [ 'jade' ]
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    jade: {
      compile: {
        options: {
          data: {}
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: [ '**/*.jade' ],
          dest: '<%= config.src %>/templates/partials',
          ext: '.hbs'
        }]
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs',
          plugins: ['assemble-contrib-permalinks','assemble-contrib-sitemap'],
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },

    // sass (libsass) config
    sass: {
      dist: {
        options: {
         style: 'expanded',
         require: 'susy',
         compass: true
       },
        files: [{
          expand: true,
          cwd: 'src/assets/scss/',
          src: ['*.scss'],
          dest: 'src/assets/stylesheets',
          ext: '.css'
        }]
      }
    },

    copy: {
      css: {
        expand: true,
        cwd: 'src/assets/stylesheets',
        src: '**',
        dest: '<%= config.dist %>/assets/css/'
      },
      js: {
        expand: true,
        cwd: 'src/assets/js',
        src: '**',
        dest: '<%= config.dist %>/assets/js/'
      },
      images: {
        expand: true,
        cwd: 'src/assets/images',
        src: '**',
        dest: '<%= config.dist %>/assets/images/'
      }
    },

    sassyclean: {
      options: {
        modules: ['src/assets/scss/partials/*.scss', 'src/assets/scss/layouts/**/*.scss', 'src/assets/scss/utilities/**/*.scss', 'src/assets/scss/base/**/*.scss'],
        buildfiles: ['src/assets/scss/**/*.scss'],
        remove: true,
        days: null
      },
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml,css,js}']

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-sassyclean');

  grunt.registerTask('server', [
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'sassyclean',
    'sass',
    'jade',
    'copy',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build',
    'server'
  ]);

};
