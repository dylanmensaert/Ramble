/* jshint maxstatements: false */
"use strict";

module.exports = function (grunt) {
    require("matchdep").filterDev("grunt-*").forEach(function (name) {
        if (!/template-/.test(name)) {
            grunt.loadNpmTasks(name);
        }
    });

    //TODO: Reuse path-strings to avoid duplication.
    var config = {
        app : "public",
        dist : "dist",
        test : "test",
        routes : "routes",
        scripts : "javascripts",
        styles : "stylesheets",
        images : "images",
        components : "bower_components",
        sass : "sass"
    };

    config.appScripts = config.app + "/" + config.scripts;
    config.appStyles = config.app + "/" + config.styles;
    config.appImages = config.app + "/" + config.images;
    config.appComponents = config.app + "/" + config.components;
    config.appSass = config.app + "/" + config.sass;
    config.distScripts = config.dist + "/" + config.scripts;
    config.distStyles = config.dist + "/" + config.styles;
    config.distImages = config.dist + "/" + config.images;

    grunt.initConfig({
        yeoman : config,
        //TODO: Update grunt-ember-templates to latest version.
        //once ember supports the latest version of Handlebars, see: https://github.com/dgeb/grunt-ember-templates/issues/37.
        emberTemplates : {
            all : {
                options : {
                    templateName : function (sourceFile) {
                        var templateName = sourceFile;

                        templateName = templateName.replace(config.appScripts + "/", "");
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
        compass : {
            options : {
                importPath : "<%= yeoman.appComponents %>",
                basePath : "<%= yeoman.app %>",
                sassDir : "<%= yeoman.sass %>",
                cssDir : "<%= yeoman.styles %>",
                imagesDir : "<%= yeoman.images %>",
                javascriptsDir : "<%= yeoman.scripts %>",
                fontsDir : "fonts"
            },
            development : {
                options : {
                    specify : ["<%= yeoman.appSass %>/**/*.scss"]
                }
            },
            dist : {
                options : {
                    specify : ["<%= yeoman.appSass %>/main.scss"],
                    cssPath : "<%= yeoman.distStyles %>",
                    environment : "production"
                }
            }
        },
        jshint : {
            client : {
                files : {
                    src : ["<%= yeoman.appScripts %>/**/*.js", "<%= yeoman.appScripts %>/.jshintrc"]
                },
                options : {
                    jshintrc : "<%= yeoman.appScripts %>/.jshintrc"
                }
            },
            test : {
                files : {
                    src : ["<%= yeoman.test %>/**/*.js", "<%= yeoman.test %>/.jshintrc"]
                },
                options : {
                    jshintrc : "<%= yeoman.test %>/.jshintrc"
                }
            },
            server : {
                files : {
                    src : ["*.{js,json}", ".jshintrc", ".bowerrc", "<%= yeoman.routes %>/**/*.js"]
                },
                options : {
                    jshintrc : ".jshintrc"
                }
            }
        },
        csslint : {
            all : {
                src : ["<%= yeoman.appStyles %>/**/*.css", "!<%= yeoman.appStyles %>/main.css"]
            }
        },
        //TODO: Improve integration of unit tests!!
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
        requirejs : {
            all : {
                options : {
                    name : "main",
                    mainConfigFile : "<%= yeoman.appScripts %>/main.js",
                    include : ["../bower_components/requirejs/require.js"],
                    out : "<%= yeoman.distScripts %>/main.js"
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
        //TODO: Update watch-task appropriately!
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

    grunt.registerTask("default", ["compile", "lint", "test", "build"]);
    grunt.registerTask("compile", ["emberTemplates:all", "compass:development"]);
    grunt.registerTask("lint", ["jshint", "csslint:all"]);
    grunt.registerTask("test", ["connect:test", "copy:test", "jasmine:all", "clean:test"]);
    grunt.registerTask("build", ["clean:dist", "copy:dist", "requirejs:all", "compass:production"]);
    //TODO: Clean bower_components and node_modules too!
    grunt.registerTask("cleanup", ["clean:dist"]);
};
