(function () {
    'use strict';

    require.config({
        enforceDefine: true,
        baseUrl: 'javascripts',
        paths: {
            io: '../bower_components/socket.io-client/dist/socket.io',
            ember: '../bower_components/ember/ember',
            'ember-data': '../bower_components/ember-data-shim/ember-data',
            //TODO: Use Dockyards' easyform/validations via their bower-registry.
            'ember-easyform': '../bower_components/ember-dockyard-validations/easyForm/ember-easyForm-1.0.0.beta.1',
            //TODO: Build version from Dockyards validations
            'ember-validations': '../bower_components/ember-dockyard-validations/validations/ember-validations-1.0.0.beta.1',
            handlebars: '../bower_components/handlebars.js/dist/handlebars.runtime',
            jquery: '../bower_components/jquery/jquery',
            bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
            'google-analytics': '../bower_components/google-analytics/index'
        },
        shim: {
            ember: {
                deps: ['jquery', 'handlebars'],
                exports: 'Ember'
            },
            'ember-data': {
                deps: ['ember'],
                exports: 'DS'
            },
            'ember-easyform': {
                deps: ['ember'],
                exports: 'Ember.EasyForm'
            },
            'ember-validations': {
                deps: ['ember'],
                exports: 'Ember.Validations'
            },
            handlebars: {
                exports: 'Handlebars'
            },
            bootstrap: {
                deps: ['jquery'],
                exports: 'jQuery'
            },
            'google-analytics': {
                exports: 'ga'
            }
        },
        deps: ['init/init']
    });
}());
