'use strict';

module.exports = function(grunt) {
    var config = {
        //server
        api: 'api',
        config: 'config',
        views: 'views',
        tmpPublic: '.tmp/public',
        //assets
        assets: 'assets',
        javascripts: 'assets/javascripts',
        less: 'assets/less',
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
        bootstrapFonts: 'assets/bower_components/bootstrap/dist/fonts'
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
                    'node_modules',
                    '<%= config.components %>'
                ]
            }
        },
        copy: {
            bootstrapFonts: {
                files: [{
                    expand: true,
                    cwd: '<%= config.bootstrapFonts %>',
                    src: ['**'],
                    dest: '<%= config.prodFonts %>'
                }]
            },
            development: {
                files: [{
                    expand: true,
                    cwd: '<%= config.assets %>',
                    src: ['**'],
                    dest: '<%= config.tmpPublic %>'
                }]
            },
            production: {
                files: [{
                    expand: true,
                    cwd: '<%= config.images %>',
                    src: ['**'],
                    dest: '<%= config.prodImages %>'
                }]
            }
        },
        emberTemplates: {
            all: {
                options: {
                    amd: true,
                    templateBasePath: '<%= config.javascripts %>' + '/',
                    templateName: function(sourceFile) {
                        var templateName = sourceFile;

                        templateName = templateName.replace('/template', '');

                        return templateName;
                    },
                    preprocess: function(source) {
                        return source.replace(/\s+/g, ' ');
                    }
                },
                files: {
                    '<%= config.templatesjs %>': '<%= config.javascripts %>/**/*.handlebars'
                }
            }
        },
        less: {
            options: {
                paths: ['<%= config.components %>'],
                strictImports: true,
                strictUnits: true
            },
            development: {
                files: [{
                    expand: true,
                    cwd: '<%= config.less %>',
                    src: ['**/*.less'],
                    dest: '<%= config.stylesheets %>',
                    ext: '.css'
                }]
            },
            production: {
                files: {
                    '<%= config.stylesheets %>/main.css': '<%= config.less %>/main.less'
                },
                options: {
                    cleancss: true
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
                        'ember-data': '../bower_components/ember-data/ember-data.prod'
                    }
                }
            }
        },
        jshint: {
            options: {
                jshintrc: true
            },
            client: {
                src: ['<%= config.javascripts %>/**/*.js', '!<%= config.templatesjs %>']
            },
            test: {
                src: ['<%= config.test %>/**/*.js']
            },
            server: {
                src: ['*.js', '<%= config.api %>/**/*.js', '<%= config.config %>/**/*.js']
            }
        },
        jscs: {
            client: {
                src: ['<%= config.javascripts %>/**/*.js', '!<%= config.templatesjs %>']
            },
            test: {
                src: ['<%= config.test %>/**/*.js']
            },
            server: {
                src: ['*.js', '<%= config.api %>/**/*.js', '<%= config.config %>/**/*.js']
            }
        },
        jsonlint: {
            dotfiles: {
                src: ['.bowerrc', '.csslintrc', '.jscs.json', '.jshintrc', '<%= config.javascripts %>/.jshintrc', '<%= config.test %>/.jshintrc']
            },
            dependencies: {
                src: ['bower.json', 'package.json']
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
        jsbeautifier: {
            client: {
                src: ['<%= config.javascripts %>/**/*.js', '!<%= config.templatesjs %>']
            },
            test: {
                src: ['<%= config.test %>/**/*.js']
            },
            server: {
                src: ['*.js', '<%= config.api %>/**/*.js', '<%= config.config %>/**/*.js']
            },
            dotfiles: {
                src: ['.bowerrc', '.csslintrc', '.jscs.json', '.jshintrc', '<%= config.javascripts %>/.jshintrc', '<%= config.test %>/.jshintrc']
            },
            dependencies: {
                src: ['bower.json', 'package.json']
            },
            handlebars: {
                src: ['<%= config.javascripts %>/**/*.handlebars']
            },
            less: {
                cwd: ['<%= config.less %>/**/*.less']
            },
            options: {
                config: '.jsbeautifyrc',
                css: {
                    fileTypes: ['.less']
                },
                html: {
                    fileTypes: ['.handlebars']
                }
            }
        },
        open: {
            development: {
                path: 'http://localhost:1337'
            },
            production: {
                path: 'http://localhost:8001'
            }
        },
        nodemon: {
            server: {
                options: {
                    watch: ['<%= config.api %>', '<%= config.config %>'],
                    nodeArgs: ['--debug'],
                    delayTime: 0.1
                },
                script: 'app.js',
            }
        },
        'node-inspector': {
            development: {}
        },
        watch: {
            emberTemplates: {
                files: ['<%= config.javascripts %>/**/*.handlebars'],
                tasks: ['emberTemplates:all']
            },
            less: {
                files: ['<%= config.less %>/**/*.less'],
                tasks: ['less:development']
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
                tasks: ['nodemon:server', 'node-inspector:development', 'watch', 'open:development'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.registerTask('default', ['clean:tmpPublic', 'emberTemplates:all', 'less:development', 'copy:development', 'copy:bootstrapFonts']);
    //TODO: Improve integration of unit tests!!
    grunt.registerTask('test', ['jshint', 'jscs', 'jsonlint', 'emberTemplates:all', 'requirejs:all', 'less:development', 'csslint:all']);
    grunt.registerTask('prod', [
        'clean:tmpPublic', 'emberTemplates:all', 'requirejs:all', 'less:production', 'copy:production', 'copy:bootstrapFonts', 'open:production'
    ]);

    grunt.registerTask('dev', ['concurrent:development']);

    grunt.registerTask('cleanup', ['clean:tmpPublic', 'clean:cleanup']);
};
