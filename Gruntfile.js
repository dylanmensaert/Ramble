"use strict";

module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);

    var config = {
        //public-folders
        javascripts: "public/javascripts",
        sass: "public/sass",
        stylesheets: "public/stylesheets",
        images: "public/images",
        fonts: "public/fonts",
        //dist-folders
        dist: "dist",
        distJavascripts: "dist/javascripts",
        distStylesheets: "dist/stylesheets",
        distImages: "dist/images",
        distFonts: "dist/fonts",
        //other
        test: "test",
        routes: "routes",
        components: "public/bower_components",
        templatesjs: "public/templates.js"
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
                    cssDir: "<%= config.distStylesheets %>",
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
        //TODO: Improve integration of unit tests!!
        //jasmine : {
        //    all : {
        //        src : ["main.js"],
        //        options : {
        //            host : "http://localhost:8002",
        //            specs : "<%= config.test %>/**/*.js",
        //            template : require("grunt-template-jasmine-requirejs"),
        //            templateOptions : {
        //                requireConfig : {
        //                    baseUrl : "<%= config.javascripts %>"
        //                }
        //            }
        //        }
        //    }
        //},
        clean: {
            dist: {
                src: ["<%= config.dist %>"]
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
            //test : {
            //    src : ["main.js"]
            //}
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= config.images %>",
                        src: ["**"],
                        dest: "<%= config.distImages %>"
                    },
                    {
                        expand: true,
                        cwd: "<%= config.fonts %>",
                        src: ["**"],
                        dest: "<%= config.distFonts %>"
                    }
                ]
            }
            //test : {
            //    files : [
            //        {
            //            expand : true,
            //            cwd : "<%= config.javascripts %>",
            //            src : ["main.js"],
            //            dest : "./"
            //        }
            //    ]
            //}
        },
        requirejs: {
            all: {
                options: {
                    baseUrl: "<%= config.javascripts %>",
                    name: "../bower_components/almond/almond",
                    include: ["main"],
                    mainConfigFile: "<%= config.javascripts %>/main.js",
                    out: "<%= config.distJavascripts %>/main.js",
                    paths: {
                        ember: "../bower_components/ember/ember.prod",
                        "ember-data": "../bower_components/ember-data-shim/ember-data.prod"
                    }
                }
            }
        },
        //connect : {
        //    test : {
        //        options : {
        //            port : 8002
        //        }
        //    }
        //},
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
                    "<%= config.javascripts %>/**/*.js",
                    "<%= config.templatesjs %>",
                    "<%= config.stylesheets %>/main.css",
                    "<%= config.images %>/**/*.*"
                ],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.registerTask("default", ["compile", "lint", "test", "build"]);
    grunt.registerTask("compile", ["emberTemplates:all", "compass:development"]);
    grunt.registerTask("lint", ["jshint", "csslint:all"]);
    grunt.registerTask("test", [/*"connect:test", "copy:test", "jasmine:all", "clean:test"*/]);
    grunt.registerTask("build", ["clean:dist", "copy:dist", "requirejs:all", "compass:production"]);
    grunt.registerTask("cleanup", ["clean:dist", "clean:cleanup"]);
};
