/* jshint browser: true */
define(function(require) {
    'use strict';

    var Ember = require('ember'),
        googleAnalytics = require('google-analytics'),
        didLoad = function() {
            this.set('controller.isLoading', false);
        };

    return Ember.Route.extend(require('helpers/update-title'), {
        title: 'Ramble',
        activate: function() {
            this._super();

            this.registerSocketMessages();
            this.controllerFor('login').checkSession();
        },
        registerSocketMessages: function() {
            this.get('socket').on('message', function(message) {
                // TODO: If destroy then unload from ember-data.
                if (message.verb !== 'destroy') {
                    // TODO: If created new model locally, it will be duplicated because Sails first broadcasts, before sending response to sender
                    this.get('store').push(message.model, message.data);
                }
            }.bind(this));
        },
        actions: {
            loading: function(transition) {
                if (this.get('controller')) {
                    this.set('controller.isLoading', true);

                    transition.then(didLoad.bind(this), didLoad.bind(this));
                }
            },
            error: function(error) {
                if (this.get('controller')) {
                    this.set('controller.error', error);
                }
            },
            updateTitle: function(tokens) {
                this._super(tokens);

                var documentTitle;

                tokens.reverse();
                documentTitle = tokens.join(' - ');
                document.title = documentTitle;

                googleAnalytics('send', 'pageview', {
                    title: documentTitle
                });
            },
            /* error: function (error) {
             // TODO: Make error-handling more robust?
             console.debug(error);
             this.transitionTo('index');
             }, */
            logout: function() {
                this.controllerFor('login').send('logout');
            }
        }
    });
});
