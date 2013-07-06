(function () {
    "use strict";

    module.exports = function (grunt) {
        grunt.initConfig({
            pkg : grunt.file.readJSON("package.json"),
            jslint : {
                files : ["*.js", "*.json", "app/**/*.js", "tests/**/*.js"],
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
                        specs : "tests/**/*.js",
                        template : require("grunt-template-jasmine-requirejs")
                    }
                }
            },
            clean : {
                dist : {
                    src : ["dist/"]
                },
                log : {
                    src : ["log/"]
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
                            cwd : "img/",
                            src : ["**"],
                            dest : "dist/img/"
                        },
                        {
                            expand : true,
                            src : ["data.json", "config.json"],
                            dest : "dist/"
                        },
                        //TODO: Provide more robust way to copy images from libraries/CSS
                        {
                            expand : true,
                            src : ["bower_components/components-bootstrap/img/*"],
                            dest : "dist/"
                        },
                        {
                            expand : true,
                            src : ["bower_components/jquery-ui/themes/ui-lightness/images/*"],
                            dest : "dist/"
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
                        out : "dist/Ramble.min.js"
                    }
                }
            },
            cssmin : {
                all : {
                    files : {
                        "dist/Ramble.min.css" : ["main.css"]
                    }
                }
            },
            connect : {
                start : {
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

        grunt.registerTask("default", ["clean:log", "jslint", "csslint:all", "connect:test", "jasmine:all", "clean:dist", "copy:dist", "requirejs:all", "cssmin:all"]);
        grunt.registerTask("test", ["clean:log", "jslint", "csslint:all", "jasmine:all"]);
        grunt.registerTask("build", ["clean:dist", "copy:dist", "requirejs:all", "cssmin:all"]);
        grunt.registerTask("cleanup", ["clean:log", "clean:dist"]);
        grunt.registerTask("start", ["connect:start"]);
    };
}());
