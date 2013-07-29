(function () {
    "use strict";

    require.config({
        paths : {
            //RequireJS-plugins
            domReady : "../bower_components/requirejs-domready/domReady",
            text : "../bower_components/requirejs-text/text",

            //frameworks
            Ember : "../bower_components/ember/ember",
            EmberData : "../bower_components/ember-data-shim/ember-data",
            EmberEasyForm : "../bower_components/ember-builds/easyForm/ember-easyForm-0.3.2",
            EmberValidations : "../bower_components/ember-builds/validations/ember-validations-0.2.1",
            Handlebars : "../bower_components/handlebars/handlebars",
            jQuery : "../bower_components/jquery/jquery",

            Bootstrap : "../bower_components/components-bootstrap/js/bootstrap",

            GoogleAnalytics : "https://ssl.google-analytics.com/ga",

            //app
            App : "app/app",
            templates : "../templates"
        },
        //TODO: Export all remaining libraries too
        shim : {
            Ember : {
                deps : [
                    "jQuery", "Handlebars"
                ],
                exports : "Ember"
            },
            EmberData : {
                deps : [
                    "Ember"
                ],
                exports : "DS"
            },
            EmberEasyForm : {
                deps : [
                    "Ember"
                ],
                exports : "Ember.EasyForm"
            },
            EmberValidations : {
                deps : [
                    "Ember"
                ],
                exports : "Ember.Validations"
            },
            templates : {
                deps : [
                    "Ember"
                ],
                exports : "Ember.TEMPLATES"
            },
            jQuery : {
                exports : "jQuery"
            },
            Bootstrap : {
                deps : [
                    "jQuery"
                ],
                exports : "jQuery"
            },
            GoogleAnalytics : {
                exports : "_gaq"
            }
        }
    });

    require([
        "app/init", "domReady"
    ], function (AppInit, domReady) {
        domReady(function () {
            AppInit.initialize();
        });
    });
}());
