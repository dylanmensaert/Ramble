'use strict';

module.exports = function(grunt) {
    var paths,
        sources;

    paths = {
        // server
        api: 'api',
        config: 'config',
        views: 'views',
        tmpPublic: '.tmp/public',
        // assets
        assets: 'assets',
        javascripts: 'assets/javascripts',
        less: 'assets/less',
        stylesheets: '.tmp/public/stylesheets',
        images: 'assets/images',
        // prod
        prodJavascripts: '.tmp/public/javascripts',
        prodImages: '.tmp/public/images',
        prodFonts: '.tmp/public/fonts',
        // other
        test: 'test',
        components: 'assets/bower_components',
        bootstrapFonts: 'assets/bower_components/bootstrap/dist/fonts'
    };

    sources = {
        client: ['<%= paths.javascripts %>/**/*.js', '!<%= sources.templatesjs %>'],
        test: ['<%= paths.test %>/**/*.js'],
        server: ['*.js', '<%= paths.api %>/**/*.js', '<%= paths.config %>/**/*.js'],
        rcfiles: ['.bowerrc', '.csslintrc', '.jsbeautifyrc', '.jscsrc', '.jshintrc'],
        configJson: ['.csscomb.json', '<%= paths.javascripts %>/.jshintrc', '<%= paths.test %>/.jshintrc'],
        dependencies: ['bower.json', 'package.json'],
        templatesjs: '<%= paths.javascripts %>/init/templates.js',
        handlebars: '<%= paths.javascripts %>/**/*.handlebars',
        css: '<%= paths.stylesheets %>/**/*.css',
        less: '<%= paths.less %>/**/*.less',
        mainCss: '<%= paths.stylesheets %>/main.css',
        mainLess: '<%= paths.less %>/main.less',
        views: '<%= paths.views %>/**/*',
        assets: '<%= paths.assets %>/*.*',
        images: '<%= paths.images %>/**/*.*'
    };

    sources.javascripts = sources.client.concat(sources.test).concat(sources.server);
    sources.json = sources.rcfiles.concat(sources.configJson).concat(sources.dependencies);
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
                src: ['<%= sources.templatesjs %>', 'node_modules', '<%= paths.components %>']
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
                config: '.jsbeautifyrc',
                js: {
                    fileTypes: '<%= sources.rcfiles %>'
                }
            },
            all: {
                src: '<%= sources.javascriptsAndJson %>'
            }
        },
        csscomb: {
            all: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.less %>',
                    src: ['**/*.less'],
                    dest: '<%= paths.less %>'
                }]
            }
        },
        open: {
            development: {
                path: 'http://localhost:1337'
                // TODO: Open when sails server started. (options:openOn)
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
                script: 'app.js'
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
            jsbeautifier: {
                files: ['<%= sources.javascriptsAndJson %>'],
                tasks: ['jsbeautifier:all']
            },
            csscomb: {
                files: ['<%= sources.less %>'],
                tasks: ['csscomb:all']
            },
            livereload: {
                files: ['<%= sources.client %>', '<%= sources.server %>', '<%= sources.handlebars %>', '<%= sources.mainCss %>', '<%= sources.views %>',
                    '<%= sources.assets %>', '<%= sources.images %>'
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
    grunt.registerTask('prod', ['clean:tmpPublic', 'emberTemplates:all', 'requirejs:all', 'less:production', 'copy:production', 'copy:bootstrapFonts',
        'open:production'
    ]);

    grunt.registerTask('dev', ['concurrent:development']);

    // TODO: Improve integration of unit tests!!
    grunt.registerTask('test', ['jshint:all', 'jscs:all', 'jsonlint:all', 'emberTemplates:all', 'requirejs:all', 'less:development', 'csslint:all']);
    grunt.registerTask('tidy', ['jsbeautifier:all', 'csscomb:all']);

    grunt.registerTask('cleanup', ['clean:tmpPublic', 'clean:cleanup']);
};
