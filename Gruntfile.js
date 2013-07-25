"use strict";

module.exports = function (grunt) {
    //TODO: Reuse path-strings to avoid duplication.
    var config = {
        app : "public",
        dist : "dist",
        test : "test",
        scripts : "/javascripts",
        styles : "/stylesheets",
        images : "/images"
    };

    config.appScripts = config.app + config.scripts;
    config.appStyles = config.app + config.styles;
    config.appImages = config.app + config.images;
    config.distScripts = config.dist + config.scripts;
    config.distStyles = config.dist + config.styles;
    config.distImages = config.dist + config.images;

    grunt.initConfig({
        yeoman : config,
        pkg : grunt.file.readJSON("package.json"),
        jslint : {
            //TODO: Split into 2 tasks for both browser-code and node-code. See: https://npmjs.org/package/grunt-jslint
            files : ["*.{js,json}", ".bowerrc", "<%= yeoman.appScripts %>/**/*.{js,json}", "<%= yeoman.test %>/**/*.js"],
            directives : {
                browser : true,
                node : true,
                todo : true,
                nomen : true,
                predef : ["module", "require", "define", "describe", "it", "runs", "expect", "waitsFor"]
            }
        },
        csslint : {
            all : {
                src : ["<%= yeoman.appStyles %>/**/*.css", "!<%= yeoman.appStyles %>/override.css"],
                options : {
                    "import" : false
                }
            }
        },
        jasmine : {
            all : {
                src : [
                    "main.js"
                ],
                options : {
                    host : "http://localhost:8002",
                    specs : "<%= yeoman.test %>/**/*.js",
                    template : require("grunt-template-jasmine-requirejs"),
                    templateOptions : {
                        requireConfig : {
                            baseUrl : "<%= yeoman.appScripts %>"
                        }
                    }
                }
            }
        },
        clean : {
            dist : {
                src : ["<%= yeoman.dist %>"]
            },
            test : {
                src : ["main.js"]
            }
        },
        copy : {
            dist : {
                files : [
                    {
                        expand : true,
                        cwd : "<%= yeoman.appImages %>",
                        src : ["**"],
                        dest : "<%= yeoman.distImages %>"
                    },
                    {
                        expand : true,
                        cwd : "public/bower_components/components-bootstrap/img/",
                        src : ["**"],
                        dest : "<%= yeoman.distImages %>"
                    }
                ]
            },
            test : {
                files : [
                    {
                        expand : true,
                        cwd : "<%= yeoman.appScripts %>",
                        src : ["main.js"],
                        dest : "./"
                    }
                ]
            }
        },
        //TODO: Update grunt-ember-templates to latest version, once ember supports the latest version of Handlebars
        emberTemplates : {
            all : {
                options : {
                    templateName : function (sourceFile) {
                        var templateName = sourceFile;

                        templateName = templateName.replace("public/javascripts/", "");
                        templateName = templateName.replace("/template", "");
                        templateName = templateName.replace("/root", "");

                        return templateName;
                    }
                },
                files : {
                    "public/templates.js" : "<%= yeoman.appScripts %>/**/*.handlebars"
                }
            }
        },
        requirejs : {
            all : {
                options : {
                    name : "main",
                    mainConfigFile : "<%= yeoman.appScripts %>/main.js",
                    include : ["../bower_components/requirejs/require.js"],
                    out : "<%= yeoman.distScripts %>/main.min.js"
                }
            }
        },
        cssmin : {
            all : {
                files : {
                    "<%= yeoman.distStyles %>/main.min.css" : ["<%= yeoman.appStyles %>/main.css", "<%= yeoman.appStyles %>/override.css"]
                }
            }
        },
        connect : {
            test : {
                options : {
                    port : 8002
                }
            }
        },
        watch : {
            options : {
                livereload : true
            },
            emberTemplates : {
                files : ["<%= yeoman.distScripts %>/**/*.handlebars"],
                tasks : ["compile"]
            },
            all : {
                files : ["<%= yeoman.distScripts %>/**/*.*", "<%= yeoman.appStyles %>/**/*.*"],
                tasks : []
            }
        }
    });

    grunt.loadNpmTasks("grunt-ember-templates");
    grunt.loadNpmTasks("grunt-jslint");
    grunt.loadNpmTasks("grunt-contrib-csslint");
    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("default", ["compile", "lint", "test", "build"]);
    grunt.registerTask("compile", ["emberTemplates:all"]);
    grunt.registerTask("lint", ["jslint", "csslint:all"]);
    grunt.registerTask("test", ["connect:test", "copy:test", "jasmine:all", "clean:test"]);
    grunt.registerTask("build", ["clean:dist", "copy:dist", "requirejs:all", "cssmin:all"]);
    //TODO: Clean bower_components and node_modules too!
    grunt.registerTask("cleanup", ["clean:dist"]);
};
