'use strict';

module.exports = function(grunt) {
    var paths,
        sources;

    paths = {
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
        client: ['<%= paths.javascripts %>/**/*.js', '!<%= sources.templatesjs %>'],
        test: ['<%= paths.test %>/**/*.js'],
        server: ['*.js', '<%= paths.api %>/**/*.js', '<%= paths.config %>/**/*.js'],
        dotfiles: [
            '.bowerrc', '.csscomb.json', '.csslintrc', '.jsbeautifyrc', '.jscs.json',
            '.jshintrc', '<%= paths.javascripts %>/.jshintrc', '<%= paths.test %>/.jshintrc'
        ],
        dependencies: ['bower.json', 'package.json'],
        templatesjs: 'assets/javascripts/init/templates.js',
        handlebars: '<%= paths.javascripts %>/**/*.handlebars',
        css: '<%= paths.stylesheets %>/**/*.css',
        less: '<%= paths.less %>/**/*.less',
        mainCss: '<%= paths.stylesheets %>/main.css',
        mainLess: '<%= paths.less %>/main.less'
    };

    sources.javascripts = sources.client.concat(sources.test).concat(sources.server);
    sources.json = sources.dotfiles.concat(sources.dependencies);
    sources.javascriptsAndJson = sources.javascripts.concat(sources.json);

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        paths: paths,
        sources: sources,
        clean: {
            tmpPublic: {
                src: ['<%= paths.tmpPublic %>']
            },
            cleanup: {
                src: [
                    '<%= sources.templatesjs %>',
                    'node_modules',
                    '<%= paths.components %>'
                ]
            }
        },
        copy: {
            bootstrapFonts: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.bootstrapFonts %>',
                    src: ['**'],
                    dest: '<%= paths.prodFonts %>'
                }]
            },
            development: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.assets %>',
                    src: ['**'],
                    dest: '<%= paths.tmpPublic %>'
                }]
            },
            production: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.images %>',
                    src: ['**'],
                    dest: '<%= paths.prodImages %>'
                }]
            }
        },
        emberTemplates: {
            all: {
                options: {
                    amd: true,
                    templateBasePath: '<%= paths.javascripts %>/',
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
                paths: ['<%= paths.components %>'],
                strictImports: true,
                strictUnits: true
            },
            development: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.less %>',
                    src: ['**/*.less'],
                    dest: '<%= paths.stylesheets %>',
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
                    baseUrl: '<%= paths.javascripts %>',
                    name: '../bower_components/almond/almond',
                    include: ['main'],
                    mainConfigFile: '<%= paths.javascripts %>/main.js',
                    out: '<%= paths.prodJavascripts %>/main.js',
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
                    cwd: '<%= paths.less %>',
                    src: ['**/*.less'],
                    dest: '<%= paths.less %>',
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
                    watch: ['<%= paths.api %>', '<%= paths.config %>'],
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
                    '<%= paths.assets %>/*.*',
                    '<%= paths.api %>/**/*.js',
                    '<%= paths.config %>/**/*.js',
                    '<%= paths.views %>/**/*',
                    '<%= paths.javascripts %>/**/*.js',
                    '<%= sources.mainCss %>',
                    '<%= paths.images %>/**/*.*'
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
