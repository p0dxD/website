'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    var serveStatic = require('serve-static')
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        watch: {
            css: {
                files: 'src/assets/scss/**/*.scss',
                tasks: ['sass']
            },
            js: {
                files: ['src/assets/js/**/*.js'],
                tasks: ['copy:mainjs'],
            },
            html: {
                files: ['src/**/**/*.hbs'],
                tasks: ['assemble']
            },
            img: {
                files: ['src/assets/images/**/*.{jpg,gif,png}'],
                tasks: ['copy:img']
            },
            fonts: {
                files: ['src/assets/fonts/**/*.{otf,ttf,woff,eot}'],
                tasks: ['copy:fonts']
            },
            json: {
                files: ['src/data/**/*.json'],
                tasks: ['assemble']
            },

            hbs: { 
                files: ['src/**/*.hbs'],
                tasks: ['assemble']
            },

            livereload: {
                options: {
                    livereload: 35729
                },
                files: [
                'src/**/*.hbs',
                'src/assets/scss/**/*.scss',
                'src/assets/js/*.js',
                'src/assets/img/**/*.{png,jpg,jpeg,gif,webp,svg}',
                'src/data/**/*.json'
                ]
            }
        },//end watch 

        connect: {
            options: {
                port: 9000,
                // hostname: 'localhost', // change this to '0.0.0.0' to access the server from outside
                hostname: '0.0.0.0',
                livereload: 35729
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                        serveStatic('p0dxD.github.io')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function(connect) {
                        return [
                        serveStatic('p0dxD.github.io')
                        ];
                    }
                }
            }
        },//end connect

        assemble: {
            options: {
                assets: 'src/assets',
                // plugins: ['permalinks'],
                partials: ['src/partials/**/*.hbs'],
                layoutdir: 'src/layouts',
                data: ['src/data/**/*.{json,yml}']
            },
            index: {
                options: {
                    layout: 'base.hbs',
                    assets: 'p0dxD.github.io/assets'
                },
                expand: true,
                cwd: 'src/pages',
                src: ['**/*.hbs'],
                dest: 'p0dxD.github.io/'
            },

            projects: {
                options: {
                    layout: 'projects.hbs',
                    assets: 'p0dxD.github.io/assets'
                },
                expand: true,
                cwd: 'src/pages/projects',
                src: ['**/*.hbs'],
                dest: 'p0dxD.github.io/projects/'
            }
        },//end assemble

        jshint: {
            all: [
            'src/assets/js/**/*.js'
            ]
        },

        compass: {
            build: {
                options: {
                    sassDir: 'src/assets/scss',
                    cssDir: 'p0dxD.github.io/assets/css',
                    environment: 'production'
                }
            },
            dev: {
                options: {
                    sassDir: 'src/assets/scss',
                    cssDir: 'p0dxD.github.io/assets/css'
                }
            }
        },

        copy: {
            mainjs: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/js/',
                    src: '**/*',
                    dest: 'p0dxD.github.io/assets/js/'
                }, ],
            },
            img: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/img/',
                    src: '**/*',
                    dest: 'p0dxD.github.io/assets/img/'
                }, ],
            },
            css: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/css/',
                    src: '**/*',
                    dest: 'p0dxD.github.io/assets/css/'
                }, ],
            },
            fonts: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/fonts/',
                    src: '**/*',
                    dest: 'p0dxD.github.io/assets/fonts/'
                }, ],
            },
            etc: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '*.{png,ico,jpg,gif,md,txt}',
                    dest: 'p0dxD.github.io/'
                }]
            }
        },

        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            files: {
                src: 'p0dxD.github.io/assets/css/main.css',
                dest: 'p0dxD.github.io/assets/css/main.min.css'
            }
        },

        uglify: {
            
            mainjs: {
                src: 'p0dxD.github.io/assets/js/**/*.js',
                dest: 'p0dxD.github.io/assets/js/*.min.js'

            }
        },

        clean: {
            html: ['p0dxD.github.io/**/*.html'],
            js: ['p0dxD.github.io/assets/js'],
            css: ['p0dxD.github.io/assets/css'],
            img: ['p0dxD.github.io/assets/img']
        },

        pure_grids: {
            dest: 'p0dxD.github.io/assets/css/main-grid.css',

            options: {
                units: 12, //12- column grid

                mediaQueries: {
                    sm: 'screen and (min-width: 35.5em)', // 568px
                    md: 'screen and (min-width: 48em)',   // 768px
                    lg: 'screen and (min-width: 64em)',   // 1024px
                    xl: 'screen and (min-width: 80em)'    // 1280px
                }
            }
        },

        sass: {
            dist: {
              files: {
                'p0dxD.github.io/assets/css/main.css': 'src/assets/scss/main.scss',
        //'widgets.css': 'widgets.scss'
    }
}
}


});

    grunt.loadNpmTasks('assemble'); // Special case

    // Default task(s).
    grunt.registerTask('default', [
        'assemble',
        //'compass:dev',
        'copy',
        'connect:livereload',
        'watch'
        ]);

    grunt.registerTask('build', [
        'clean',
        // 'jshint',
        'assemble',
        'pure_grids',
        'sass',
        //'compass',
        'copy',
        'cssmin',
        // 'uglify'
        ]);

};