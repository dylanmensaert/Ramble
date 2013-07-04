(function () {
    "use strict";

    module.exports = function (grunt) {
        grunt.initConfig({
            pkg : grunt.file.readJSON("package.json"),
            jslint : {
                files : ["*.js", "*.json", "src/**/*.js", "spec/**/*.js"],
                directives : {
                    nomen : true,
                    browser : true,
                    todo : true,
                    maxlen : 200,
                    predef : ["require", "define", "describe", "it", "runs", "expect", "waitsFor", "module"]
                },
                options : {
                    failOnError : false,
                    log : "log/jslint.log",
                    checkstyle : "log/checkstyle_jslint.xml"
                }
            },
            csslint : {
                all : {
                    src : ["src/**/*.css"],
                    options : {
                        "import" : true,
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
                        specs : "spec/**/*.js",
                        template : require("grunt-template-jasmine-requirejs")
                    }
                }
            },
            clean : {
                build : {
                    src : ["build/"]
                },
                log : {
                    src : ["log/"]
                }
            },
            copy : {
                build : {
                    files : [
                        {
                            expand : true,
                            cwd : "scaffold/",
                            src : ["**"],
                            dest : "build/"
                        },
                        {
                            expand : true,
                            cwd : "img/",
                            src : ["**"],
                            dest : "build/img/"
                        },
                        {
                            expand : true,
                            src : ["data.json", "config.json"],
                            dest : "build/"
                        },
                        //TODO: Provide more robust way to copy images from libraries/CSS
                        {
                            expand : true,
                            src : ["bower_components/components-bootstrap/img/*"],
                            dest : "build/"
                        },
                        {
                            expand : true,
                            src : ["bower_components/jquery-ui/themes/ui-lightness/images/*"],
                            dest : "build/"
                        }
                    ]
                }
            },
            requirejs : {
                all : {
                    options : {
                        name : "main",
                        mainConfigFile : "main.js",
                        include : ["bower_components/requirejs/require.js"],
                        excludeShallow : ["text!data.json", "text!config.json"],
                        out : "build/Ramble.min.js"
                    }
                }
            },
            cssmin : {
                all : {
                    files : {
                        "build/Ramble.min.css" : ["main.css"]
                    }
                }
            },
            connect : {
                develop : {
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

        grunt.registerTask("default", ["clean:log", "jslint", "csslint:all", "connect:test", "jasmine:all", "clean:build", "copy:build", "requirejs:all", "cssmin:all"]);
        grunt.registerTask("test", ["clean:log", "jslint", "csslint:all", "jasmine:all"]);
        grunt.registerTask("build", ["clean:build", "copy:build", "requirejs:all", "cssmin:all"]);
        grunt.registerTask("cleanup", ["clean:log", "clean:build"]);
        grunt.registerTask("run", ["connect:develop"]);
    };
}());