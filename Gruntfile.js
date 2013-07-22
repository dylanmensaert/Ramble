"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        pkg : grunt.file.readJSON("package.json"),
        jslint : {
            //TODO: Split into 2 tasks for both browser-code and node-code. See: https://npmjs.org/package/grunt-jslint
            files : ["*.js", "*.json", ".bowerrc", "public/javascripts/**/*.js", "public/javascripts/**/*.json", "test/**/*.js"],
            directives : {
                browser : true,
                node : true,
                todo : true,
                nomen : true,
                predef : ["module", "require", "define", "describe", "it", "runs", "expect", "waitsFor"]
            },
            options : {
                log : "log/jslint.log",
                checkstyle : "log/checkstyle_jslint.xml"
            }
        },
        csslint : {
            all : {
                src : ["public/stylesheets/**/*.css", "!public/stylesheets/override.css"],
                options : {
                    "import" : false,
                    formatters : [
                        {
                            id : "text",
                            dest : "log/csslint.log"
                        },
                        {
                            id : "checkstyle-xml",
                            dest : "log/checkstyle_csslint.xml"
                        }
                    ]
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
                    specs : "test/**/*.js",
                    template : require("grunt-template-jasmine-requirejs"),
                    templateOptions : {
                        requireConfig : {
                            baseUrl : "public/javascripts"
                        }
                    }
                }
            }
        },
        clean : {
            dist : {
                src : ["dist/"]
            },
            log : {
                src : ["log/"]
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
                        cwd : "public/images/",
                        src : ["**"],
                        dest : "dist/images/"
                    },
                    {
                        expand : true,
                        cwd : "public/bower_components/components-bootstrap/img/",
                        src : ["**"],
                        dest : "dist/images/"
                    }
                ]
            },
            test : {
                files : [
                    {
                        expand : true,
                        cwd : "public/javascripts",
                        src : ["main.js"],
                        dest : "./"
                    }
                ]
            }
        },
        requirejs : {
            all : {
                options : {
                    name : "main",
                    mainConfigFile : "public/javascripts/main.js",
                    include : ["../bower_components/requirejs/require.js"],
                    out : "dist/javascripts/main.min.js"
                }
            }
        },
        cssmin : {
            all : {
                files : {
                    "dist/stylesheets/main.min.css" : ["public/stylesheets/main.css", "public/stylesheets/override.css"]
                }
            }
        },
        emberTemplates : {
            compile : {
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
                    "public/templates.js" : "public/javascripts/**/*.handlebars"
                }
            }
        },
        connect : {
            test : {
                options : {
                    port : 8002
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-jslint");
    grunt.loadNpmTasks("grunt-contrib-csslint");
    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-ember-templates");
    grunt.loadNpmTasks("grunt-contrib-connect");

    grunt.registerTask("default", ["test", "build"]);
    grunt.registerTask("test", ["clean:log", "jslint", "csslint:all", "connect:test", "copy:test", "jasmine:all", "clean:test"]);
    grunt.registerTask("build", ["clean:dist", "copy:dist", "requirejs:all", "cssmin:all"]);
    //TODO: Clean bower_components and node_modules too!
    grunt.registerTask("cleanup", ["clean:log", "clean:dist"]);
};
