(function() {
    'use strict';

    require.config({
        enforceDefine: true,
        baseUrl: 'javascripts',
        paths: {
            io: '../bower_components/socket.io-client/dist/socket.io',
            ember: '../bower_components/ember/ember',
            'ember-data': '../bower_components/ember-data/index',
            'ember-easyform': '../bower_components/ember-easyform/index',
            'ember-validations': '../bower_components/ember-validations/index',
            handlebars: '../bower_components/handlebars/handlebars.runtime',
            jquery: '../bower_components/jquery/dist/jquery',
            bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
            moment: '../bower_components/momentjs/moment',
            'google-analytics': '../bower_components/google-analytics/index'
        },
        map: {
            '*': {
                jquery: 'jquery-private'
            },
            'jquery-private': {
                jquery: 'jquery'
            }
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
})();
