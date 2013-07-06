(function () {
    "use strict";

    module.exports = function (grunt) {
        grunt.initConfig({
            pkg : grunt.file.readJSON("package.json"),
            jslint : {
                files : ["*.js", "*.json", "app/**/*.js", "app/**/*.json", "test/**/*.js"],
                directives : {
                    nomen : true,
                    browser : true,
                    todo : true,
                    maxlen : 200,
                    predef : ["module", "require", "define", "describe", "it", "runs", "expect", "waitsFor"]
                },
                options : {
                    log : "log/jslint.log",
                    checkstyle : "log/checkstyle_jslint.xml"
                }
            },
            csslint : {
                all : {
                    src : ["app/**/*.css"],
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
                                baseUrl : "app/scripts"
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
                            cwd : "scaffold/",
                            src : ["**"],
                            dest : "dist/"
                        },
                        {
                            expand : true,
                            cwd : "app/images/",
                            src : ["**"],
                            dest : "dist/images/"
                        }
                        //TODO: Fix copying images of Boostrap and jQuery UI for the CSS.
                    ]
                },
                test : {
                    files : [
                        {
                            expand : true,
                            cwd : "app/scripts",
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
                        mainConfigFile : "app/scripts/main.js",
                        include : ["../../bower_components/requirejs/require.js"],
                        out : "dist/scripts/main.min.js"
                    }
                }
            },
            cssmin : {
                all : {
                    files : {
                        "dist/styles/main.min.css" : ["app/styles/main.css"]
                    }
                }
            },
            connect : {
                server : {
                    options : {
                        hostname : "*",
                        port : 8001,
                        keepalive : true
                    }
                },
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
        grunt.loadNpmTasks("grunt-contrib-connect");

        grunt.registerTask("default", ["test", "build"]);
        grunt.registerTask("test", ["clean:log", "jslint", "csslint:all", "connect:test", "copy:test", "jasmine:all", "clean:test"]);
        grunt.registerTask("build", ["clean:dist", "copy:dist", "requirejs:all", "cssmin:all"]);
        grunt.registerTask("cleanup", ["clean:log", "clean:dist"]);
        grunt.registerTask("server", ["connect:server"]);
    };
}());
