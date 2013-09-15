(function () {
    "use strict";

    require.config({
        enforceDefine: true,
        baseUrl: "javascripts",
        paths: {
            App: "app/app",
            templates: "../templates",

            domready: "../bower_components/requirejs-domready/domReady",

            ember: "../bower_components/ember/ember",
            "ember-data": "../bower_components/ember-data-shim/ember-data",
            //TODO: Build version from Dockyards' EasyForm and Validations is outdated and bugged.
            "ember-easyform": "../vendor/ember-easyForm",
            "ember-validations": "../vendor/ember-validations",
            handlebars: "../bower_components/handlebars.js/dist/handlebars.runtime",
            jquery: "../bower_components/jquery/jquery",

            bootstrap: "../bower_components/sass-bootstrap/dist/js/bootstrap",

            "google-analytics": "../bower_components/google-analytics/index"
        },
        shim: {
            ember: {
                deps: ["jquery", "handlebars"],
                exports: "Ember"
            },
            "ember-data": {
                deps: ["ember"],
                exports: "DS"
            },
            "ember-easyform": {
                deps: ["ember"],
                exports: "Ember.EasyForm"
            },
            "ember-validations": {
                deps: ["ember"],
                exports: "Ember.Validations"
            },
            handlebars: {
                deps: ["jquery"],
                exports: "Handlebars"
            },
            jquery: {
                exports: "jQuery"
            },
            bootstrap: {
                deps: ["jquery"],
                exports: "jQuery"
            },
            "google-analytics": {
                exports: "ga"
            }
        },
        deps: ["app/init"]
    });
}());
