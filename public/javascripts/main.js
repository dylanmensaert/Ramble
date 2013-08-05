define(function () {
    "use strict";

    require.config({
        enforceDefine : true,
        paths : {
            App : "app/app",
            templates : "../templates",

            domReady : "../bower_components/requirejs-domready/domReady",

            //TODO: Update Ember to RC6.1, see: https://github.com/components/ember.
            Ember : "../bower_components/ember/ember",
            EmberData : "../bower_components/ember-data-shim/ember-data",
            EmberEasyForm : "../bower_components/ember-dockyard-validations/easyForm/ember-easyForm-0.3.2",
            EmberValidations : "../bower_components/ember-dockyard-validations/validations/ember-validations-0.2.1",
            Handlebars : "../bower_components/handlebars/handlebars",
            jQuery : "../bower_components/jquery/jquery",

            //TODO: Update Sass-Boostrap to 3.0.0, see: https://github.com/jlong/sass-twitter-bootstrap.
            Bootstrap : "../bower_components/sass-bootstrap/docs/assets/js/bootstrap",

            GoogleAnalytics : "https://ssl.google-analytics.com/ga"
        },
        shim : {
            Ember : {
                deps : ["jQuery", "Handlebars"],
                exports : "Ember"
            },
            templates : {
                deps : ["Ember"],
                exports : "Ember.TEMPLATES"
            },
            EmberData : {
                deps : ["Ember"],
                exports : "DS"
            },
            EmberEasyForm : {
                deps : ["Ember"],
                exports : "Ember.EasyForm"
            },
            EmberValidations : {
                deps : ["Ember"],
                exports : "Ember.Validations"
            },
            Handlebars : {
                deps : ["jQuery"],
                exports : "Handlebars"
            },
            jQuery : {
                exports : "jQuery"
            },
            Bootstrap : {
                deps : ["jQuery"],
                exports : "jQuery"
            },
            GoogleAnalytics : {
                exports : "_gaq"
            }
        },
        deps : ["app/init", "domReady"],
        callback : function (AppInit, domReady) {
            domReady(function () {
                AppInit.initialize();
            });
        }
    });
});
