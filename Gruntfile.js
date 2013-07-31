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
        scripts : "/javascripts",
        styles : "/stylesheets",
        images : "/images",
        sass : "/sass"
    };

    config.appScripts = config.app + config.scripts;
    config.appStyles = config.app + config.styles;
    config.appImages = config.app + config.images;
    config.appSass = config.app + config.sass;
    config.distScripts = config.dist + config.scripts;
    config.distStyles = config.dist + config.styles;
    config.distImages = config.dist + config.images;

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
            all : {
                options : {
                    sassDir : "<%= yeoman.appSass %>",
                    cssDir : "<%= yeoman.appStyles %>",
                    imagesDir : "<%= yeoman.appImages %>",
                    javascriptsDir : "<%= yeoman.appScripts %>",
                    fontsDir : "<%= yeoman.appScripts %>/fonts",
                    importPath : "<%= yeoman.app %>/bower_components"
                    //outputStyle : "expanded"
                }
            }
        },
        jshint : {
            //TODO: Update when possible to merge .jshintrc-files. See: https://github.com/gruntjs/grunt-contrib-jshint/pull/24
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
                src : ["<%= yeoman.appStyles %>/**/*.css", "!<%= yeoman.appStyles %>/override.css"],
                options : {
                    import : false
                }
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
                    },
                    {
                        expand : true,
                        cwd : "public/bower_components/sass-bootstrap/img/",
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

    grunt.registerTask("default", ["compile", "lint", "test", "build"]);
    grunt.registerTask("compile", ["emberTemplates:all", "compass:all"]);
    grunt.registerTask("lint", ["jshint"]);
    grunt.registerTask("test", ["connect:test", "copy:test", "jasmine:all", "clean:test"]);
    grunt.registerTask("build", ["clean:dist", "copy:dist", "requirejs:all", "cssmin:all"]);
    //TODO: Clean bower_components and node_modules too!
    grunt.registerTask("cleanup", ["clean:dist"]);
};
