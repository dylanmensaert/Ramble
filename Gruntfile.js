"use strict";

module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);

    var config = {
        //server
        app: "app.js",
        server: "server",
        tmpPublic: ".tmp/public",
        //assets-folders
        assets: "assets",
        javascripts: "assets/javascripts",
        sass: "assets/sass",
        stylesheets: "assets/stylesheets",
        images: "assets/images",
        fonts: "assets/fonts",
        //prod-folders
        prodJavascripts: ".tmp/public/javascripts",
        prodStylesheets: ".tmp/public/stylesheets",
        prodImages: ".tmp/public/images",
        prodFonts: ".tmp/public/fonts",
        //other
        test: "test",
        routes: "routes",
        components: "assets/bower_components",
        templatesjs: "assets/javascripts/init/templates.js"
    };

    grunt.initConfig({
        config: config,
        emberTemplates: {
            all: {
                options: {
                    amd: true,
                    templateBasePath: "<%= config.javascripts %>" + "/",
                    templateName: function (sourceFile) {
                        var templateName = sourceFile;

                        templateName = templateName.replace("/template", "");
                        templateName = templateName.replace("/root", "");

                        return templateName;
                    }
                },
                files: {
                    "<%= config.templatesjs %>": "<%= config.javascripts %>/**/*.handlebars"
                }
            }
        },
        compass: {
            options: {
                importPath: "<%= config.components %>",
                sassDir: "<%= config.sass %>",
                cssDir: "<%= config.stylesheets %>",
                imagesDir: "<%= config.images %>",
                javascriptsDir: "<%= config.javascripts %>"
            },
            development: {
                options: {
                    specify: ["<%= config.sass %>/**/*.scss"]
                }
            },
            production: {
                options: {
                    specify: ["<%= config.sass %>/main.scss"],
                    cssDir: "<%= config.prodStylesheets %>",
                    environment: "production"
                }
            }
        },
        jshint: {
            client: {
                src: ["<%= config.javascripts %>/**/*.js", "<%= config.javascripts %>/.jshintrc"],
                options: {
                    jshintrc: "<%= config.javascripts %>/.jshintrc"
                }
            },
            test: {
                src: ["<%= config.test %>/**/*.js", "<%= config.test %>/.jshintrc"],
                options: {
                    jshintrc: "<%= config.test %>/.jshintrc"
                }
            },
            server: {
                src: ["*.{js,json}", ".jshintrc", ".bowerrc", "<%= config.routes %>/**/*.js"],
                options: {
                    jshintrc: ".jshintrc"
                }
            }
        },
        csslint: {
            all: {
                src: ["<%= config.stylesheets %>/**/*.css", "!<%= config.stylesheets %>/main.css"]
            }
        },
        clean: {
            tmpPublic: {
                src: ["<%= config.tmpPublic %>"]
            },
            cleanup: {
                src: [
                    "node_modules",
                    "<%= config.components %>",
                    "<%= config.templatesjs %>",
                    "<%= config.stylesheets %>",
                    ".sass-cache"
                ]
            }
        },
        copy: {
            development: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= config.assets %>",
                        src: ["**"],
                        dest: "<%= config.tmpPublic %>"
                    }
                ]
            },
            production: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= config.images %>",
                        src: ["**"],
                        dest: "<%= config.prodImages %>"
                    },
                    {
                        expand: true,
                        cwd: "<%= config.fonts %>",
                        src: ["**"],
                        dest: "<%= config.prodFonts %>"
                    }
                ]
            }
        },
        requirejs: {
            all: {
                options: {
                    baseUrl: "<%= config.javascripts %>",
                    name: "../bower_components/almond/almond",
                    include: ["main"],
                    mainConfigFile: "<%= config.javascripts %>/main.js",
                    out: "<%= config.prodJavascripts %>/main.js",
                    paths: {
                        ember: "../bower_components/ember/ember.prod",
                        "ember-data": "../bower_components/ember-data-shim/ember-data.prod"
                    }
                }
            }
        },
        nodemon: {
            server: {
                options: {
                    watchedFolders: ["<%= config.app %>", "<%= config.server %>"],
                    delayTime: 0.1
                }
            }
        },
        watch: {
            emberTemplates: {
                files: ["<%= config.javascripts %>/**/*.handlebars"],
                tasks: ["emberTemplates:all"]
            },
            compass: {
                files: ["<%= config.sass %>/**/*.scss"],
                tasks: ["compass:development"]
            },
            livereload: {
                files: [
                    "<%= config.app %>",
                    "<%= config.server %>/**/*.js",
                    "<%= config.javascripts %>/**/*.js",
                    "<%= config.templatesjs %>",
                    "<%= config.stylesheets %>/main.css",
                    "<%= config.images %>/**/*.*"
                ],
                tasks: ["copy:development"],
                options: {
                    livereload: true
                }
            }
        },
        concurrent: {
            development: {
                tasks: ["nodemon:server", "watch"],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.registerTask("default", ["clean:tmpPublic", "copy:development", "emberTemplates:all", "compass:development"]);
    //TODO: Improve integration of unit tests!!
    grunt.registerTask("test", ["jshint", "csslint:all", ""]);
    grunt.registerTask("prod", ["clean:tmpPublic", "copy:production", "emberTemplates:all", "requirejs:all", "compass:production"]);

    grunt.registerTask("develop", ["default", "concurrent:development"]);

    grunt.registerTask("cleanup", ["clean:tmpPublic", "clean:cleanup"]);
};
