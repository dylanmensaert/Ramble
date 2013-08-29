(function () {
    "use strict";

    require.config({
        enforceDefine: true,
        baseUrl: "javascripts",
        paths: {
            App: "app/app",
            templates: "../templates",

            domReady: "../bower_components/requirejs-domready/domReady",

            Ember: "../bower_components/ember/ember",
            EmberData: "../bower_components/ember-data-shim/ember-data",
            //TODO: Build version from Dockyards' EasyForm and Validations is outdated and bugged.
            EmberEasyForm: "../bower_components/ember-dockyard-validations/easyForm/ember-easyForm-0.3.2",
            EmberValidations: "../bower_components/ember-dockyard-validations/validations/ember-validations-0.2.1",
            Handlebars: "../bower_components/handlebars.js/dist/handlebars",
            jQuery: "../bower_components/jquery/jquery",

            Bootstrap: "../bower_components/sass-bootstrap/dist/js/bootstrap",

            GoogleAnalytics: "https://ssl.google-analytics.com/ga"
        },
        shim: {
            Ember: {
                deps: ["jQuery", "Handlebars"],
                exports: "Ember"
            },
            EmberData: {
                deps: ["Ember"],
                exports: "DS"
            },
            EmberEasyForm: {
                deps: ["Ember"],
                exports: "Ember.EasyForm"
            },
            EmberValidations: {
                deps: ["Ember"],
                exports: "Ember.Validations"
            },
            Handlebars: {
                deps: ["jQuery"],
                exports: "Handlebars"
            },
            jQuery: {
                exports: "jQuery"
            },
            Bootstrap: {
                deps: ["jQuery"],
                exports: "jQuery"
            },
            GoogleAnalytics: {
                exports: "_gaq"
            }
        },
        deps: ["domReady", "app/init"],
        callback: function (domReady, AppInit) {
            domReady(function () {
                AppInit.initialize();
            });
        }
    });
}());
