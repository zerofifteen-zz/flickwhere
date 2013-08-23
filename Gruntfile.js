'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; */',

        clean: {
            css: {
                src : [
                    'app/static/dist/**/*.css',
                    'app/static/css/**/*.css'
                ]
            },
            jst: {
                src : [
                    'app/static/dist/templates/**/*.js'
                ]
            },
            js: {
                src : [
                    'app/static/dist/js/**/*.js'
                ]
            }
        },

        less: {
            production: {
                files: {
                    'app/static/dist/css/core.min.css' : [
                        // Base
                        'app/static/less/base/fonts.less',
                        'app/static/less/base/normalize.less',
                        'app/static/less/base/base.less',
                        'app/static/less/base/layout.less',

                        // Modules
                        'app/static/less/modules/map.less',
                        'app/static/less/modules/flickr.less'
                    ]
                }
            },
            development: {
                expand: true,
                cwd: 'app/static/less/',
                src: [
                    'base/*.less',
                    'modules/*.less'
                ],
                dest: 'app/static/css/',
                ext: ".css"
            }
        },

        jst: {
            options: {
                processName: function(filename) {
                    return filename.toLowerCase().replace('app/static/templates/', '');
                }
            },
            app: {
                files: {
                    'app/static/dist/templates/templates.js' : [
                        'app/static/templates/**/*.html'
                    ]
                }
            }
        },

        jshint: {
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'Gruntfile.js'
            },
            app : {
                options: {
                    jshintrc: 'src/js/.jshintrc'
                },
                src: 'app/static/js/**/*.js'
            }
        },

        mocha_phantomjs: {
            all: ['test/**/*.html']
        },

        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: 'jshint:gruntfile',
                options: {
                    livereload: true
                }
            },
            less: {
                files: 'app/static/less/**/*.less',
                tasks: 'build-css',
                options: {
                    livereload: true
                }
            },
            jst: {
                files: 'app/static/templates/**/*.html',
                tasks: 'build-jst',
                options: {
                    livereload: true
                }
            },
            js: {
                files: 'app/static/js/**/*.js',
                tasks: 'build-js',
                options: {
                    livereload: true
                }
            },
            html: {
                files: 'app/*.html',
                options: {
                    livereload: true
                }
            }
        },

        connect: {
            server: {
                options: {
                    hostname: '*',
                    port: 9000
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-mocha-phantomjs');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', [
        'jshint',
        'build-css',
        'build-js',
        'mocha_phantomjs'
    ]);

    grunt.registerTask('build-css', [
        'clean:css',
        'less'
    ]);

    grunt.registerTask('build-jst', [
        'clean:jst',
        'jst'
    ]);

    grunt.registerTask('build-js', [
        'build-jst',
        'clean:js',
        'concat',
        'uglify'
    ]);

    grunt.registerTask('serve', [
        'jshint:gruntfile',
        'connect',
        'build-css',
        'watch'
    ]);

    grunt.registerTask('test', [
        'jshint:gruntfile',
        'build-css',
        'build-jst',
        'mocha_phantomjs',
    ]);
};
