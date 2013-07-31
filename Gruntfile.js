/* jshint maxstatements: false */
"use strict";

module.exports = function (grunt) {
    require("matchdep").filterDev("grunt-*").forEach(function (name) {
        if (!/template-/.test(name)) {
            grunt.loadNpmTasks(name);
        }
    });

    var config = {
        public : "public",
        dist : "dist",
        test : "test",
        routes : "routes",
        javascripts : "javascripts",
        sass : "sass",
        stylesheets : "stylesheets",
        images : "images",
        components : "bower_components",
        templatesjs : "templates.js",
        init : function () {
            this.publicJavascripts = this.public + "/" + this.javascripts;
            this.publicSass = this.public + "/" + this.sass;
            this.publicStylesheets = this.public + "/" + this.stylesheets;
            this.publicImages = this.public + "/" + this.images;

            this.distJavascripts = this.dist + "/" + this.javascripts;
            this.distStylesheets = this.dist + "/" + this.stylesheets;
            this.distImages = this.dist + "/" + this.images;

            this.publicComponents = this.public + "/" + this.components;
            this.publicTemplatesjs = this.public + "/" + this.templatesjs;

            delete this.init;

            return this;
        }
    }.init();

    grunt.initConfig({
        config : config,
        //TODO: Update grunt-ember-templates to latest version.
        //once ember supports the latest version of Handlebars, see: https://github.com/dgeb/grunt-ember-templates/issues/37.
        emberTemplates : {
            all : {
                options : {
                    templateName : function (sourceFile) {
                        var templateName = sourceFile;

                        templateName = templateName.replace(config.publicJavascripts + "/", "");
                        templateName = templateName.replace("/template", "");
                        templateName = templateName.replace("/root", "");

                        return templateName;
                    }
                },
                files : {
                    "<%= config.publicTemplatesjs %>" : "<%= config.publicJavascripts %>/**/*.handlebars"
                }
            }
        },
        compass : {
            options : {
                importPath : "<%= config.publicComponents %>",
                basePath : "<%= config.public %>",
                sassDir : "<%= config.sass %>",
                cssDir : "<%= config.stylesheets %>",
                imagesDir : "<%= config.images %>",
                javascriptsDir : "<%= config.javascripts %>"
            },
            development : {
                options : {
                    specify : ["<%= config.publicSass %>/**/*.scss"]
                }
            },
            production : {
                options : {
                    specify : ["<%= config.publicSass %>/main.scss"],
                    cssPath : "<%= config.distStylesheets %>",
                    environment : "production"
                }
            }
        },
        jshint : {
            client : {
                src : ["<%= config.publicJavascripts %>/**/*.js", "<%= config.publicJavascripts %>/.jshintrc"],
                options : {
                    jshintrc : "<%= config.publicJavascripts %>/.jshintrc"
                }
            },
            test : {
                src : ["<%= config.test %>/**/*.js", "<%= config.test %>/.jshintrc"],
                options : {
                    jshintrc : "<%= config.test %>/.jshintrc"
                }
            },
            server : {
                src : ["*.{js,json}", ".jshintrc", ".bowerrc", "<%= config.routes %>/**/*.js"],
                options : {
                    jshintrc : ".jshintrc"
                }
            }
        },
        csslint : {
            all : {
                src : ["<%= config.publicStylesheets %>/**/*.css", "!<%= config.publicStylesheets %>/main.css"]
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
                    specs : "<%= config.test %>/**/*.js",
                    template : require("grunt-template-jasmine-requirejs"),
                    templateOptions : {
                        requireConfig : {
                            baseUrl : "<%= config.publicJavascripts %>"
                        }
                    }
                }
            }
        },
        clean : {
            dist : {
                src : ["<%= config.dist %>"]
            },
            cleanup : {
                src : [
                    "node_modules",
                    "<%= config.publicComponents %>",
                    "<%= config.public %>/.sass-cache",
                    "<%= config.publicStylesheets %>",
                    "<%= config.publicTemplatesjs %>"
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
                        cwd : "<%= config.publicImages %>",
                        src : ["**"],
                        dest : "<%= config.distImages %>"
                    }
                ]
            },
            test : {
                files : [
                    {
                        expand : true,
                        cwd : "<%= config.publicJavascripts %>",
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
                    mainConfigFile : "<%= config.publicJavascripts %>/main.js",
                    include : ["../bower_components/requirejs/require.js"],
                    out : "<%= config.distJavascripts %>/main.js"
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
                files : ["<%= config.publicJavascripts %>/**/*.handlebars"],
                tasks : ["compile"]
            },
            all : {
                files : ["<%= config.publicStylesheets %>/**/*.*"],
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
