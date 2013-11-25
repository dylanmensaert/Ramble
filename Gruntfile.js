'use strict';

module.exports = function (grunt) {
    var config = {
        //server
        api: 'api',
        config: 'config',
        views: 'views',
        tmpPublic: '.tmp/public',
        //assets
        assets: 'assets',
        javascripts: 'assets/javascripts',
        sass: 'assets/sass',
        stylesheets: '.tmp/public/stylesheets',
        images: 'assets/images',
        //prod
        prodJavascripts: '.tmp/public/javascripts',
        prodImages: '.tmp/public/images',
        prodFonts: '.tmp/public/fonts',
        //other
        test: 'test',
        components: 'assets/bower_components',
        templatesjs: 'assets/javascripts/init/templates.js',
        bootstrapFonts: 'assets/bower_components/sass-bootstrap/fonts'
    };

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        config: config,
        clean: {
            tmpPublic: {
                src: ['<%= config.tmpPublic %>']
            },
            cleanup: {
                src: [
                    '<%= config.templatesjs %>',
                    '.sass-cache',
                    'node_modules',
                    '<%= config.components %>'
                ]
            }
        },
        copy: {
            bootstrapFonts: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.bootstrapFonts %>',
                        src: ['**'],
                        dest: '<%= config.prodFonts %>'
                    }
                ]
            },
            development: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.assets %>',
                        src: ['**'],
                        dest: '<%= config.tmpPublic %>'
                    }
                ]
            },
            production: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.images %>',
                        src: ['**'],
                        dest: '<%= config.prodImages %>'
                    }
                ]
            }
        },
        emberTemplates: {
            all: {
                options: {
                    amd: true,
                    templateBasePath: '<%= config.javascripts %>' + '/',
                    templateName: function (sourceFile) {
                        var templateName = sourceFile;

                        templateName = templateName.replace('/template', '');

                        return templateName;
                    },
                    templateCompilerPath: 'assets/bower_components/ember/ember-template-compiler.js',
                    handlebarsPath: 'assets/bower_components/handlebars/handlebars.js'
                },
                files: {
                    '<%= config.templatesjs %>': '<%= config.javascripts %>/**/*.handlebars'
                }
            }
        },
        compass: {
            options: {
                importPath: '<%= config.components %>',
                sassDir: '<%= config.sass %>',
                cssDir: '<%= config.stylesheets %>',
                imagesDir: '<%= config.images %>',
                javascriptsDir: '<%= config.javascripts %>',
                boring: true
            },
            development: {
            },
            production: {
                options: {
                    environment: 'production',
                    specify: ['<%= config.sass %>/main.scss']
                }
            }
        },
        requirejs: {
            all: {
                options: {
                    baseUrl: '<%= config.javascripts %>',
                    name: '../bower_components/almond/almond',
                    include: ['main'],
                    mainConfigFile: '<%= config.javascripts %>/main.js',
                    out: '<%= config.prodJavascripts %>/main.js',
                    paths: {
                        ember: '../bower_components/ember/ember.prod',
                        'ember-data': '../bower_components/ember-data-shim/ember-data.prod'
                    }
                }
            }
        },
        jshint: {
            options: {
                jshintrc: true
            },
            client: {
                src: ['<%= config.javascripts %>/**/*.js']
            },
            test: {
                src: ['<%= config.test %>/**/*.js']
            },
            server: {
                src: ['*.js', '<%= config.api %>/**/*.js', '<%= config.config %>/**/*.js']
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            all: {
                src: ['<%= config.stylesheets %>/**/*.css', '!<%= config.stylesheets %>/main.css']
            }
        },
        nodemon: {
            server: {
                options: {
                    watchedFolders: ['<%= config.api %>', '<%= config.config %>'],
                    nodeArgs: ['--debug'],
                    delayTime: 0.1
                }
            }
        },
        'node-inspector': {
            development: {
            }
        },
        watch: {
            emberTemplates: {
                files: ['<%= config.javascripts %>/**/*.handlebars'],
                tasks: ['emberTemplates:all']
            },
            compass: {
                files: ['<%= config.sass %>/**/*.scss'],
                tasks: ['compass:development']
            },
            livereload: {
                files: [
                    '<%= config.assets %>/*.*',
                    '<%= config.api %>/**/*.js',
                    '<%= config.config %>/**/*.js',
                    '<%= config.views %>/**/*',
                    '<%= config.javascripts %>/**/*.js',
                    '<%= config.stylesheets %>/main.css',
                    '<%= config.images %>/**/*.*'
                ],
                tasks: ['copy:development'],
                options: {
                    livereload: true
                }
            }
        },
        concurrent: {
            development: {
                tasks: ['nodemon:server', 'node-inspector:development', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.registerTask('default', ['clean:tmpPublic', 'emberTemplates:all', 'compass:development', 'copy:development', 'copy:bootstrapFonts']);
    //TODO: Improve integration of unit tests!!
    grunt.registerTask('test', ['jshint', 'emberTemplates:all', 'requirejs:all', 'compass:development', 'csslint:all']);
    grunt.registerTask('prod', ['clean:tmpPublic', 'emberTemplates:all', 'requirejs:all', 'compass:production', 'copy:production', 'copy:bootstrapFonts']);

    grunt.registerTask('develop', ['concurrent:development']);

    grunt.registerTask('cleanup', ['clean:tmpPublic', 'clean:cleanup']);
};
