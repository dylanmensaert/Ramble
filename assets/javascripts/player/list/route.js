define(function(require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Route.extend(require('helpers/update-title'), {
        title: 'List',
        model: function() {
            return this.get('store').findAll('player');
        }
    });
});
