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
        templatesjs : "templates.js",
        sass : "sass",
        init : function () {
            this.appScripts = this.app + "/" + this.scripts;
            this.appStyles = this.app + "/" + this.styles;
            this.appImages = this.app + "/" + this.images;
            this.appComponents = this.app + "/" + this.components;
            this.appSass = this.app + "/" + this.sass;
            this.appTemplatesjs = this.app + "/" + this.templatesjs;
            this.distScripts = this.dist + "/" + this.scripts;
            this.distStyles = this.dist + "/" + this.styles;
            this.distImages = this.dist + "/" + this.images;

            delete this.init;

            return this;
        }
    }.init();

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
                    "<%= yeoman.appTemplatesjs %>" : "<%= yeoman.appScripts %>/**/*.handlebars"
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
            production : {
                options : {
                    specify : ["<%= yeoman.appSass %>/main.scss"],
                    cssPath : "<%= yeoman.distStyles %>",
                    environment : "production"
                }
            }
        },
        jshint : {
            client : {
                src : ["<%= yeoman.appScripts %>/**/*.js", "<%= yeoman.appScripts %>/.jshintrc"],
                options : {
                    jshintrc : "<%= yeoman.appScripts %>/.jshintrc"
                }
            },
            test : {
                src : ["<%= yeoman.test %>/**/*.js", "<%= yeoman.test %>/.jshintrc"],
                options : {
                    jshintrc : "<%= yeoman.test %>/.jshintrc"
                }
            },
            server : {
                src : ["*.{js,json}", ".jshintrc", ".bowerrc", "<%= yeoman.routes %>/**/*.js"],
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
            cleanup : {
                src : [
                    "node_modules",
                    "<%= yeoman.appComponents %>",
                    "<%= yeoman.app %>/.sass-cache",
                    "<%= yeoman.appStyles %>",
                    "<%= yeoman.appTemplatesjs %>"
                ]
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
    grunt.registerTask("cleanup", ["clean:dist", "clean:cleanup"]);
};
