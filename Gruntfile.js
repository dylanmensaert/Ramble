'use strict';

module.exports = function(grunt) {
    var config,
        sources;

    config = {
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
        bootstrapFonts: 'assets/bower_components/bootstrap/dist/fonts'
    };

    sources = {
        client: ['<%= config.javascripts %>/**/*.js', '!<%= sources.templatesjs %>'],
        test: ['<%= config.test %>/**/*.js'],
        server: ['*.js', '<%= config.api %>/**/*.js', '<%= config.config %>/**/*.js'],
        dotfiles: [
            '.bowerrc', '.csscomb.json', '.csslintrc', '.jsbeautifyrc', '.jscs.json',
            '.jshintrc', '<%= config.javascripts %>/.jshintrc', '<%= config.test %>/.jshintrc'
        ],
        dependencies: ['bower.json', 'package.json'],
        templatesjs: 'assets/javascripts/init/templates.js',
        handlebars: '<%= config.javascripts %>/**/*.handlebars',
        css: '<%= config.stylesheets %>/**/*.css',
        less: '<%= config.less %>/**/*.less',
        mainCss: '<%= config.stylesheets %>/main.css',
        mainLess: '<%= config.less %>/main.less'
    };

    sources.javascripts = sources.client.concat(sources.test).concat(sources.server);
    sources.json = sources.dotfiles.concat(sources.dependencies);
    sources.javascriptsAndJson = sources.javascripts.concat(sources.json);

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        config: config,
        sources: sources,
        clean: {
            tmpPublic: {
                src: ['<%= config.tmpPublic %>']
            },
            cleanup: {
                src: [
                    '<%= sources.templatesjs %>',
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
                    templateBasePath: '<%= config.javascripts %>/',
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
                    '<%= sources.templatesjs %>': '<%= sources.handlebars %>'
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
                    '<%= sources.mainCss %>': '<%= sources.mainLess %>'
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
            all: {
                src: '<%= sources.javascripts %>'
            }
        },
        jscs: {
            all: {
                src: '<%= sources.javascripts %>'
            }
        },
        jsonlint: {
            all: {
                src: '<%= sources.json %>'
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            all: {
                src: ['<%= sources.css %>', '!<%= sources.mainCss %>']
            }
        },
        jsbeautifier: {
            options: {
                config: '.jsbeautifyrc'
            },
            all: {
                src: '<%= sources.javascriptsAndJson %>'
            }
        },
        csscomb: {
            options: {
                config: '.csscomb.json'
            },
            all: {
                files: [{
                    expand: true,
                    cwd: '<%= config.less %>',
                    src: ['**/*.less'],
                    dest: '<%= config.less %>',
                }]
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
                files: ['<%= sources.handlebars %>'],
                tasks: ['emberTemplates:all']
            },
            less: {
                files: ['<%= sources.less %>'],
                tasks: ['less:development']
            },
            // tidy: {
            //     //TODO: watch to reformat
            //     //'csscomb:all'
            // },
            livereload: {
                files: [
                    //TODO: avoid duplication
                    '<%= config.assets %>/*.*',
                    '<%= config.api %>/**/*.js',
                    '<%= config.config %>/**/*.js',
                    '<%= config.views %>/**/*',
                    '<%= config.javascripts %>/**/*.js',
                    '<%= sources.mainCss %>',
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
    grunt.registerTask('prod', [
        'clean:tmpPublic', 'emberTemplates:all', 'requirejs:all', 'less:production', 'copy:production', 'copy:bootstrapFonts', 'open:production'
    ]);

    grunt.registerTask('dev', ['concurrent:development']);

    //TODO: Improve integration of unit tests!!
    grunt.registerTask('test', ['jshint', 'jscs', 'jsonlint', 'emberTemplates:all', 'requirejs:all', 'less:development', 'csslint:all']);
    grunt.registerTask('tidy', ['jsbeautifier', 'csscomb:all']);

    grunt.registerTask('cleanup', ['clean:tmpPublic', 'clean:cleanup']);
};
